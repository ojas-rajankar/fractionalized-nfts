import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAccount } from "wagmi";
import assets from "../assets";
import { useGlobalState } from "../GlobalContext";
import { mixins } from "../themes/global.theme";

const Course = () => {
  let { id } = useParams();
  const { isConnected } = useAccount();
  const { userInfo } = useGlobalState();
  const [accessStatus, setAccessStatus] = useState(false);
  const navigate = useNavigate(null);
  const checkAccess = (id) => {
    if (id > 0 && id < 6) {
      if (userInfo.arrayOfAccess[id - 1] === 1) {
        setAccessStatus(true);
      } else {
        setAccessStatus(false);
      }
    } else {
      setAccessStatus(null);
    }
  };

  useEffect(() => {
    if (id && isConnected) checkAccess(id);
    else navigate("/");
  }, [id, userInfo?.arrayOfAccess, isConnected]);

  return (
    <CourseCtr>
      <img
        src={accessStatus ? assets.icons.access : assets.icons.noaccess}
        alt=" "
        width={"150px"}
      />
      <p className="_title">
        {accessStatus
          ? "You have the course access!"
          : "You dont have the course access!"}
      </p>
    </CourseCtr>
  );
};
const CourseCtr = styled.div`
  ${mixins.flexColCenter}
  gap:1rem;
  height: calc(100vh - 10rem);
  ._title {
    font-size: var(--fs-xl);
    text-align: center;
    font-family: var(--ff-subtitle);
  }
`;
export default Course;
