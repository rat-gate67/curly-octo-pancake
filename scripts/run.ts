import { ethers } from "hardhat";
import { createHash } from "crypto";

const main = async () => {
    
    const [owner, randomPerson] = await ethers.getSigners();

    // getContractFactory will compile the contract and return a factory
    const tsContractFactory = await ethers.getContractFactory("TimeStamp");
    // deploy will send the transaction to the network and create an instance of the contract
    const tsContract = await tsContractFactory.deploy();
    // wait for the contract to be deployed
    const TimeStamp = await tsContract.waitForDeployment();

    // get the address of the deployed contract
    const tsAddress = await tsContract.getAddress();
    console.log("TimeStamp deployed to:", tsAddress);


    // create a hash of the string "
    const hash = createHash("sha256");
    // update the hash with the string
    hash.update("Hello, World!");
    // digest
    const hashString = hash.digest("hex");
    // convert the hash to a BigInt
    const hashInt = BigInt("0x" + hashString);
    console.log("hash:", hashString);
    console.log("hashInt:", hashInt.toString());

    // get the current timestamp
    const timestamp = await BigInt(Date.now());
    console.log("timestamp:", timestamp);
    
    // call the contract
    await TimeStamp.setTimestamp(hashInt, timestamp);

    // get the timestamp
    const storedTimestamp = await TimeStamp.getTimestamp(hashInt);
    console.log("storedTimestamp:", storedTimestamp.toString());

    // check if the timestamps match
    console.log("=====Checking if timestamps match...=====");
    if (timestamp !== storedTimestamp) {
        throw new Error("Timestamps do not match");
    } else {
        console.log("Timestamps match");
    }
    

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