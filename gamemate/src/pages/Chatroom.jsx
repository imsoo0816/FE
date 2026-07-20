import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as C from "../styles/StyledChatroom";
import { getRoomMessages, postRoomMessage } from "../api/ChatApi";
import { getMyInfo } from "../api/UserApi";
import { getMyRooms } from "../api/ChatRoomApi";

const Chatroom = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(`/`);
  const goList = () => navigate(`/chat`);
  const goMyroom = () => navigate(`/my`);
  const goBack = () => navigate(-1);
  const goProf = () => navigate(`/profile`);

  const { roomId } = useParams();

  const contentEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!roomId) {
      setErrorMessage("채팅방 정보가 없습니다.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const initializeChatroom = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [messageData, myInfo, myRooms] = await Promise.all([
          getRoomMessages({
            roomId,
          }),
          getMyInfo(),
          getMyRooms(),
        ]);

        if (!isMounted) {
          return;
        }

        const currentRoom = myRooms.find(
          (item) => String(item.id) === String(roomId),
        );

        if (!currentRoom) {
          throw new Error("참여 중인 채팅방 정보를 찾을 수 없습니다.");
        }

        setMessages(messageData);
        setCurrentUser(myInfo);
        setRoom(currentRoom);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "채팅방 정보를 불러오지 못했습니다.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeChatroom();

    return () => {
      isMounted = false;
    };
  }, [roomId]);

  /*
   * 메시지 목록이 변경되면 가장 아래로 이동합니다.
   */
  useEffect(() => {
    contentEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) {
      return;
    }

    try {
      setIsSending(true);
      setErrorMessage("");

      const createdMessage = await postRoomMessage({
        roomId,
        content: trimmedMessage,
      });

      /*
       * POST 응답으로 생성된 메시지 객체가 반환되므로
       * 바로 화면 메시지 목록에 추가합니다.
       */
      setMessages((previousMessages) => {
        const alreadyExists = previousMessages.some(
          (item) => item.id === createdMessage.id,
        );

        if (alreadyExists) {
          return previousMessages;
        }

        return [...previousMessages, createdMessage];
      });

      setMessage("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "메시지를 전송하지 못했습니다.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    // 한글 조합 도중 Enter가 중복 처리되는 현상 방지
    if (event.nativeEvent.isComposing) {
      return;
    }

    // Enter 전송, Shift + Enter 줄바꿈
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <C.Container>
      <C.Header>
        <C.Title>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg`}
            alt="back"
            onClick={goBack}
          />
          <C.CTitle>
            <div id="title">{room?.title || "채팅방"}</div>

            <div id="members">참여 {room?.approved_member_count ?? 0}명</div>
          </C.CTitle>
        </C.Title>
        <C.NBtn>
          <img
            id="discord"
            src={`${process.env.PUBLIC_URL}/images/discord.svg`}
            alt="discord"
          />
        </C.NBtn>
      </C.Header>

      <C.Body>
        <C.Board>
          <C.Content>
            <C.Alert>
              <div>채팅방에 입장했습니다.</div>
            </C.Alert>

            {!isLoading &&
              messages.map((item, index) => {
                const previousMessage = messages[index - 1];

                const isSameSender =
                  previousMessage &&
                  String(previousMessage.sender?.id) ===
                    String(item.sender?.id);

                const isMyMessage =
                  currentUser &&
                  String(item.sender?.id) === String(currentUser.id);

                if (isMyMessage) {
                  return (
                    <C.Me key={item.id} $isSameSender={isSameSender}>
                      <div>{item.content}</div>
                    </C.Me>
                  );
                }

                return (
                  <C.Opp key={item.id} $isSameSender={isSameSender}>
                    {!isSameSender && <C.Prof />}

                    <C.OMs>
                      {!isSameSender && (
                        <span>
                          {item.sender?.nickname ||
                            item.sender?.username ||
                            "사용자"}
                        </span>
                      )}

                      <div>{item.content}</div>
                    </C.OMs>
                  </C.Opp>
                );
              })}

            <div ref={contentEndRef} />
          </C.Content>

          <C.Input onSubmit={handleSubmit}>
            <C.Message
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요"
              rows={1}
              maxLength={1000}
              enterKeyHint="send"
              disabled={isSending}
            />

            <C.Send
              type="submit"
              disabled={!message.trim() || isSending}
              aria-label="메시지 전송"
            >
              <img
                id="send"
                src={`${process.env.PUBLIC_URL}/images/send.svg`}
                alt=""
              />
            </C.Send>
          </C.Input>
        </C.Board>
      </C.Body>
    </C.Container>
  );
};

export default Chatroom;
