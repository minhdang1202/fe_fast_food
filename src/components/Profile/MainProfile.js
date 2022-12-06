import React from "react";
import { useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import InfoProfile from "./InfoProfile";

const MainProfile = () => {
  const [showInfo, setShowInfo] = useState(true);
  return (
    <>
      {showInfo ? (
        <InfoProfile setShowInfo={setShowInfo} />
      ) : (
        <EditProfile setShowInfo={setShowInfo} />
      )}
    </>
  );
};

export default MainProfile;
