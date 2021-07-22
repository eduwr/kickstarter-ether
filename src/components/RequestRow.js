import React from "react";
import { Table } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
const { Row, Cell } = Table;

export const RequestRow = ({ request, id, address, approversCount }) => {
  const { description, value, recipient, complete, approvalCount } = request;
  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>{`${approvalCount}/${approversCount}`}</Cell>
    </Row>
  );
};
