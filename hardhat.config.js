require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("hardhat-gas-reporter");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config()
require("@nomicfoundation/hardhat-ethers");


const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHER_SCAN_API_KEY = process.env.ETHER_SCAN_API_KEY
const COIN_MARKET_CAP_KEY = process.env.COIN_MARKET_CAP_KEY


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers:[{ version:"0.8.19"},{version:"0.6.6"},{version:"0.8.8" }]
  },
  networks:{
    sepolia:{
      url:SEPOLIA_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:11155111,
      blockConfirmation:6
    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      accounts:['0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e'],
      chainId:31337
    }
 },
 etherscan:{
   apiKey:{
    sepolia:ETHER_SCAN_API_KEY
   }
 },
 gasReporter:{
  enabled:true,
  outputFile:"./gas-report.txt",
  noColors:true,
  currency:"USD",
  coinmarketcap:COIN_MARKET_CAP_KEY
 },
 namedAccounts:{
     deployer:{
      default:0
     }
 }
};
