import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getGames } from "../api/GameApi";
import { getRooms } from "../api/HomeApi";
import { applyToRoom } from "../api/ApplyApi";
import * as H from "../styles/StyledHome";

const Home = () => {
  const navigate = useNavigate();
  const goList = () => navigate(`/chat`);
  const goRoomDetail = (room) =>
    navigate(`/roomdetail/${room.id}`, { state: { roomId: room.id } });
  const [selected, setSelected] = useState("all");
  const [games, setGames] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [hasCategoryOverflow, setHasCategoryOverflow] = useState(false);
  const gameListRef = useRef(null);

  const [applyingRoomId, setApplyingRoomId] = useState(null);

  const handleApply = async (room) => {
    if (
      applyingRoomId === room.id ||
      room.my_membership_status === "pending" ||
      room.my_membership_status === "approved" ||
      room.my_membership_status === "rejected"
    ) {
      return;
    }

    try {
      setApplyingRoomId(room.id);
      setMessage("");

      const result = await applyToRoom({
        roomId: room.id,
      });

      setRooms((prevRooms) =>
        prevRooms.map((item) =>
          item.id === room.id
            ? {
                ...item,
                my_membership_status: result.status || "pending",
              }
            : item,
        ),
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "가입 신청 중 문제가 발생했습니다.",
      );
    } finally {
      setApplyingRoomId(null);
    }
  };

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gameList = await getGames();
        setGames(gameList);
      } catch (error) {
        console.error(error);
      }
    };

    loadGames();
  }, []);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setMessage("");
        const roomList = await getRooms({ game: selected });
        setRooms(roomList);
      } catch (error) {
        setRooms([]);
        setMessage(
          error.message || "방 목록을 불러오는 중 문제가 발생했습니다.",
        );
      }
    };

    loadRooms();
  }, [selected]);

  useEffect(() => {
    const checkOverflow = () => {
      if (!gameListRef.current) return;

      const list = gameListRef.current;
      setHasCategoryOverflow(list.scrollWidth > list.clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [games]);

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
      <H.Category $expanded={isCategoryExpanded}>
        <H.CList ref={gameListRef} $expanded={isCategoryExpanded}>
          <H.LBtn
            $selected={selected === "all"}
            onClick={() => setSelected("all")}
          >
            전체
          </H.LBtn>

          {games.map((gameItem) => (
            <H.LBtn
              key={gameItem.id}
              $selected={selected === gameItem.slug}
              onClick={() => setSelected(gameItem.slug)}
            >
              {gameItem.name_ko || gameItem.short_name || gameItem.name}
            </H.LBtn>
          ))}
          <H.Plus>
            <img
              id="add"
              src={`${process.env.PUBLIC_URL}/images/add.svg`}
              alt="add"
            />
          </H.Plus>
        </H.CList>
        {hasCategoryOverflow && (
          <H.CategoryToggle
            type="button"
            $expanded={isCategoryExpanded}
            aria-label={
              isCategoryExpanded ? "게임 목록 접기" : "게임 목록 전체보기"
            }
            onClick={() => setIsCategoryExpanded((prev) => !prev)}
          >
            ^
          </H.CategoryToggle>
        )}
      </H.Category>

      <H.Body $categoryExpanded={isCategoryExpanded && hasCategoryOverflow}>
        <H.List>
          {message && <H.Message>{message}</H.Message>}

          {rooms.map((room) => (
            <H.Component key={room.id} onClick={() => goRoomDetail(room)}>
              <H.Img style={{ background: room.game?.color || "#d9d9d9" }} />
              <H.Content>
                <H.Text>
                  <H.Up>
                    <div id="title">{room.title}</div>
                    <div id="members">
                      {room.approved_member_count}/{room.max_members}
                    </div>
                  </H.Up>
                  <H.Down>
                    {room.description || "방 소개 없음"} /{" "}
                    {room.play_time_label || "시간대 미정"} /{" "}
                    {room.game?.name_ko || room.game?.name}
                  </H.Down>
                </H.Text>
                <H.Button
                  type="button"
                  onClick={() => handleApply(room)}
                  disabled={
                    applyingRoomId === room.id ||
                    room.my_membership_status === "pending" ||
                    room.my_membership_status === "approved" ||
                    room.my_membership_status === "rejected"
                  }
                >
                  {applyingRoomId === room.id
                    ? "신청 중..."
                    : room.my_membership_status === "approved"
                      ? "참여 중"
                      : room.my_membership_status === "pending"
                        ? "승인 대기 중"
                        : room.my_membership_status === "rejected"
                          ? "신청 거절됨"
                          : "신청하기"}
                </H.Button>
              </H.Content>
            </H.Component>
          ))}
        </H.List>
        <H.Make
          onClick={() =>
            navigate("/make", {
              state: { selectedGame: selected === "all" ? "" : selected },
            })
          }
        >
          <img
            id="add"
            src={`${process.env.PUBLIC_URL}/images/add.svg   `}
            alt="add"
          />
          <div>방 만들기</div>
        </H.Make>
      </H.Body>

      <Navbar />
    </H.Container>
  );
};

export default Home;
