import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledProf";
// import axios from "axios";

const Prof = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(`/`);
  const goList = () => navigate(`/chat`);
  const goMyroom = () => navigate(`/my`);
  const goProf = () => navigate(`/profile`);

  return (
    <P.Container>
      <P.Header>
        <P.Profile>
          <P.Img>
            <img
              id="person"
              src={`${process.env.PUBLIC_URL}/images/person.svg   `}
              alt="person"
            />
          </P.Img>
          <P.Name>김하이입니다</P.Name>
        </P.Profile>
        <P.Chat>
          <P.Alarm>2</P.Alarm>
          <P.NBtn>
            <img
              id="chat"
              src={`${process.env.PUBLIC_URL}/images/chat_e.svg   `}
              alt="chat"
            />
          </P.NBtn>
        </P.Chat>
      </P.Header>
      <P.Category>
        <P.CList>
          <P.LBtn>참여중 2</P.LBtn>
          <P.LBtn>종료됨 3</P.LBtn>
        </P.CList>
      </P.Category>
      <P.Body></P.Body>
      <P.Nav>
        <P.NSelect>
          <P.NBtn onClick={goHome}>
            <img
              id="home"
              src={`${process.env.PUBLIC_URL}/images/home_e.svg   `}
              alt="home"
            />
          </P.NBtn>
        </P.NSelect>
        <P.Select>
          <P.NBtn>
            <img
              id="prof"
              src={`${process.env.PUBLIC_URL}/images/prof_e.svg   `}
              alt="prof"
            />
          </P.NBtn>
        </P.Select>
      </P.Nav>
    </P.Container>
  );
};

export default Prof;
