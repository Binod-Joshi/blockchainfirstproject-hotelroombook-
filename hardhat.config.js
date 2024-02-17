require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require('./tasks/block-number');
require("hardhat-gas-reporter");
require("solidity-coverage");
// we also can able to add some configuration for the solidity-coverage like gas reporter
// const { task } = require('hardhat/config');

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia:{
        url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        accounts: [process.env.SEPOLIA_PRIVATE_KEY],
        chainId: 11155111,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  },
  gasReporter: {
    enabled:true,
    outputFile: "gas-report.text",
    noColors: true,
    currency:"USD",
    coinmarketcap:process.env.COINMARKETCAP_API_KEY,
  }
};