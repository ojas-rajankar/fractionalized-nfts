import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Home from "./Pages/Home";
import Course from "./Pages/Course";
import { Route, Routes } from "react-router-dom";
import GlobalContextProvider from "./GlobalContext";
import { GlobalStyles } from "./themes/global.theme";
import AppLayout from "./themes/global.layout";

const { chains, provider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={darkTheme({ overlayBlur: "small", borderRadius: "large" })}
      >
        <GlobalContextProvider>
          <GlobalStyles />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/course/:id" element={<Course />} />
            </Route>
          </Routes>
        </GlobalContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
