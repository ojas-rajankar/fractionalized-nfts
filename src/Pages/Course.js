import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import GlobalContext, { useGlobalState } from "../GlobalContext";

const Course = () => {
  let { id } = useParams();
  const { isConnected } = useAccount();
  const { userInfo } = useGlobalState();
  const [text, setText] = useState("Course " + id);

  const checkAccess = (id) => {
    if (id > 0 && id < 6) {
      if (userInfo.arrayOfAccess[id - 1] === 1) {
        setText("You Have Access To The Course");
      } else {
        setText("You Don't Have Access To The Course");
      }
    } else {
      setText("Course Not Found");
    }
  };

  useEffect(() => {
    if (id && isConnected) checkAccess(id);
  }, [id, userInfo?.arrayOfAccess, isConnected]);

  return <div>{text}</div>;
};

export default Course;
