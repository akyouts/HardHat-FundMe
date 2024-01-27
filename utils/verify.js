const { run } = require('hardhat')

async function verify(conctractAddress, args){
    console.log("Verifying hardhat......");
    try {
       
       await run("verify:verify",{
          address: conctractAddress,
          constructorArguments: args
       })
    } catch (error) {
       console.log(error);
       
    }
 }

 module.exports = { verify }