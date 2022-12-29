import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Routes, Route } from "react-router-dom";
import { useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import GlobalContext from './GlobalContext';
import Home from './Pages/Home';
import ABI from './ABI/ABI.json'
import Course from './Pages/Course';
import CustomConnectButton from './Components/ConnectButton';

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const Wrapper = styled.div`
  background: black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Sora', sans-serif;
  color: white;
`
function App() {

  const [wallet, setWallet] = useState("")

  let userInfo = {
    wallet: wallet,
    setWallet,
    hasFractionalizedNFT: false,
    hasNormalNFT: false,
    tokenID: false,
    tokenURI: false,
    arrayOfAccess: false
  }

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const abi = ABI.output.abi
  const contractAddress = "0x18533f5a21a85a8A1e11153F455A724B124F98bd"
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const mintNFT = async () => {
    const tx = await contract.mint(userInfo.wallet)
    await tx.wait()
  }

  const fractionNFT = async (arrayOfAccess, receiverOfFractionalNFT) => {
    const tx = await contract.fractionNFT(arrayOfAccess, userInfo.wallet, receiverOfFractionalNFT)
    await tx.wait()
  }

  const userAlreadyHasNFT = async () => {
    const bool = await contract.userAlreadyHasNFT(userInfo.wallet)
    console.log("userAlreadyHasNFT: ", bool)

    if (bool) {
      const tokenID = await contract.getTokenId(userInfo.wallet)
      const tokenURI = await contract.tokenURI(tokenID)

      const json = atob(tokenURI.substring(29));
      const formatedTokenURI = JSON.parse(json);
      console.log(tokenURI);

      console.log("tokenID", Number(tokenID));
      console.log("tokenURI", formatedTokenURI);

      let arrayOfAccess = []

      for (let i = 0; i < 5; i++) {
        if (formatedTokenURI?.attributes[i]?.value) {
          arrayOfAccess.push(1);
        } else {
          arrayOfAccess.push(0)
        }
      }

      console.log("arrayOfAccess: ", arrayOfAccess)

      userInfo.arrayOfAccess = arrayOfAccess
      userInfo.hasNormalNFT = bool
      userInfo.tokenID = Number(tokenID)
      userInfo.tokenURI = formatedTokenURI
    }
  }

  const userHasFractionalized = async () => {
    const bool = await contract.userHasFractionalized(userInfo.wallet)
    console.log("userHasFractionalized: ", bool)
    userInfo.hasFractionalizedNFT = bool
  }

  const tokenURI = async () => {
    const bool = await contract.tokenURI(userInfo.wallet)
    console.log("userHasFractionalized: ", bool)
  }


  useEffect(() => {
    if (userInfo.wallet) {
      userAlreadyHasNFT()
      userHasFractionalized()

      console.log("userInfo: ", userInfo)
    }
  }, [userInfo?.wallet])


  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <GlobalContext.Provider value={userInfo}>
          <Wrapper className="App">
            <CustomConnectButton />
            <br />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course/:id" element={<Course />} />
            </Routes>
          </Wrapper>
        </GlobalContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
