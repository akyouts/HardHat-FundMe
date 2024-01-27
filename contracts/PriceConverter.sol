// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {

    function getPrice(AggregatorV3Interface priceFeed)internal  view returns (uint256) {
        //  AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
          (,int answer ,  ,  ,  )=priceFeed.latestRoundData();

          return  uint256(answer * 1e10);

    }

    function getCoversionRate(uint256 ethAmount,AggregatorV3Interface priceFeed) internal  view returns (uint256)  {
   
        uint256  etherPrice = getPrice(priceFeed);
        uint256 ethAmountUSD =(etherPrice * ethAmount) / 1e18;

        return ethAmountUSD;
    }

}