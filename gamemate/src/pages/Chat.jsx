import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../styles/StyledChat";
// import axios from "axios";

const Chat = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(`/`);
  const goList = () => navigate(`/chat`);
  const goMyroom = () => navigate(`/my`);
  const goBack = () => navigate(-1);
  const goProf = () => navigate(`/profile`);
  const goRoom = () => navigate(`/chatroom`);

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
          <div>채팅</div>
        </C.Title>
        <C.Chat>
          <C.Alarm>2</C.Alarm>
          <C.NBtn>
            <img
              id="chat"
              src={`${process.env.PUBLIC_URL}/images/chat_e.svg   `}
              alt="chat"
            />
          </C.NBtn>
        </C.Chat>
      </C.Header>

      <C.Body>
        <C.List>
          <C.Component onClick={goRoom}>
            <C.Content>
              <C.Img></C.Img>
              <C.Text>
                <C.Up>
                  <div id="title">방 이름</div>
                  <div id="members">3</div>
                </C.Up>
                <C.Down>
                  <div>김하이입니다: 네 좋아요</div>
                </C.Down>
              </C.Text>
            </C.Content>
            <C.Status>
              <div id="time">방금</div>
              <div id="count">3</div>
            </C.Status>
          </C.Component>
        </C.List>
      </C.Body>
    </C.Container>
  );
};

export default Chat;
