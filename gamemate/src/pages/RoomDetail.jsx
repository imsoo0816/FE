import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRoomDetail, getRoomMembers } from "../api/RoomApi";
import * as R from "../styles/StyledRoom";

const RoomDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId: routeRoomId } = useParams();
  const goBack = () => navigate(-1);
  const [room, setRoom] = useState(null);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const roomId = routeRoomId || location.state?.roomId;

  useEffect(() => {
    const loadRoomDetail = async () => {
      try {
        setMessage("");
        const [roomData, memberList] = await Promise.all([
          getRoomDetail(roomId),
          getRoomMembers(roomId),
        ]);
        setRoom(roomData);
        setMembers(memberList);
      } catch (error) {
        setRoom(null);
        setMembers([]);
        setMessage(error.message || "방 정보를 불러오는 중 문제가 발생했습니다.");
      }
    };

    loadRoomDetail();
  }, [roomId]);

  const gameName = room?.game?.name_ko || room?.game?.name || "게임 미정";
  const ownerName = room?.owner?.nickname || room?.owner?.username || "방장";
  const playTime = room?.play_time_label || "시간대 미정";
  const approvedMembers = members.filter((member) => member.status === "approved");
  const approvedMemberCount =
    room?.approved_member_count ?? approvedMembers.length;
  const memberCount = room && `${approvedMemberCount}/${room.max_members}`;

  return (
    <R.Container>
      <R.Header>
        <R.Title>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg`}
            alt="back"
            onClick={goBack}
          />
          <R.HeaderLogo style={{ background: room?.game?.color || "#d9d9d9" }} />
          <R.CTitle>
            <div id="title">GAMEMATE</div>
          </R.CTitle>
        </R.Title>
      </R.Header>

      <R.Body>
        <R.Board>
          {message && <R.Description>{message}</R.Description>}

          {room && (
            <R.Content>
              <R.TitleContent>
                <R.ProfileImg
                  style={{ background: room.game?.color || "#d9d9d9" }}
                />

                <R.Text>
                  <R.Up>
                    <div id="title">{room.title}</div>
                  </R.Up>
                  <R.Down>방장 ∙ {ownerName}</R.Down>
                </R.Text>
              </R.TitleContent>

              <R.Rcontent>
                <R.OptionContent>
                  <div id="tag">주요 태그</div>
                  <div>{playTime}</div>
                  <div>{gameName}</div>
                </R.OptionContent>
                <R.MemberBox>
                  <R.MemberTitle>
                    참여인원 <span>{memberCount}</span>
                  </R.MemberTitle>
                  <R.MemberList>
                    {approvedMembers.map((member) => (
                      <R.MemberItem key={member.id}>
                        <R.MemberAvatar />
                        <div>
                          {member.user?.nickname || member.user?.username || ""}
                        </div>
                      </R.MemberItem>
                    ))}
                  </R.MemberList>
                </R.MemberBox>
                <R.Description>
                  <div>{room.description || "방 소개가 없습니다."}</div>
                </R.Description>
              </R.Rcontent>

              <R.Button type="button">신청하기</R.Button>
            </R.Content>
          )}
        </R.Board>
      </R.Body>
    </R.Container>
  );
};

export default RoomDetail;
