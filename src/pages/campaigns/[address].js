import { useRouter } from "next/router";
import Campaign from "../../../ethereum/campaign";

const Show = () => {
  const router = useRouter();

  console.log(router.query);
  return <h1>Show</h1>;
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
