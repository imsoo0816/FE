import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../styles/StyledChat";
import { getMyRooms, getRoomMessages } from "../api/ChatRoomApi";

const getLatestMessage = (messages) => {
  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  return messages.reduce((latest, current) => {
    if (!latest) {
      return current;
    }

    const latestTime = new Date(latest.created_at).getTime();
    const currentTime = new Date(current.created_at).getTime();

    return currentTime > latestTime ? current : latest;
  }, null);
};

const formatTimeAgo = (createdAt) => {
  if (!createdAt) {
    return "";
  }

  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) {
    return "";
  }

  const difference = Math.max(0, Date.now() - createdTime);

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "방금";
  }

  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  if (hours < 24) {
    return `${hours}시간 전`;
  }

  if (days < 7) {
    return `${days}일 전`;
  }

  return new Date(createdAt).toLocaleDateString("ko-KR", {
    month: "numeric",
    day: "numeric",
  });
};

const Chat = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(`/home`);
  const goList = () => navigate(`/chat`);
  const goMyroom = () => navigate(`/my`);
  const goBack = () => navigate(-1);
  const goProf = () => navigate(`/profile`);

  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const goRoom = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchChatRooms = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const myRooms = await getMyRooms();

        const roomsWithLatestMessage = await Promise.all(
          myRooms.map(async (room) => {
            try {
              const messages = await getRoomMessages({
                roomId: room.id,
              });

              const latestMessage = getLatestMessage(messages);

              return {
                ...room,
                latestMessage,
              };
            } catch (error) {
              console.error(`${room.id}번 방 메시지 조회 실패:`, error);

              return {
                ...room,
                latestMessage: null,
              };
            }
          }),
        );

        // 정렬 (최신부터)
        roomsWithLatestMessage.sort((a, b) => {
          const aTime = a.latestMessage?.created_at
            ? new Date(a.latestMessage.created_at).getTime()
            : 0;

          const bTime = b.latestMessage?.created_at
            ? new Date(b.latestMessage.created_at).getTime()
            : 0;

          return bTime - aTime;
        });

        if (isMounted) {
          setRooms(roomsWithLatestMessage);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "채팅방 목록을 불러오지 못했습니다.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchChatRooms();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {isLoading && <div>채팅방 목록을 불러오는 중입니다.</div>}

          {!isLoading && errorMessage && <div>{errorMessage}</div>}

          {!isLoading && !errorMessage && rooms.length === 0 && (
            <div>현재 참여 중인 채팅방이 없습니다.</div>
          )}

          {!isLoading &&
            !errorMessage &&
            rooms.map((room) => {
              const latestMessage = room.latestMessage;

              const senderName =
                latestMessage?.sender?.nickname ||
                latestMessage?.sender?.username ||
                "알 수 없음";

              return (
                <C.Component key={room.id} onClick={() => goRoom(room.id)}>
                  <C.Content>
                    <C.Img>
                      {room.game?.icon && (
                        <img
                          src={room.game.icon}
                          alt={room.game?.name_ko || room.game?.name || "게임"}
                        />
                      )}
                    </C.Img>

                    <C.Text>
                      <C.Up>
                        <div id="title">{room.title}</div>

                        <div id="members">
                          {room.approved_member_count ?? 0}/
                          {room.max_members ?? 0}
                        </div>
                      </C.Up>

                      <C.Down>
                        <div>
                          {latestMessage
                            ? `${senderName}: ${latestMessage.content}`
                            : "아직 메시지가 없습니다."}
                        </div>
                      </C.Down>
                    </C.Text>
                  </C.Content>

                  <C.Status>
                    <div id="time">
                      {formatTimeAgo(latestMessage?.created_at)}
                    </div>

                    {/* 안 읽은 메시지 개수 세는 api 생기면 추가 예정 */}
                    {room.unread_count > 0 && (
                      <div id="count">{room.unread_count}</div>
                    )}
                  </C.Status>
                </C.Component>
              );
            })}
        </C.List>
      </C.Body>
    </C.Container>
  );
};

export default Chat;
