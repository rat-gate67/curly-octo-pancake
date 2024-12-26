// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract TimeStamp {
    
    mapping(uint256 => uint256) public hashToTimestamp;

    constructor() {
        console.log("Deploying a TimeStamp");
    }

    function setTimestamp(uint256 hash, uint256 timestamp) public {
        hashToTimestamp[hash] = timestamp;
        console.log("Timestamp set for hash: %s", hash);
    }

    function getTimestamp(uint256 hash) public view returns (uint256) {
        console.log("Timestamp requested for hash: %s", hash);
        return hashToTimestamp[hash];
    }
}