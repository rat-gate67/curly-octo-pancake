"use client"; 
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { createHash } from "crypto";

import abi from "../utils/TimeStamp.json";

const buttonStyle = "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

// Timestamp component
interface TimestampProps {
  timestamp: string;
}

const Timestamp: React.FC<TimestampProps> = ({ timestamp }) => {
  return (
    <div className="text-xs text-gray-500">{timestamp}</div>
  );
};

export default function Page() {

  // a variable to store the current account
  const [currentAccount, setCurrentAccount] = useState<string>("");

  // a variable to display the timestamp
  const [displayTimestamp, setDisplayTimestamp] = useState(false);

  // a variable to store the timestamp
  const [obtainedTimestamp, setObtainedTimestamp] = useState<string>("");

  // a variable to store the input value
  const [inputValue, setInputValue] = useState<string>("");

  const contractAddress = "0xF02d6E666e309E75108F4676d3b99af52678d766";
  const contractABI = abi.abi;


  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window as any;
    if (!ethereum){
      console.log("Make sure you have metamask!");
    }else {
      console.log("We have the ethereum object", ethereum);
      
      const accounts = await ethereum.request({ method: "eth_accounts"});
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No autholized account found");
      }
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum){
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ 
        method: "eth_requestAccounts",
      }) as string[];
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const setTimestamp = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const timestampContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const hash = createHash("sha256");
        hash.update(inputValue);
        const hashValue = BigInt("0x" + hash.digest("hex"));
        console.log("inputValue:", inputValue);
        console.log("hash:", hashValue.toString());

        // get the current timestamp
        const timestamp = await BigInt(Date.now());
        console.log("timestamp:", timestamp);

        const timestampTxn = await timestampContract.setTimestamp(hashValue, timestamp);
        console.log("Mining...", timestampTxn.hash);
        await timestampTxn.wait();
        console.log("Mined --", timestampTxn.hash);
        
      }else{
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTimestamp = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const timestampContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const hash = createHash("sha256");
        hash.update(inputValue);
        const hashValue = BigInt("0x" + hash.digest("hex"));
        console.log("inputValue:", inputValue);
        console.log("hash:", hashValue.toString());

        const obtainedTimestamp = await timestampContract.getTimestamp(hashValue);
        console.log("obtainedTimestamp:", obtainedTimestamp.toString());
        setObtainedTimestamp(obtainedTimestamp.toString());
        setDisplayTimestamp(true);

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      <h1>
        Timestamp
      </h1>
      <div>
        {/* The input field for the input value */}
        {/* TODO : calulate input value from file */}
        {currentAccount && (
          <input
            placeholder="Enter the input value"
            value={inputValue}
            onChange={(e) => {setInputValue(e.target.value)}}
            id="inputValue"
            name="inputValue"
            ></input>
            
        )}
      </div>


      {/* The button to connect user's wallet */}
      {!currentAccount && (
      <button
        onClick={connectWallet}
        type="button"
        >
          Connect Wallet
        </button>
      )}
      {currentAccount && (
        <button
          disabled={true}
          title="Connected"
        >
          Wallet Connected
        </button>
      )}

      {/* The button to submit the input value */}
      <button
        className={buttonStyle}
        onClick={setTimestamp}
      >
        set timestamp
      </button>

      {/* The button to get the timestamp of the file */}
      <button
        className={buttonStyle}
        onClick={getTimestamp}
      >get timestamp
      </button>

      {/* Display the timestamp */}
      {currentAccount && displayTimestamp && (
        <Timestamp 
          timestamp={obtainedTimestamp} 
        />
      )}

    </div>
  );
  }
