const { deployer, getNamedAccounts, ethers } = require('hardhat')

const main= async ()=>{
   const {deployer} = await getNamedAccounts()
   const fundMe = await ethers.getContractAt('FundMe',deployer)
   console.log("Funding WithDraw")
   const transactionResponse = await fundMe.withDraw()
   await transactionResponse.wait(1)
   console.log("Got it Back .....")
}



main().then(()=>{
    process.exit(0)
  }).catch((e)=>{
    console.log(e);
  })