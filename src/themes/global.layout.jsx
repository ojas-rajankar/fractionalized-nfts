import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAccount } from "wagmi";
import assets from "../assets";
import { Wrapper } from "../Components/Common";
import CustomConnectButton from "../Components/ConnectButton";
import { mixins } from "./global.theme";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const AppLayout = () => {
  const navigate = useNavigate(null);
  const { address, isConnected } = useAccount();
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);
  const [showLeafs, setShowLeafs] = useState();
  useEffect(() => {
    if (leftLeafRef?.current && rightLeafRef?.current) {
      const leftLeaf = leftLeafRef.current;
      const rightLeaf = rightLeafRef.current;
      gsap.fromTo(
        leftLeaf,
        { x: 0 },
        {
          scrollTrigger: {
            trigger: leftLeaf,
            toggleActions: "restart none none none",
            start: "20% center",
            end: "bottom none",
            scrub: true,
          },
          x: -100,
          duration: 0.5,
        }
      );
      gsap.fromTo(
        rightLeaf,
        { x: 0 },
        {
          scrollTrigger: {
            trigger: rightLeaf,
            toggleActions: "restart none none none",
            start: "20% center",
            end: "bottom none",
            scrub: true,
          },
          x: 100,
          duration: 0.5,
        }
      );
    }
  }, []);
  return (
    <LayoutWrapper>
      {
        <>
          <div className="leftLeaf" ref={leftLeafRef}>
            <img src={assets.cliparts.leftLeaf} alt="" />
          </div>
          <div className="rightLeaf" ref={rightLeafRef}>
            <img src={assets.cliparts.rightLeaf} alt="" />
          </div>
        </>
      }

      <div className="header">
        <button onClick={() => navigate("/future-scope")}>Future Scope</button>
        <img
          className="logo"
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
  position: relative;
  background: rgba(18, 18, 18, 0.8);
  overflow-y: auto !important;
  .leftLeaf,
  .rightLeaf {
    position: fixed;
    top: 0;
    width: 80%;
    z-index: -1;
  }
  .rightLeaf {
    right: -50%;
  }
  .leftLeaf {
    left: -25%;
  }
  .content,
  .header {
    width: 100%;
    height: fit-content;
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(0.5rem, 2vw, 1rem);
    z-index: 1;
  }
  .header {
    ${mixins.flexRowCenter}
    justify-content: space-between;
  }
  .logo {
    animation: rotate 8s infinite linear;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default AppLayout;
