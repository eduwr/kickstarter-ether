// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        Campaign _campaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(address(_campaign));
    }

    function getCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) voters;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    mapping(uint => Request) public requests;
    uint public requestsCount = 0;
    uint private approversCount = 0;


    modifier restricted() {
        require(msg.sender == manager, "Only the manager can access this.");
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        Request storage newRequestInStorage = requests[requestsCount];
        newRequestInStorage.description = description;
        newRequestInStorage.value = value;
        newRequestInStorage.recipient = recipient;
        newRequestInStorage.complete = false;
        newRequestInStorage.approvalCount = 0;
        requestsCount++;

    }

    function approveRequest(uint index) public payable {
        Request storage request = requests[index];

        require(approvers[msg.sender], "You are not an approver.");
        require(!request.voters[msg.sender], "Voters can only vote once!");

        request.voters[msg.sender] = true;
        request.approvalCount++;

    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            address(this).balance,
            requestsCount,
            approversCount,
            manager
        );
    }
}
