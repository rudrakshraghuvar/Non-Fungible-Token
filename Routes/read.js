//importing web3
const { Web3 } = require("web3");

//connecting to provider(blockchain endpoint)
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/fb389551167c471794456f68e828c29a"
  )
);

//importing ABI file
const abi = require("../ABI.json");

//importing express
const express = require("express");

//contact address which is deployed on Etherscan
const tokenContractAddress = "0xDBb7b6BE9E5ff652C94fddCDb453868516F41985";

//using variable route to acces functionality of express like get,read
const route = express();
route.use(express.json());

const contract = new web3.eth.Contract(abi, tokenContractAddress);

/////////////////////////////////////////////////// READ FUNCTIONS //////////////////////////////////////////////////

//api function to display token information
route.get("/token-details", async (req, res) => {
  try {
    const owner = await contract.methods.owner().call();
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const totalSupply = await contract.methods.totalSupply().call();
    const supply = Number(totalSupply);
    res.json({ name, owner, symbol, supply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.post("/balanceof", async (req, res) => {
  try {
    const { address } = req.body;
    const balance = await contract.methods.balanceOf(address).call();
    const bal = Number(balance);
    res.json(bal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = route;