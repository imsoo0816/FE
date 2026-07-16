import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../styles/StyledChatroom";
// import axios from "axios";

const Chatroom = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(`/`);
  const goList = () => navigate(`/chat`);
  const goMyroom = () => navigate(`/my`);
  const goBack = () => navigate(-1);
  const goProf = () => navigate(`/profile`);

  return (
    <C.Container>
      <C.Header>
        <C.Title>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg   `}
            alt="back"
            onClick={goBack}
          />
          <C.CTitle>
            <div id="title">채팅방 이름</div>
            <div id="members">참여 3명</div>
          </C.CTitle>
        </C.Title>
        <C.NBtn>
          <img
            id="discord"
            src={`${process.env.PUBLIC_URL}/images/discord.svg   `}
            alt="chat"
          />
        </C.NBtn>
      </C.Header>

      <C.Body>
        <C.Board></C.Board>
      </C.Body>
    </C.Container>
  );
};

export default Chatroom;
