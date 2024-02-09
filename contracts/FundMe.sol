// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceConverter.sol";

//Custom Error
error FundMe__NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    uint256 public immutable i_minimumUSd = 5 * 1e18;
    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFunded;

    AggregatorV3Interface private s_priceFeed;

    address private immutable i_owner;

    modifier onlyOwner() {
        // require(msg.sender == owner, "Sender is not owner !.");
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    function fund() public payable {
        require(
            msg.value.getCoversionRate(s_priceFeed) >= i_minimumUSd,
            "Didn't send enough ."
        );
        // require(getCoversionRate(msg.value) >= minimumUSd, "Diddnt send enough .");
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] = msg.value;
        //  return (msg.value);
    }

    function withDraw() public onlyOwner {
        // require(msg.sender == owner, "Sender is not owner .");
        // For loop .
        for (
            uint256 fundersIndex = 0;
            fundersIndex < s_funders.length;
            fundersIndex++
        ) {
            address funder = s_funders[fundersIndex];
            s_addressToAmountFunded[funder] = 0;
        }

        s_funders = new address[](0);

        (bool onSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(onSuccess, "WithDraw is failed .");
    }

    function cheapWithDraw() public payable onlyOwner {
        address[] memory funders = s_funders;
        //mapping do not happing in memory
        for (
            uint256 fundersIndex = 0;
            fundersIndex < funders.length;
            fundersIndex++
        ) {
            address funder = funders[fundersIndex];
            s_addressToAmountFunded[funder] = 0;
        }

        s_funders = new address[](0);

        (bool onSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(onSuccess, "WithDraw is failed .");

        // function withdraw(){}
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getfunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getAddressToAmountFunded(
        address funderAddress
    ) public view returns (uint256) {
        return s_addressToAmountFunded[funderAddress];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
