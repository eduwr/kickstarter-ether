import React from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Link from "next/link";
import { useRouter } from "next/router";

const CampaignIndex = ({ campaigns }) => {
  const router = useRouter();

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <div>
      <h3>Open Campaigns</h3>
      <Button
        floated="right"
        content="Create Campaign"
        icon="add circle"
        primary
        onClick={() => router.push("/campaigns/new")}
      />
      {renderCampaigns()}
    </div>
  );
};

export default CampaignIndex;

export async function getServerSideProps(context) {
  const campaigns = await factory.methods.getCampaigns().call();

  return {
    props: {
      campaigns,
    },
  };
}
