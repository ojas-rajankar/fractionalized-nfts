import React, { createContext, useContext, useEffect, useState } from "react";
import ABI from "../ABI/ABI.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const GlobalContext = createContext({});

export default function GlobalContextProvider({ children }) {
  const { address, isConnected } = useAccount();
  const [isMinting, setMintingStatus] = useState(false);
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const abi = ABI.output.abi;
  const contractAddress = "0x18533f5a21a85a8A1e11153F455A724B124F98bd";
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const [userInfo, setUserInfo] = useState({
    hasFractionalizedNFT: false,
    hasNormalNFT: false,
    tokenID: false,
    tokenURI: false,
    arrayOfAccess: false,
    mintNFT: mintNFT,
    fractionNFT: fractionNFT,
  });
  const resetState = () => {
    setUserInfo({
      hasFractionalizedNFT: false,
      hasNormalNFT: false,
      tokenID: false,
      tokenURI: false,
      arrayOfAccess: false,
      mintNFT: mintNFT,
      fractionNFT: fractionNFT,
    });
  };
  async function fractionNFT(
    arrayOfAccess,
    receiverOfFractionalNFT,
    ownerAddress
  ) {
    setMintingStatus(true);

    try {
      const gasLimit = await contract.estimateGas.fractionNFT(
        arrayOfAccess,
        ownerAddress,
        receiverOfFractionalNFT
      );
      const gasPrice = signer.getGasPrice();
      const tx = await contract.fractionNFT(
        arrayOfAccess,
        ownerAddress,
        receiverOfFractionalNFT,
        { gasLimit: gasLimit, gasPrice: gasPrice }
      );
      await tx.wait();
      window.location.reload();
      alert("Transfer Successfull!");
    } catch (err) {
      alert("Fraction Failed!", err);
    } finally {
      setMintingStatus(false);
    }
  }
  async function userAlreadyHasNFT() {
    const bool = await contract.userAlreadyHasNFT(address);

    if (bool) {
      const tokenID = await contract.getTokenId(address);
      const tokenURI = await contract.tokenURI(tokenID);

      const json = atob(tokenURI.substring(29));
      const formatedTokenURI = JSON.parse(json);
      console.log(tokenURI);

      console.log("tokenID", Number(tokenID));
      console.log("tokenURI", formatedTokenURI);

      let arrayOfAccess = [];

      for (let i = 0; i < 5; i++) {
        if (formatedTokenURI?.attributes[i]?.value === "True") {
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
    const bool = await contract.userHasFractionalized(address);
    console.log("userHasFractionalized: ", bool);
    userInfo.hasFractionalizedNFT = bool;
  }
  async function mintNFT(address) {
    setMintingStatus(true);
    try {
      const gasLimit = await contract.estimateGas.mint(address);
      const gasPrice = signer.getGasPrice();
      const tx = await contract.mint(address, {
        gasLimit: gasLimit,
        gasPrice: gasPrice,
      });
      await tx.wait();
      window.location.reload();
      alert("Mint Successfull!");
    } catch {
      alert("Not enough balance/Already owned!");
    } finally {
      setMintingStatus(false);
    }
  }
  console.log("userinfo", address);
  useEffect(() => {
    if (address && isConnected) {
      userAlreadyHasNFT();
      userHasFractionalized();
      console.log("scope executed!");
    } else {
      resetState();
    }
  }, [address, isConnected]);
  return (
    <GlobalContext.Provider value={{ userInfo, isMinting }}>
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
