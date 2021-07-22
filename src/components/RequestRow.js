import React from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import { useCampaign } from "../hooks/useCampaign";
const { Row, Cell } = Table;

export const RequestRow = ({ request, id, address, approversCount }) => {
  const { description, value, recipient, complete, approvalCount } = request;

  console.log(address);
  const { approveRequest, finalizeRequest } = useCampaign(address);

  const handleApproveRequest = async () => {
    const accounts = await web3.eth.getAccounts();
    await approveRequest(id).send({
      from: accounts[0],
    });
  };

  const handleFinalize = async () => {
    const accounts = await web3.eth.getAccounts();
    await finalizeRequest(id).send({
      from: accounts[0],
    });
  };

  const readyToFinalize = !complete && approvalCount >= approversCount / 2;

  return (
    <Row disabled={complete} positive={readyToFinalize}>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>{`${approvalCount}/${approversCount}`}</Cell>
      <Cell>
        {!complete && (
          <Button onClick={handleApproveRequest} color="green" basic>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {readyToFinalize && (
          <Button onClick={handleFinalize} color="teal" basic>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};
