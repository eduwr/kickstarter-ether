const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./build/CampaignFactory.json");

const fs = require("fs-extra");
const path = require("path");

const MNEMONIC_PHRASE = "parenthesis is the theresis...";
const INFURA_URL = "https://rinkeby.infura.io/v3/fasdfasdfasdfs4";

const provider = new HDWalletProvider(
  // remember to change this to your own phrase & endpoint!
  MNEMONIC_PHRASE,
  INFURA_URL
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: "10000000", from: accounts[0] });

  provider.engine.stop();

  fs.outputJSONSync(path.resolve(__dirname, "build", "deployedContract.json"), {
    address: result.options.address,
  });

  console.log("Contract deployed to", result.options.address);
};

deploy();
