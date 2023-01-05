import React from "react";
import styled from "styled-components";
import assets from "../assets";
import { mixins } from "../themes/global.theme";

const FutureScope = () => {
  return (
    <FutureScopeCtr>
      <div className="scopes">
        <div className="scope">
          <p className="scopeTitle">
            1. Building a marketplace of Utilities only.
          </p>
          <div className="scopeContent">
            <p className="scopePoint">
              An entire marketplace not for pure NFTs themselves, but only
              utilities that come in any form whether it be.
            </p>
            <p className="scopeSubPoint">Access to Courses</p>
            <p className="scopeSubPoint">Access to Metaverse</p>
            <p className="scopeSubPoint">Access to Community</p>
            <p className="scopePoint">
              Truly build the utility game into NFTs.
            </p>
          </div>
        </div>
        <div className="scope">
          <p className="scopeTitle">
            2. Allowing fractionalized renting of NFTs.
          </p>
          <div className="scopeContent">
            <p className="scopePoint">
              Rent NFTs in fractions of utilities for time-based contracts.
            </p>
            <p className="scopeSubPoint">1 DAY</p>
            <p className="scopeSubPoint">1 MONTH</p>
            <p className="scopeSubPoint">1 YEAR</p>
            <p className="scopePoint">
              Truly build the utility game into NFTs.
            </p>
          </div>
        </div>
        <div className="scope">
          <p className="scopeTitle">3. Buying an NFT together, in fractions.</p>
          <div className="scopeContent">
            <p className="scopePoint">
              Divide the utilities on mint between two wallets during purchase.
            </p>
            <p className="scopePoint">
              This gives access to smaller players to enter into the larger NFT
              project.
            </p>
          </div>
        </div>
      </div>
    </FutureScopeCtr>
  );
};
const FutureScopeCtr = styled.div`
  ${mixins.flexColCenter}

  .scopeTitle {
    font-family: var(--ff-subtitle);
    font-size: var(--fs-l);
  }
  .scopes {
    border: 1px solid #181818;
    border-radius: 1rem;
    padding: 1rem;
    max-width: 720px;
    ${mixins.flexCol}
    gap:1rem;
    background: #1c1c1c;
  }
  .scope {
    ${mixins.flexCol}
    gap:.5rem;
  }
  .scopePoint {
    text-indent: 1rem;
    color: var(--color-imp);
    &::before {
      content: " - ";
    }
  }
  .scopeSubPoint {
    text-indent: 2rem;
    &::before {
      content: " - ";
    }
  }
`;
export default FutureScope;
