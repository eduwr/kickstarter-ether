import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

export default new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.contractAddress
);
