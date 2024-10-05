require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require('dotenv').config();

module.exports = {
  solidity: "0.8.17",  // or whatever version you're using
  networks: {
    holesky: {
      url: process.env.API_URL, // replace with your Goerli RPC URL
      accounts: [process.env.PRIVATE_KEY] // Add your wallet private key here (without the "0x" prefix)
    }
  }
};
