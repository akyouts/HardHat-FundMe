const { assert, expect } = require('chai')
const { deployments ,ethers, getNamedAccounts } = require('hardhat')
const { developmentChains } = require('../../helper-hardhat-config')

developmentChains.includes(network.name) &&
describe("FundMe", async()=>{
let deployer
let fundMe 
let mockV3Aggregator
let sendValue = ethers.parseEther("1")
   
   
    beforeEach(async ()=>{
       // deploy fundMe using harhat-deploy. 
    //    const accounts = await ethers.getSigner();
      
       deployer = (await getNamedAccounts()).deployer
       const deploymentResults = await deployments.fixture(["all"])
       const fundMeAddress= deploymentResults['FundMe']?.address;
       const mockV3AggregatorAddress = deploymentResults['MockV3Aggregator']?.address;
       fundMe = await ethers.getContractAt("FundMe",fundMeAddress)
       mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", mockV3AggregatorAddress)
    })
   
    
    describe("constructor", async()=>{
        // We will send the PriceFeed Address 
        
        it("set the aggregator address correctly", async()=>{
            const response = await fundMe.getPriceFeed()            
            assert.equal(response,mockV3Aggregator.target)
        })



    })


    describe("Send Fund", async()=>{

        it("Not send enough ETH.", async()=>{
             await expect(fundMe.fund()).to.be.revertedWith(`Didn't send enough .`)
        })


        it("Updated the amount funded data structure", async()=>{
            await fundMe.fund({ value:sendValue })
            const resposne = await fundMe.getAddressToAmountFunded(deployer)
            assert.equal(resposne.toString(),sendValue.toString())
        })

        it("Add funder to array of funders", async()=>{
            await fundMe.fund({ value:sendValue })
            const response = await fundMe.getfunder(0)
            assert.equal(response,deployer)
        })

       

    })


    describe("Withdraw" ,async()=>{

        beforeEach(async()=>{
            await fundMe.fund({ value:sendValue })

        })
      
        it("withdraw ETH from a single founder",async()=>{
            const startingFundBalance = await ethers.provider.getBalance(
                fundMe.target
            )
        })
        const startingDeployerBalance = ethers.provider.getBalance(deployer)
        const transactionResponse = await fundMe.withDraw();
        const transactionReceipt = await transactionResponse.wait(1)

        const endingFundMeBalance =await ethers.provider.getBalance(
            fundMe.target
        )
        const endingDeployerBalance =ethers.provider.getBalance(deployer)

        assert.equal(endingFundMeBalance,0)
        assert.equal((startingFundBalance).add( startingDeployerBalance).toString() , endingDeployerBalance)



    })


    
   
}) 