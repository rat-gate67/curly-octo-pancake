"use client"; 
import { connect } from "http2";
import React, { useEffect, useState } from "react";

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

  // a variable to store the hash value
  const [hashValue, setHashValue] = useState<string>("");

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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      <h1>
        Timestamp
      </h1>
      <div>
        {/* The input field for the hash value */}
        {/* TODO : calulate hash value from file */}
        {currentAccount && (
          <input
            placeholder="Enter the hash value"
            value={hashValue}
            onChange={(e) => {setHashValue(e.target.value)}}
            id="hashValue"
            name="hashValue"
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

      {/* The button to submit the hash value */}
      <button
        className={buttonStyle}
        // onClick={setTimestamp}
      >
        set timestamp
      </button>

      {/* The button to get the timestamp of the file */}
      <button
        className={buttonStyle}
        // onClick={getTimestamp}
      >get timestamp
      </button>

      {/* Display the timestamp */}
      {currentAccount && displayTimestamp && (
        <Timestamp 
          timestamp="timestamp" 
        />
      )}

    </div>
  );
  }
