const { deployments, ethers, getNamedAccounts } = require('hardhat')
const { expect , assert } =  require('chai')

describe('Fund Me Stagig', async ()=>{
    let deployer
    let fundMe 
    let mockV3Aggregator
    let sendValue = ethers.parseEther("1")
 
    beforeEach(async()=>{
       deployer = (await getNamedAccounts()).deployer;
       deploymentResults = deployments.deploy('FundMe')
    })
})