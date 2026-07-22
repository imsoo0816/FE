import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRooms } from "../api/ProfApi";
import { deleteRoom, leaveRoom } from "../api/RoomApi";
import Navbar from "../components/Navbar";
import * as P from "../styles/StyledProf";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const normalizeMineRoom = (item) => {
  if (item?.room) {
    return {
      ...item.room,
      my_membership_status:
        item.status || item.membership_status || item.room.my_membership_status,
      is_owner: item.room.is_owner ?? item.is_owner,
    };
  }

  return item;
};

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, textArea.value.length);

  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textArea);
  }
};

const shareRoom = async ({ title, text, url }) => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (error) {
      if (error?.name === "AbortError") {
        return "cancelled";
      }
    }
  }

  await copyText(url);
  return "copied";
};

const Prof = () => {
  const navigate = useNavigate();
  const goList = () => navigate("/chat");
  const goProfileUpdate = () => navigate("/profile/update");
  const goDetail = (room) =>
    navigate(`/roomdetail/${room.id}`, { state: { roomId: room.id } });
  const [selected, setSelected] = useState("participating");
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const user = getStoredUser();

  useEffect(() => {
    const loadMyRooms = async () => {
      try {
        setMessage("");
        const roomList = await getMyRooms();
        const normalizedRooms = (Array.isArray(roomList) ? roomList : [])
          .map(normalizeMineRoom)
          .filter(Boolean);
        setRooms(normalizedRooms);
      } catch (error) {
        setMessage(
          error.message || "내 방 목록을 불러오는 중 문제가 발생했습니다.",
        );
      }
    };

    loadMyRooms();
  }, []);

  const participatingRooms = useMemo(
    () => rooms.filter((room) => (room.status || "open") === "open"),
    [rooms],
  );

  const closedRooms = useMemo(
    () => rooms.filter((room) => (room.status || "open") !== "open"),
    [rooms],
  );

  const visibleRooms =
    selected === "participating" ? participatingRooms : closedRooms;

  const totalUnreadCount = useMemo(
    () =>
      rooms.reduce((total, room) => total + Number(room.unread_count || 0), 0),
    [rooms],
  );

  const isOwnerRoom = (room) => {
    if (room.is_owner === true) return true;
    if (!user?.id) return false;

    return Number(room.owner?.id ?? room.owner_id) === Number(user.id);
  };

  const handleShare = async (event, room) => {
    event.stopPropagation();

    try {
      const roomUrl = `${window.location.origin}/roomdetail/${room.id}`;
      const shareResult = await shareRoom({
        title: room.title || "GameMate",
        text: room.description || "GameMate 방을 확인해보세요.",
        url: roomUrl,
      });

      if (shareResult === "cancelled") {
        return;
      }
      setModal({
        type: "notice",
        title: "링크가 복사됐어요",
        description: "친구에게 바로 공유할 수 있어요.",
      });
    } catch (error) {
      setModal({
        type: "notice",
        title: "복사에 실패했어요",
        description: "브라우저 권한을 확인한 뒤 다시 시도해주세요.",
      });
    }
  };

  const openActionModal = (event, room) => {
    event.stopPropagation();
    const isOwner = isOwnerRoom(room);

    setModal({
      type: isOwner ? "delete" : "leave",
      room,
      title: isOwner ? "방을 삭제할까요?" : "방을 나갈까요?",
      description: isOwner
        ? "방을 삭제하면 참여중인 팀원에게 자동으로 알림이 가고, 채팅 내역도 함께 사라져요. 이 작업은 되돌릴 수 없어요."
        : "방을 나가면 참여 목록과 채팅방에서 제외돼요.",
    });
  };

  const closeModal = () => {
    if (isProcessing) return;
    setModal(null);
  };

  const handleConfirmAction = async () => {
    if (!modal?.room) {
      setModal(null);
      return;
    }

    try {
      setIsProcessing(true);
      if (modal.type === "delete") {
        await deleteRoom(modal.room.id);
      } else {
        await leaveRoom(modal.room.id);
      }

      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.id !== modal.room.id),
      );
      setModal(null);
    } catch (error) {
      setMessage(error.message || "요청 처리 중 문제가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <P.Container>
      <P.Header>
        <P.Profile>
          <P.Img onClick={goProfileUpdate}>
            <img
              id="person"
              src={`${process.env.PUBLIC_URL}/images/person.svg`}
              alt="person"
            />
            <P.EditIcon
              src={`${process.env.PUBLIC_URL}/images/pencil.svg`}
              alt="edit"
            />
          </P.Img>
          <P.Name onClick={goProfileUpdate}>
            {user?.nickname || "프로필"}
          </P.Name>
        </P.Profile>
        <P.Chat>
          {totalUnreadCount > 0 && (
            <P.Alarm>
              {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
            </P.Alarm>
          )}
          <P.NBtn onClick={goList}>
            <img
              id="chat"
              src={`${process.env.PUBLIC_URL}/images/chat_e.svg`}
              alt="chat"
            />
          </P.NBtn>
        </P.Chat>
      </P.Header>

      <P.Category>
        <P.CList>
          <P.LBtn
            $selected={selected === "participating"}
            onClick={() => setSelected("participating")}
          >
            참여중 {participatingRooms.length}
          </P.LBtn>

          <P.LBtn
            $selected={selected === "closed"}
            onClick={() => setSelected("closed")}
          >
            종료됨 {closedRooms.length}
          </P.LBtn>
        </P.CList>
      </P.Category>

      <P.Body>
        <P.List>
          {message && <P.Message>{message}</P.Message>}

          {visibleRooms.map((room) => {
            const isOwner = isOwnerRoom(room);

            return (
              <P.Component key={room.id} onClick={() => goDetail(room)}>
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
                      {room.game?.name_ko || room.game?.name} · 참여{" "}
                      {room.approved_member_count}/{room.max_members} ·{" "}
                      {room.play_time_label}
                    </P.Down>
                  </P.Text>
                  <P.Button>
                    <P.ButtonLeft onClick={(event) => handleShare(event, room)}>
                      공유하기
                    </P.ButtonLeft>
                    <P.ButtonRight
                      onClick={(event) => openActionModal(event, room)}
                    >
                      {isOwner ? "삭제하기" : "나가기"}
                    </P.ButtonRight>
                  </P.Button>
                </P.Content>
              </P.Component>
            );
          })}
        </P.List>
      </P.Body>

      {modal && (
        <P.ModalOverlay>
          <P.Modal>
            <P.ModalIcon
              $danger={modal.type === "delete" || modal.type === "leave"}
            >
              !
            </P.ModalIcon>
            <P.ModalTitle>{modal.title}</P.ModalTitle>
            <P.ModalDescription>{modal.description}</P.ModalDescription>

            {modal.type === "notice" ? (
              <P.ModalPrimaryButton type="button" onClick={closeModal}>
                확인
              </P.ModalPrimaryButton>
            ) : (
              <>
                <P.ModalPrimaryButton
                  type="button"
                  onClick={handleConfirmAction}
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "처리 중..."
                    : modal.type === "delete"
                      ? "삭제하기"
                      : "나가기"}
                </P.ModalPrimaryButton>
                <P.ModalSecondaryButton type="button" onClick={closeModal}>
                  취소
                </P.ModalSecondaryButton>
              </>
            )}
          </P.Modal>
        </P.ModalOverlay>
      )}

      <Navbar />
    </P.Container>
  );
};

export default Prof;
