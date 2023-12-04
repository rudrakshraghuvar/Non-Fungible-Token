//importing web3
const { Web3 } = require("web3");

require("dotenv").config();

//connecting to provider(blockchain endpoint)
const network = process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
  ),
);

//importing ABI file
const abi = require("../ABI.json");

//importing express
const express = require("express");

//contact address which is deployed on Etherscan
const tokenContractAddress = "0xDBb7b6BE9E5ff652C94fddCDb453868516F41985";

//metamask wallet Address
const walletAddress = "0x0cc58f8740ceBFAe6F020e778CA32F3483F5350b";

//private key of metamask to perform transaction
const privateKey = process.env.SIGNER_PRIVATE_KEY;

//using variable route to acces functionality of express like get,read
const route = express();
route.use(express.json());

const contract = new web3.eth.Contract(abi, tokenContractAddress);

/////////////////////////////////////////////////// WRITE FUNCTIONS //////////////////////////////////////////////////

//api function to mint the erc721 token
route.post("/mint", async (req, res) => {
  try {
    const { to } = req.body;

    const gasPrice = await web3.eth.getGasPrice();

    const rawTxn = {
      from: walletAddress,
      to: tokenContractAddress,
      value: '0x0',
      gas: 550000,
      gasPrice: gasPrice,
      nonce: await web3.eth.getTransactionCount(walletAddress),
      data: contract.methods.safeMint(to).encodeABI()
    };

    //sign the transaction
    const signedTxn = await web3.eth.accounts.signTransaction(rawTxn, privateKey);


    const receipt = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);

    // console.log(receipt)
    ;

    if (!receipt) {
      return res.status(407).json({ message: 'Failed to get details' });
    }

    const txnHash = receipt.transactionHash;
    return res.status(200).json({ txnHash });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = route;