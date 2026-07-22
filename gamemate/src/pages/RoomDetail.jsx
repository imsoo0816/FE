import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { applyToRoom } from "../api/ApplyApi";
import { getRoomDetail, getRoomMembers } from "../api/RoomApi";
import * as R from "../styles/StyledRoom";
import { navigateBackOrHome } from "../utils/navigation";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const RoomDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId: routeRoomId } = useParams();
  const goBack = () => navigateBackOrHome(navigate);
  const [room, setRoom] = useState(null);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [memberMessage, setMemberMessage] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(Boolean(location.state?.applied));
  const roomId = routeRoomId || location.state?.roomId;
  const hideMemberList = Boolean(location.state?.hideMemberList);

  useEffect(() => {
    const loadMembers = async (canViewMembers) => {
      try {
        const memberList = await getRoomMembers(roomId);
        setMembers(memberList);

        const currentUser = getCurrentUser();
        const isCurrentUserMember = memberList.some(
          (member) =>
            member.user?.id === currentUser?.id ||
            member.user?.username === currentUser?.username ||
            member.user?.nickname === currentUser?.nickname,
        );
        setHasApplied(canViewMembers || isCurrentUserMember);
      } catch {
        setMembers([]);
        setHasApplied(canViewMembers);
        setMemberMessage("멤버는 참여자만 볼 수 있습니다.");
      }
    };

    const loadRoomDetail = async () => {
      try {
        setMessage("");
        setMemberMessage("");

        const roomData = await getRoomDetail(roomId);
        setRoom(roomData);

        const canViewMembers =
          Boolean(location.state?.applied) ||
          roomData.my_membership_status === "approved" ||
          roomData.my_membership_status === "pending";

        if (hideMemberList && !canViewMembers) {
          setMembers([]);
          setHasApplied(false);
          setMemberMessage("멤버는 참여자만 볼 수 있습니다.");
          return;
        }

        await loadMembers(canViewMembers);
      } catch (error) {
        setRoom(null);
        setMembers([]);
        setMemberMessage("");
        setMessage(
          error.message || "방 정보를 불러오는 중 문제가 발생했습니다.",
        );
      }
    };

    loadRoomDetail();
  }, [roomId, location.state?.applied, hideMemberList]);

  const handleApply = async () => {
    if (!getCurrentUser()) {
      setMessage("로그인/회원가입 후 신청할 수 있어요.");
      return;
    }

    try {
      setMessage("");
      setMemberMessage("");
      setIsApplying(true);

      const application = await applyToRoom({ roomId });
      setHasApplied(true);

      try {
        const memberList = await getRoomMembers(roomId);
        setMembers(memberList);
      } catch {
        setMembers((prevMembers) => {
          const alreadyExists = prevMembers.some(
            (member) =>
              member.id === application.id ||
              member.user?.id === application.user?.id,
          );

          return alreadyExists ? prevMembers : [...prevMembers, application];
        });
        setMemberMessage("멤버는 참여자만 볼 수 있습니다.");
      }
    } catch (error) {
      setMessage(error.message || "신청 중 문제가 발생했습니다.");
    } finally {
      setIsApplying(false);
    }
  };

  const gameName = room?.game?.name_ko || room?.game?.name || "게임 미정";
  const ownerName = room?.owner?.nickname || room?.owner?.username || "방장";
  const playTime = room?.play_time_label || "시간대 미정";
  const approvedMembers = members.filter((member) => member.status === "approved");
  const approvedMemberCount =
    room?.approved_member_count ?? approvedMembers.length;
  const memberCount = room && `${approvedMemberCount}/${room.max_members}`;
  const shouldShowMembers = !hideMemberList || hasApplied;

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
                  <R.Down>방장 · {ownerName}</R.Down>
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
                  {shouldShowMembers ? (
                    <>
                      <R.MemberList>
                        {approvedMembers.map((member) => (
                          <R.MemberItem key={member.id}>
                            <R.MemberAvatar />
                            <div>
                              {member.user?.nickname ||
                                member.user?.username ||
                                ""}
                            </div>
                          </R.MemberItem>
                        ))}
                      </R.MemberList>
                      {memberMessage && (
                        <R.MemberNotice>{memberMessage}</R.MemberNotice>
                      )}
                    </>
                  ) : (
                    <R.MemberNotice>
                      멤버는 참여자만 볼 수 있습니다.
                    </R.MemberNotice>
                  )}
                </R.MemberBox>
                <R.Description>
                  <div>{room.description || "방 소개가 없습니다."}</div>
                </R.Description>
              </R.Rcontent>

              <R.Button
                type="button"
                onClick={handleApply}
                disabled={isApplying || hasApplied}
              >
                {hasApplied ? "참여 중" : isApplying ? "신청 중..." : "신청하기"}
              </R.Button>
            </R.Content>
          )}
        </R.Board>
      </R.Body>
    </R.Container>
  );
};

export default RoomDetail;
