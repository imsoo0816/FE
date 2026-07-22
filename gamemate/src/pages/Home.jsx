import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getGames } from "../api/GameApi";
import { getRooms } from "../api/HomeApi";
import { getMyRooms } from "../api/ChatRoomApi";
import * as H from "../styles/StyledHome";

const Home = () => {
  const navigate = useNavigate();
  const goList = () => navigate("/chat");
  const goRoomDetail = (room) =>
    navigate(`/roomdetail/${room.id}`, { state: { roomId: room.id } });
  const goApplyRoomDetail = (room) =>
    navigate(`/roomdetail/${room.id}`, {
      state: { roomId: room.id, hideMemberList: true },
    });
  const [selected, setSelected] = useState("all");
  const [games, setGames] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [hasCategoryOverflow, setHasCategoryOverflow] = useState(false);
  const gameListRef = useRef(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gameList = await getGames();
        setGames(Array.isArray(gameList) ? gameList : []);
      } catch (error) {
        console.error(error);
      }
    };

    loadGames();
  }, []);

  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const myRooms = await getMyRooms();
        const unreadCount = (Array.isArray(myRooms) ? myRooms : []).reduce(
          (total, room) => total + Number(room.unread_count || 0),
          0,
        );
        setTotalUnreadCount(unreadCount);
      } catch {
        setTotalUnreadCount(0);
      }
    };

    loadUnreadCount();
  }, []);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setMessage("");
        const roomList = await getRooms({ game: selected });
        setRooms(Array.isArray(roomList) ? roomList : []);
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

  const getRoomButtonLabel = (room) => {
    if (room.my_membership_status === "approved") return "참여 중";
    if (room.my_membership_status === "pending") return "승인 대기 중";
    if (room.my_membership_status === "rejected") return "신청 거절됨";
    return "신청하기";
  };

  return (
    <H.Container>
      <H.Header>
        <H.Title>
          <img
            src={`${process.env.PUBLIC_URL}/images/logoImg.svg`}
            alt="GAMEMATE logo"
          />
          <span>Game Mate 구하기</span>
        </H.Title>
        <H.Chat>
          {totalUnreadCount > 0 && (
            <H.Alarm>
              {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
            </H.Alarm>
          )}
          <H.NBtn onClick={goList}>
            <img
              id="chat"
              src={`${process.env.PUBLIC_URL}/images/chat_e.svg`}
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
                  onClick={(event) => {
                    event.stopPropagation();
                    goApplyRoomDetail(room);
                  }}
                >
                  {getRoomButtonLabel(room)}
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
            src={`${process.env.PUBLIC_URL}/images/add.svg`}
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
