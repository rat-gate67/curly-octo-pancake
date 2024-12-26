// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract TimeStamp {
    
    mapping(uint128 => uint256) public md5toTimestamp;

    constructor() {
        console.log("Deploying a TimeStamp");
    }

    function setTimestamp(uint128 md5, uint256 timestamp) public {
        md5toTimestamp[md5] = timestamp;
        console.log("Timestamp set for md5: %s", md5);
    }

    function getTimestamp(uint128 md5) public view returns (uint256) {
        console.log("Timestamp requested for md5: %s", md5);
        return md5toTimestamp[md5];
    }
}