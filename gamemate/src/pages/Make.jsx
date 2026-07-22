import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGames } from "../api/GameApi";
import { createRoom } from "../api/MakeApi";
import * as M from "../styles/StyledMake";
import { navigateBackOrHome } from "../utils/navigation";

const Make = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedGame = location.state?.selectedGame || "";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [game, setGame] = useState(selectedGame);
  const [playTimeSlot, setPlayTimeSlot] = useState("");
  const [maxMembers, setMaxMembers] = useState("5");
  const [games, setGames] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => navigateBackOrHome(navigate);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gameList = await getGames();
        setGames(gameList);
      } catch (error) {
        setMessage(error.message || "게임 목록을 불러오는 중 문제가 발생했습니다.");
      }
    };

    loadGames();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      await createRoom({
        title,
        description,
        game,
        playTimeSlot,
        maxMembers,
      });
      navigate("/home");
    } catch (error) {
      setMessage(error.message || "방 생성 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <M.Container>
      <M.Header>
        <M.Title>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg`}
            alt="back"
            onClick={goBack}
          />
          <div>방 만들기</div>
        </M.Title>
      </M.Header>

      <M.Body as="form" onSubmit={handleSubmit}>
        <M.GameSelect>
          <p>게임 선택</p>
          <select value={game} onChange={(event) => setGame(event.target.value)}>
            <option value="" disabled>
              게임을 선택해주세요.
            </option>
            {games.map((gameItem) => (
              <option key={gameItem.id} value={gameItem.slug}>
                {gameItem.name_ko || gameItem.short_name || gameItem.name}
              </option>
            ))}
          </select>
        </M.GameSelect>

        <M.TitleInput>
          <p>방 제목</p>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: 나랑 발로란트 할 사람 모이셈"
          />
        </M.TitleInput>

        <M.ContentInput>
          <p>방 소개</p>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="티어, 시간대, 마이크 유무 등 자유롭게 작성해주세요"
          />
        </M.ContentInput>

        <M.DetailSelect>
          <div id="SelectBox">
            <p>모집 인원</p>
            <select
              value={maxMembers}
              onChange={(event) => setMaxMembers(event.target.value)}
            >
              <option value="" disabled>
                선택
              </option>
              {Array.from({ length: 11 }, (_, index) => index + 2).map(
                (memberCount) => (
                  <option key={memberCount} value={memberCount}>
                    {memberCount}명
                  </option>
                ),
              )}
            </select>
          </div>

          <div id="SelectBox">
            <p>시간대</p>
            <select
              value={playTimeSlot}
              onChange={(event) => setPlayTimeSlot(event.target.value)}
            >
              <option value="" disabled>
                선택
              </option>
              <option value="dawn">새벽</option>
              <option value="morning">아침</option>
              <option value="afternoon">오후</option>
              <option value="evening">저녁</option>
            </select>
          </div>
        </M.DetailSelect>

        {message && <M.Message>{message}</M.Message>}

        <M.Button type="submit" disabled={isLoading}>
          {isLoading ? "생성 중..." : "방 만들기 완료"}
        </M.Button>
      </M.Body>
    </M.Container>
  );
};

export default Make;
