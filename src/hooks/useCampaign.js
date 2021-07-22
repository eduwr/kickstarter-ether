import Campaign from "../../ethereum/campaign";

export const useCampaign = (address) => {
  if (!address || typeof address !== "string") {
    throw new Error(`${address} is not a valid address!`);
  }

  const { methods } = Campaign(address);

  return {
    createRequest: methods.createRequest,
  };
};
