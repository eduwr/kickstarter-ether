import React, { useEffect } from "react";
import factory from "../../ethereum/factory";

const CampaignIndex = () => {
  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaigns = await factory.methods.getCampaigns().call();
      console.log(campaigns);
    };

    fetchCampaigns();
  }, []);

  return <div>sdfalasdjf</div>;
};

export default CampaignIndex;
