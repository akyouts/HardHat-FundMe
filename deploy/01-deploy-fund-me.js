// function deployFunc(){
//   console.log(" Hi!. ");
// }

const { network } = require("hardhat");
const { networkConfig } = require('../helper-hardhat-config')
const { verify } = require("../utils/verify");


// module.exports.default = deployFunc 

module.exports = async ({ getNamedAccounts,deployments })=>{
   const { deploy , log ,get } = deployments
   const { deployer } = await getNamedAccounts();
   const chainId =  network.config.chainId;
   let  ethUSDPriceFeedAddress;

   // let  ethUSDPriceFeedAddress = networkConfig[chainId]['0x694AA1769357215DE4FAC081bf1f309aDC325306']

   // if the contract is deployed on local network we have to get the address of  MockV3Aggregator deployed in local .
   
   if(chainId === 31337){
        const ethUSDMockV3Aggregators = await get('MockV3Aggregator')
        ethUSDPriceFeedAddress =  ethUSDMockV3Aggregators.address

   }
   else{
       
      ethUSDPriceFeedAddress = networkConfig[chainId]['ethUSDPriceFeed']

   }
   const args = [ethUSDPriceFeedAddress]

   log("Deploying Fun-Me Contract")

   const fund_me = await deploy('FundMe',{
    from: deployer,
    args:args, // put price feed address
    log:true,
    waitConfirmation:network.config.blockConfirmation || 1
   })


   if(chainId !== 31337){
    // verify contract

    await verify(fund_me.address, args)

 }

   log('--------------------------------------------')


}

module.exports.tags = ['all','FundMe']