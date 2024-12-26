import { ethers } from "hardhat";

const main = async () => {
    // getContractFactory will compile the contract and return a factory
    const tsContractFactory = await ethers.getContractFactory("TimeStamp");
    // deploy will send the transaction to the network and create an instance of the contract
    const tsContract = await tsContractFactory.deploy();
    // wait for the contract to be deployed
    const TimeStamp = await tsContract.waitForDeployment();
    // get the address of the deployed contract
    const tsAddress = await tsContract.getAddress();
    console.log("TimeStamp deployed to:", tsAddress);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();