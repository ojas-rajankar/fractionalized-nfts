import React, { createContext, useContext, useEffect, useState } from "react";
import ABI from "../ABI/ABI.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const GlobalContext = createContext({});

export default function GlobalContextProvider({ children }) {
  const { address, isConnected } = useAccount();
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const abi = ABI.output.abi;
  const contractAddress = "0x18533f5a21a85a8A1e11153F455A724B124F98bd";
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const [userInfo, setUserInfo] = useState({
    wallet: isConnected ? address : null,
    hasFractionalizedNFT: false,
    hasNormalNFT: false,
    tokenID: false,
    tokenURI: false,
    arrayOfAccess: false,
    mintNFT: mintNFT,
    fractionNFT,
  });
  async function fractionNFT(arrayOfAccess, receiverOfFractionalNFT) {
    const tx = await contract.fractionNFT(
      arrayOfAccess,
      userInfo.wallet,
      receiverOfFractionalNFT
    );
    await tx.wait();
  }

  async function userAlreadyHasNFT() {
    const bool = await contract.userAlreadyHasNFT(userInfo.wallet);

    if (bool) {
      const tokenID = await contract.getTokenId(userInfo.wallet);
      const tokenURI = await contract.tokenURI(tokenID);

      const json = atob(tokenURI.substring(29));
      const formatedTokenURI = JSON.parse(json);
      console.log(tokenURI);

      console.log("tokenID", Number(tokenID));
      console.log("tokenURI", formatedTokenURI);

      let arrayOfAccess = [];

      for (let i = 0; i < 5; i++) {
        if (formatedTokenURI?.attributes[i]?.value) {
          arrayOfAccess.push(1);
        } else {
          arrayOfAccess.push(0);
        }
      }
      setUserInfo((prev) => ({
        ...prev,
        arrayOfAccess: arrayOfAccess,
        hasNormalNFT: bool,
        tokenID: Number(tokenID),
        tokenURI: formatedTokenURI,
      }));
    }
  }

  async function userHasFractionalized() {
    const bool = await contract.userHasFractionalized(userInfo.wallet);
    console.log("userHasFractionalized: ", bool);
    userInfo.hasFractionalizedNFT = bool;
  }

  async function mintNFT() {
    const tx = await contract.mint(address);
    await tx.wait();
    console.log("minting account");
  }

  useEffect(() => {
    if (userInfo?.wallet) {
      userAlreadyHasNFT();
      userHasFractionalized();
    }
  }, [address, isConnected, userInfo?.wallet]);
  return (
    <GlobalContext.Provider value={{ userInfo }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GloabalProvider");
  }
  return context;
}
