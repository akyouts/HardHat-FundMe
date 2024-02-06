const { deployments, ethers, getNamedAccounts, network } = require('hardhat')
const { expect , assert } =  require('chai')
const { developmentChains } = require('../../helper-hardhat-config')



!developmentChains.includes(network.name) &&
describe('Fund Me Staging', async ()=>{
    let deployer
    let fundMe 
    let mockV3Aggregator
    let sendValue = ethers.parseEther("0.026056255455528487")
    let FundMeAddress;
 
    beforeEach(async()=>{
       deployer = (await getNamedAccounts()).deployer;
       deploymentResults = await deployments.fixture(['FundMe']);
       FundMeAddress=deploymentResults['FundMe']?.address;
  
       fundMe = await ethers.getContractAt("FundMe",FundMeAddress)
     
    })



    it('allow people to send and withdraw', async ()=>{
        await fundMe.fund({ value:sendValue })
        await fundMe.withDraw()
        const endingBalance = await ethers.provider.getBalance(FundMeAddress)
        assert.equal(endingBalance.toString(),"0")
    } )

})