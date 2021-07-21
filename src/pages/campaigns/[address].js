import { useRouter } from "next/router";
import { Card, Grid } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { ContributeForm } from "../../components/ContributeForm";

const Show = ({ summary }) => {
  const router = useRouter();

  const renderCards = () => {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    } = summary;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: {
          overflowWrap: "break-word",
        },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this amount of wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign.",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Column width={10}>{renderCards()}</Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Show;

export async function getServerSideProps({ params }) {
  console.log(params);
  const campaign = Campaign(params.address);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      summary: {
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
      },
    },
  };
}
