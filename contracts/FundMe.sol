// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceConverter.sol";

//Custom Error 
error FundMe__NotOwner();

contract FundMe{

    using PriceConverter for  uint256 ;

   
    uint256 public  minimumUSd =50 * 1e18;  
    address[] public  funders;
    mapping(address => uint256) public addressToAmountFunded;

    AggregatorV3Interface public priceFeed;
    

    address public owner;

     modifier onlyOwner {
        // require(msg.sender == owner, "Sender is not owner !.");
        if(msg.sender != owner){
            revert FundMe__NotOwner(); 
        }
        _;
     }
    
    constructor(address priceFeedAddress){
       owner =msg.sender;
       priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    
     receive() external payable {

        fund();
      }

      fallback() external payable { 
        fund();
       } 


    function fund() public payable  {
        
           require(msg.value.getCoversionRate(priceFeed) >= minimumUSd, "Didn't send enough .");
        // require(getCoversionRate(msg.value) >= minimumUSd, "Diddnt send enough .");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender]=msg.value;
        //  return (msg.value);

    }
     
     function withDraw() public onlyOwner {
        // require(msg.sender == owner, "Sender is not owner .");
        // For loop .
        for(uint256 fundersIndex=0; fundersIndex < funders.length; fundersIndex++ ){
            address funder = funders[fundersIndex];
            addressToAmountFunded[funder] = 0;

        }

        // reset the Array.
        // funders = new address[](0);

        // // ways to transfer eth from contract .

        // //transfer
        // payable(msg.sender).transfer(address(this).balance);
        // //send
        // bool onSuccess = payable(msg.sender).send(address(this).balance);
        // //call

        (bool onSuccess,)= payable(msg.sender).call{ value: address(this).balance }("");
        require(onSuccess,"WithDraw is failed .");

     }


    

     



    

    // function withdraw(){} 
}