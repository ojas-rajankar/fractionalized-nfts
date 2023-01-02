import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import styled from "styled-components";
import assets from "../assets";
import { Content, FlexRowContent } from "../Components/Common";
import CustomConnectButton from "../Components/ConnectButton";
import { useGlobalState } from "../GlobalContext";
import { mixins } from "../themes/global.theme";

const TeamMemberCtr = styled.div`
  ${mixins.flexColCenter}
  gap:2rem;
  padding: 1rem;
  position: relative;
  ._members {
    width: 100%;
    max-width: 500px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  ._member {
    ${mixins.flexColCenter}
    position: relative;
    gap: 0.5rem;
    height: 175px;
    border: 1px solid;
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("https://i.pinimg.com/originals/b0/cf/79/b0cf79f6a73667c3b0fbc05578950f58.gif")
        no-repeat center;
      background-size: "contain";
      opacity: 0.3;
      z-index: -1;
    }
    &:hover {
      .avatar {
        img {
          transform: scale(1.1);
        }
      }
    }
    .avatar {
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: 0.3s;
      }
    }
  }
`;
const membersInfo = [
  { name: "Shashwat", avatar: assets.avatars.shashwat },
  { name: "Ojas", avatar: assets.avatars.ojas },
  { name: "Sahil", avatar: assets.avatars.sahil },
  { name: "Srijit", avatar: assets.avatars.srijit },
  { name: "Abhi", avatar: assets.avatars.abhi },
];
const TeamMembers = () => {
  return (
    <TeamMemberCtr>
      <p className="title" style={{ fontSize: "3rem" }}>
        Members
      </p>
      <div className="_members">
        {membersInfo.map((memeber) => (
          <div className="_member">
            <div className="avatar">
              <img src={memeber.avatar} alt="" />
            </div>
            <p className="name">{memeber?.name}</p>
          </div>
        ))}
      </div>
    </TeamMemberCtr>
  );
};
const Home = () => {
  const { userInfo } = useGlobalState();
  return (
    <HomeCtr>
      <div className="homeHero">
        <h1 className="appTitle">
          FRAG
          <br />
          MiNT
        </h1>
        <p style={{ maxWidth: "500px" }}>
          The fractional project is the first project built on top of
          blockchain, where accessibility is open to the masses.
        </p>
        <ConnectButton />
      </div>
      <div className="introSection">
        <p>
          {" "}
          We’ve seen a lot of web3 communities being tokengated for the NFT
          holders, with some awesome utility.
        </p>
      </div>
      <div className="homeContent">
        <FlexRowContent>
          <Content></Content>
          <Content>
            <p className="ques title">The What ?</p>
            <p>
              For the first time in Web3, you can fractionalize your utility.
              Lets say a NFT you hold has 5 different utility, but you only ned
              3 of it. You also happen to have a friend who needs access to the
              other two utilities for his project? Right now, there’s nothing to
              be done.
            </p>
            <p>
              But with Fractional Project, we help you share that utility that
              you don’t need, with someone who really needs it. We’re all about
              WAGMI, so lets share that utility of ours to our dear friends and
              colleagues in need, and make it in Web3 together.
            </p>
          </Content>
        </FlexRowContent>
        <FlexRowContent>
          <Content>
            <p className="ques title">The How ?</p>
            <p>
              We’ve got our very own fractionalizing NFT smart contract module
              built by the awesome Team 1 Hackathon Team from{" "}
              <span className="imp">Dehidden.</span>
            </p>
            <p>
              The user who requested for a fraction would receive an{" "}
              <span className="imp">SBT</span> that provides them with access to
              the utility that they received. They can’t sell the utility to
              anyone else, as it was never their own to do so with.
            </p>
          </Content>
          <Content></Content>
        </FlexRowContent>
        <Content style={{ maxWidth: "720px", textAlign: "center" }}>
          <p className="ques title">The Why ?</p>
          <p>
            NFTs have way more usecases than just being PFP projects. Its our
            goal to prove to the world the immense possibilities of NFTs.
          </p>
          <p>
            Using fractional NFTs as a base, there’s a lot of things to be done
            with them. From renting out utility, to dividing ownership, and
            onboarding plenty more to projects, fractionalizing NFTs is going to
            be the start of something big.
          </p>
          <p>
            We’re just here to plant the seeds that facilitate the growth of the
            Fractions. <span className="imp">Read more </span>of the future
            scope of this project here.
          </p>
        </Content>
      </div>
      <div className="contentEnd">
        <hr width="20%" color="grey" />
        <img src={assets.icons.starIcon} alt="" style={{ width: "1.5rem" }} />
        <hr width="20%" color="grey" />
      </div>
      <TeamMembers />
      <p className="homeFooter">Dehidden Nights and weekends hackathon 2022</p>
    </HomeCtr>
  );
};
const HomeCtr = styled.div`
  ${mixins.flexCol}
  gap: 1rem;
  padding-top: 2rem;
  .homeFooter {
    color: grey;
    text-align: center;
    font-size: var(--fs-s);
    padding: 1rem;
  }
  .homeHero {
    ${mixins.flexColCenter}
    gap:1rem;
    text-align: center;
  }
  .homeContent {
    ${mixins.flexColCenter}
    gap:1rem;
  }
  .introSection {
    p {
      max-width: 720px;
    }
    text-align: center;
    font-size: var(--fs-l);
    min-height: 500px;
    ${mixins.flexColCenter}
  }
  .contentEnd {
    ${mixins.flexRowCenter}
    gap:.5rem;
    height: 100px;
  }
`;
export default Home;
