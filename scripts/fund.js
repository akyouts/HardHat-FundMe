const { getNamedAccounts, ethers } = require('hardhat')


const main = async()=>{
  const {deployer} = await getNamedAccounts()
  const fundMe = await ethers.getContractAt('FundMe',deployer)
  console.log("Funding Contarct ...")
  const transactionResponse = await fundMe.fund({ value:ethers.parseEther("0.002089733") })
  await transactionResponse.wait(1)
  console.log("Funded")
}


main().then(()=>{
  process.exit(0)
}).catch((e)=>{
  console.log(e);
})