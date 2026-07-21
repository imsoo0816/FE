import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRooms } from "../api/ProfApi";
import Navbar from "../components/Navbar";
import * as P from "../styles/StyledProf";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const Prof = () => {
  const navigate = useNavigate();
  const goList = () => navigate(`/chat`);
  const goProfileUpdate = () => navigate(`/profile/update`);
  const goDetail = (room) =>
    navigate(`/roomdetail/${room.id}`, { state: { roomId: room.id } });
  const [selected, setSelected] = useState("참여중");
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const user = getStoredUser();

  useEffect(() => {
    const loadMyRooms = async () => {
      try {
        const roomList = await getMyRooms();
        setRooms(roomList);
      } catch (error) {
        setMessage(error.message || "내 방 목록을 불러오는 중 문제가 발생했습니다.");
      }
    };

    loadMyRooms();
  }, []);

  const openRooms = useMemo(
    () => rooms.filter((room) => room.status === "open"),
    [rooms],
  );

  const closedRooms = useMemo(
    () => rooms.filter((room) => room.status !== "open"),
    [rooms],
  );

  const visibleRooms = selected === "참여중" ? openRooms : closedRooms;

  return (
    <P.Container>
      <P.Header>
        <P.Profile>
          <P.Img onClick={goProfileUpdate}>
            <img
              id="person"
              src={`${process.env.PUBLIC_URL}/images/person.svg   `}
              alt="person"
            />
            <P.EditIcon
              src={`${process.env.PUBLIC_URL}/images/pencil.svg`}
              alt="edit"
            />
          </P.Img>
          <P.Name onClick={goProfileUpdate}>{user?.nickname || "프로필"}</P.Name>
        </P.Profile>
        <P.Chat>
          <P.Alarm>2</P.Alarm>
          <P.NBtn onClick={goList}>
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
          <P.LBtn
            $selected={selected === "참여중"}
            onClick={() => setSelected("참여중")}
          >
            참여중 {openRooms.length}
          </P.LBtn>

          <P.LBtn
            $selected={selected === "종료됨"}
            onClick={() => setSelected("종료됨")}
          >
            종료됨 {closedRooms.length}
          </P.LBtn>
        </P.CList>
      </P.Category>

      <P.Body>
        <P.List>
          {message && <P.Message>{message}</P.Message>}

          {visibleRooms.map((room) => {
            const isOwner = Number(room.owner?.id) === Number(user?.id);

            return (
              <P.Component key={room.id}>
                <P.ProfileImg
                  style={{ background: room.game?.color || "#d9d9d9" }}
                />
                <P.Content>
                  <P.Text>
                    <P.Up>
                      <div id="title">{room.title}</div>
                      {isOwner && <div id="status">방장</div>}
                    </P.Up>
                    <P.Down>
                      {room.game?.name_ko || room.game?.name} ∙ 참여{" "}
                      {room.approved_member_count}/{room.max_members} ∙{" "}
                      {room.play_time_label}
                    </P.Down>
                  </P.Text>
                  <P.Button>
                    <P.ButtonLeft onClick={() => goDetail(room)}>
                      공유하기
                    </P.ButtonLeft>
                    <P.ButtonRight>{isOwner ? "모집종료" : "나가기"}</P.ButtonRight>
                  </P.Button>
                </P.Content>
              </P.Component>
            );
          })}
        </P.List>
      </P.Body>
      <Navbar />
    </P.Container>
  );
};

export default Prof;
