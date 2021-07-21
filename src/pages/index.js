import React from "react";
import factory from "../../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  return <div>{campaigns[0]}</div>;
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
