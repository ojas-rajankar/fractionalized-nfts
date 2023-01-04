import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAccount } from "wagmi";
import assets from "../assets";
import { Wrapper } from "../Components/Common";
import CustomConnectButton from "../Components/ConnectButton";
import { mixins } from "./global.theme";

const AppLayout = () => {
  const navigate = useNavigate(null);
  const { address, isConnected } = useAccount();
  return (
    <LayoutWrapper>
      <div className="header">
        <button onClick={() => navigate("/future-scope")}>Future Scope</button>
        <img
          src={assets.icons.starIcon}
          alt=""
          style={{ width: "2rem" }}
          onClick={() => navigate("/")}
        />
        {address && isConnected && <ConnectButton showBalance={false} />}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </LayoutWrapper>
  );
};
const LayoutWrapper = styled(Wrapper)`
  .content,
  .header {
    width: 100%;
    padding: clamp(0.5rem, 2vw, 1rem);
  }
  .header {
    ${mixins.flexRowCenter}
    justify-content: space-between;
  }
`;

export default AppLayout;
