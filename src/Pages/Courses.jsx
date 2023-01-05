import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAccount } from "wagmi";
import assets from "../assets";
import MultipleChoiceCard from "../Components/ChoiceCard";
import { useGlobalState } from "../GlobalContext";
import { mixins } from "../themes/global.theme";

function trimAddress(str) {
  if (str.length > 12) {
    return str.substr(0, 5) + "..." + str.substr(str.length - 4, str.length);
  }
  return str;
}
const modulesInfo = [
  {
    id: 1,
    title: "How the blockchain works",
    img: assets.courses.course1,
  },
  {
    id: 2,
    title: "Basics of Layer 1",
    img: assets.courses.course2,
  },
  {
    id: 3,
    title: "Whate are cryptocurrencies",
    img: assets.courses.course3,
  },
  {
    id: 4,
    title: "Another lesson",
    img: assets.courses.course4,
  },
  {
    id: 5,
    title: "Misx lesson",
    img: assets.courses.course2,
  },
];
const AllCoursesCtr = styled.div`
  .course {
    ${mixins.flexCol}
    gap:1rem;
    padding: 1rem;
    border: 1px solid grey;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid;
      background: url("https://i.pinimg.com/originals/d6/74/4e/d6744e3a72c6cb83dd43bbc01fea362c.gif")
        no-repeat center center;
      background-size: cover;
      opacity: 0.3;
      z-index: -1;
    }
    .courseModules {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      .module {
        height: 350px;
        border: 1px solid grey;
        border-radius: 1rem;
        ${mixins.flexCol}
        font-size: var(--fs-r);
        padding: 1rem;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.7);
        transition: 0.3s;
        &:hover {
          transform: scale(0.9);
        }
        .moduleImg {
          max-width: 200px;
          margin: auto;
        }
        .courseName {
          color: var(--color-imp);
          font-size: var(--fs-r);
        }
      }
    }
    .courseHead {
      ${mixins.flexRowCenter}
      justify-content: space-between;
      font-family: var(--ff-subtitle);
    }
  }
`;
const AllCourses = () => {
  const navigate = useNavigate(null);
  const { userInfo, isMinting } = useGlobalState();
  const { address } = useAccount();
  return (
    <AllCoursesCtr>
      <div className="course">
        <div className="courseHead">
          <p>Get this amazing Web3 course bundle.</p>
          <button
            disabled={userInfo?.hasNormalNFT}
            onClick={() => userInfo?.mintNFT(address)}
            style={{
              color: "var(--color-imp)",
              borderColor: "var(--color-imp)",
            }}
          >
            {isMinting
              ? "Minting..."
              : userInfo?.hasNormalNFT
              ? "Owned"
              : "Mint Course"}
          </button>
        </div>
        <div className="courseModules">
          {modulesInfo.map((module) => (
            <div
              className="module"
              key={module.id}
              onClick={() => navigate(`/course/${module.id}`)}
            >
              <div className="moduleImg">
                <img src={module.img} alt="" />
              </div>
              <div>
                <p className="moduleName">{module.title}</p>
                <p className="courseName">Web3 Fundamentals</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AllCoursesCtr>
  );
};
const FragmintCtr = styled.div`
  ${mixins.flexRowCenter}
  gap: 1rem;
  border: 1px solid #181818;
  border-radius: 1rem;
  width: fit-content;
  margin: 1rem auto;
  ._rightCtr,
  ._leftCtr {
    padding: 1rem;
    ${mixins.flexCol}
    gap:1rem;
  }

  ._leftCtr {
    ${mixins.flexCol}
    ._nftCollection {
      ${mixins.flexRowCenter}
      gap:.25rem;
      justify-content: initial;
    }
    ._nftImg {
      ${mixins.flexCol}
      width: 280px;
      height: 350px;
      overflow: hidden;
      border-radius: 1rem;
      border: 1px solid #181818;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  ._nftModules {
    border: 1px solid #181818;
    background: #212121;
    padding: 1rem;
    border-radius: 1rem;
  }
  .inputForm {
    ${mixins.flexCol}
    max-width: 500px;
    gap: 1rem;
    input {
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid var(--color-imp);
      color: var(--color-imp);
      background: var(--color-secondary);
    }
    ._transferBtn {
      border: 1px solid var(--color-imp);
      color: var(--color-imp);

      &:disabled {
        opacity: 0.6;
      }
    }
  }
  @media screen and (max-width: 50em) {
    flex-direction: column;
  }
`;

const FragmintPage = () => {
  const { userInfo, isMinting } = useGlobalState();
  const [selectedChoices, setSelectedChoices] = useState([]);
  const { address, isConnected } = useAccount();
  const [transferAddress, setTransferAddress] = useState(null);

  const [checkedState, setCheckedState] = useState(
    new Array(modulesInfo.length).fill(false)
  );
  const transferModules = () => {
    if (transferAddress.startsWith("0x")) {
      let fragmentChoices = Array(modulesInfo.length).fill(0);
      fragmentChoices = fragmentChoices.map((_, idx) => {
        if (selectedChoices.includes(idx + 1)) {
          return 0;
        } else return 1;
      });
      userInfo?.fractionNFT(fragmentChoices, transferAddress);
    } else {
      alert("Invalid wallet address!");
    }
  };
  const handleCheckRes = (choice) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === parseInt(choice?.id) ? !item : item
    );
    setCheckedState(updatedCheckedState);
    let choices;
    if (selectedChoices.includes(choice.id)) {
      choices = selectedChoices.filter((item) => item !== choice.id);
      setSelectedChoices(choices);
    } else if (!selectedChoices.includes(choice.id)) {
      choices = [...selectedChoices, choice.id];
      setSelectedChoices(choices);
    }
  };

  return (
    <FragmintCtr
      style={
        userInfo?.hasFractionalizedNFT
          ? { opacity: ".6", pointerEvents: "none" }
          : null
      }
    >
      <div className="_leftCtr">
        <p className="_nftCollection">
          <span>Fragmint Society</span>
          <img src={assets.icons.verified} alt="" />
        </p>
        <p
          className="_nftName"
          style={{
            fontFamily: "var(--ff-subtitle)",
            fontSize: "var(--fs-l)",
          }}
        >
          Web 3 Fundamentals
        </p>
        <p className="_nftOwner">
          Owned by{" "}
          <span style={{ color: "var(--color-imp)" }}>
            {address && trimAddress(address)}
          </span>
        </p>
        <div className="_nftImg">
          <img
            src={
              "https://i.pinimg.com/564x/0a/27/5c/0a275cd4d4c1feb8fa353d4893acb014.jpg"
            }
            alt=""
          />
        </div>
      </div>
      <div className="_rightCtr">
        <div className="_nftModules">
          <span
            style={{
              fontFamily: "var(--ff-subtitle)",
              fontSize: "var(--fs-l)",
            }}
          >
            {userInfo?.hasFractionalizedNFT
              ? "Owned Modules"
              : "Fragment your course !"}
          </span>
          {userInfo?.hasFractionalizedNFT ? (
            <div className="_modulesChoices">
              {modulesInfo.map((module, idx) => {
                return (
                  <MultipleChoiceCard
                    choice={module}
                    key={module.id}
                    checkSelected={
                      userInfo?.arrayOfAccess[idx] === 1 ? true : false
                    }
                    onChoiceCheck={handleCheckRes}
                  />
                );
              })}
            </div>
          ) : (
            <div className="_modulesChoices">
              {modulesInfo.map((module) => {
                return (
                  <MultipleChoiceCard
                    choice={module}
                    key={module.id}
                    checkedState={checkedState}
                    onChoiceCheck={handleCheckRes}
                  />
                );
              })}
            </div>
          )}
          <div className="inputForm">
            <input
              type="text"
              placeholder="Transfer address ?"
              className="_addressInput"
              onChange={(e) => setTransferAddress(e.target.value)}
            />
            <button
              onClick={transferModules}
              disabled={
                transferAddress === null ||
                transferAddress === "" ||
                selectedChoices.length < 1
              }
              className="_transferBtn"
            >
              {isMinting ? "Processing..." : "Transfer Selected Modules"}
            </button>
          </div>
        </div>
      </div>
    </FragmintCtr>
  );
};

const Courses = () => {
  const { userInfo } = useGlobalState();
  const [showCourses, setShowCourses] = useState(true);
  const changeTab = () => setShowCourses((prev) => !prev);
  const { address, isConnected } = useAccount();
  const navigate = useNavigate(null);

  useEffect(() => {
    if (!address && !isConnected) {
      navigate("/");
    }
  }, [address, isConnected, userInfo?.hasNormalNFT]);
  return (
    <CoursesCtr>
      <div className="sectionBtns">
        <button
          onClick={() => setShowCourses(true)}
          className="coursesBtn sectionBtn"
          style={
            showCourses
              ? {
                  background: "var(--color-primary)",
                  color: "var(--color-secondary)",
                }
              : null
          }
        >
          Courses
        </button>
        <button
          onClick={() => setShowCourses(false)}
          className="framintBtn sectionBtn"
          disabled={!userInfo?.hasNormalNFT}
          style={
            !showCourses
              ? {
                  background: "var(--color-primary)",
                  color: "var(--color-secondary)",
                }
              : null
          }
        >
          Fragmint
        </button>
      </div>
      {showCourses ? <AllCourses /> : <FragmintPage />}
    </CoursesCtr>
  );
};
const CoursesCtr = styled.div`
  ${mixins.flexCol}
  gap:1rem;
  .sectionBtns {
    ${mixins.flexRowCenter}
    border: 1px solid;
    max-width: fit-content;
    margin: 0 auto;
    border: 2px solid #fff;
    border-radius: 2rem;
    .sectionBtn {
      border: none;
      font-size: var(--fs-r);
      padding: 0.75rem 1.25rem;
      transition: 0.5s;
    }
  }
`;

export default Courses;
