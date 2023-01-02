import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import assets from "../assets";
import { Wrapper } from "../Components/Common";
import CustomConnectButton from "../Components/ConnectButton";
import { mixins } from "./global.theme";

const AppLayout = () => {
  return (
    <LayoutWrapper>
      <div className="header">
        <button>Future Scope</button>
        <img src={assets.icons.starIcon} alt="" style={{ width: "2rem" }} />
        <ConnectButton showBalance={false} />
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
