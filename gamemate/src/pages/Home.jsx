import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../styles/StyledHome";
// import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(`/`);
  const goList = () => navigate(`/chat`);
  const goMyroom = () => navigate(`/my`);
  const goProf = () => navigate(`/profile`);

  return (
    <H.Container>
      <H.Header>
        <H.Title>Game Mate 구하기</H.Title>
        <H.Chat>
          <H.Alarm>2</H.Alarm>
          <H.NBtn onClick={goList}>
            <img
              id="chat"
              src={`${process.env.PUBLIC_URL}/images/chat_e.svg   `}
              alt="chat"
            />
          </H.NBtn>
        </H.Chat>
      </H.Header>
      <H.Category>
        <H.CList>
          <H.LBtn>전체</H.LBtn>
          <H.Plus>
            <img
              id="add"
              src={`${process.env.PUBLIC_URL}/images/add.svg   `}
              alt="add"
            />
          </H.Plus>
        </H.CList>
      </H.Category>

      <H.Body>
        <H.List>
          <H.Component>
            <H.Img></H.Img>
            <H.Content>
              <H.Text>
                <H.Up>
                  <div id="title">게임 팀원 구해요</div>
                  <div id="members">2/10</div>
                </H.Up>
                <H.Down>방 간단하게 소개 / 시간대 / 마이크</H.Down>
              </H.Text>
              <H.Button>신청하기</H.Button>
            </H.Content>
          </H.Component>
        </H.List>
        <H.Make>
          <img
            id="add"
            src={`${process.env.PUBLIC_URL}/images/add.svg   `}
            alt="add"
          />
          <div>방 만들기</div>
        </H.Make>
      </H.Body>

      <H.Nav>
        <H.Select>
          <H.NBtn>
            <img
              id="home"
              src={`${process.env.PUBLIC_URL}/images/home_e.svg   `}
              alt="home"
            />
          </H.NBtn>
        </H.Select>
        <H.NSelect>
          <H.NBtn onClick={goProf}>
            <img
              id="prof"
              src={`${process.env.PUBLIC_URL}/images/prof_e.svg   `}
              alt="prof"
            />
          </H.NBtn>
        </H.NSelect>
      </H.Nav>
    </H.Container>
  );
};

export default Home;
