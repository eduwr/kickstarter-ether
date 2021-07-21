import React from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <div>
      <h3>Open Campaigns</h3>
      {renderCampaigns()}
      <Button content="Create Campaign" icon="add circle" primary />
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
