import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as M from "../styles/StyledMake";
// import axios from "axios";

const Make = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(`/`);
  const goList = () => navigate(`/chat`);
  const goMyroom = () => navigate(`/my`);
  const goBack = () => navigate(-1);
  const goProf = () => navigate(`/profile`);

  return (
    <M.Container>
      <M.Header>
        <M.Title>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg   `}
            alt="back"
            onClick={goBack}
          />
          <div>방 만들기</div>
        </M.Title>
      </M.Header>
    </M.Container>
  );
};

export default Make;
