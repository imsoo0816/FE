const ROOMS_URL = "/api/rooms/";

const parseErrorMessage = async (
  response,
  fallbackMessage = "요청을 처리하는 중 문제가 발생했습니다.",
) => {
  try {
    const errorData = await response.json();

    return (
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      fallbackMessage
    );
  } catch {
    return fallbackMessage;
  }
};

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  return accessToken;
};

export const postRoomMessage = async ({ roomId, content } = {}) => {
  if (roomId === undefined || roomId === null || roomId === "") {
    throw new Error("채팅방 ID가 필요합니다.");
  }

  const trimmedContent = content?.trim();

  if (!trimmedContent) {
    throw new Error("메시지를 입력해 주세요.");
  }

  if (trimmedContent.length > 1000) {
    throw new Error("메시지는 1000자 이하로 입력해 주세요.");
  }

  const accessToken = getAccessToken();

  const response = await fetch(
    `${ROOMS_URL}${encodeURIComponent(roomId)}/messages/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        content: trimmedContent,
      }),
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(
        await parseErrorMessage(response, "메시지 내용을 확인해 주세요."),
      );
    }

    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 403) {
      throw new Error("승인된 방 멤버만 메시지를 보낼 수 있습니다.");
    }

    if (response.status === 404) {
      throw new Error("존재하지 않는 채팅방입니다.");
    }

    throw new Error(
      await parseErrorMessage(response, "메시지를 전송하지 못했습니다."),
    );
  }

  return response.json();
};

/**
 * 특정 채팅방 메시지 조회
 *
 * 최초 조회:
 * GET /api/rooms/{roomId}/messages/
 *
 * 새 메시지만 조회:
 * GET /api/rooms/{roomId}/messages/?after_id={messageId}
 *
 * @param {Object} params
 * @param {number|string} params.roomId
 * @param {number|string|null} [params.afterId]
 */
export const getRoomMessages = async ({ roomId, afterId } = {}) => {
  if (roomId === undefined || roomId === null || roomId === "") {
    throw new Error("roomId는 필수입니다.");
  }

  const accessToken = getAccessToken();
  const searchParams = new URLSearchParams();

  if (afterId !== undefined && afterId !== null && afterId !== "") {
    searchParams.set("after_id", String(afterId));
  }

  const queryString = searchParams.toString();

  const requestUrl =
    `${ROOMS_URL}${encodeURIComponent(roomId)}/messages/` +
    (queryString ? `?${queryString}` : "");

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 403) {
      throw new Error("승인된 방 멤버만 채팅 메시지를 조회할 수 있습니다.");
    }

    if (response.status === 404) {
      throw new Error("존재하지 않는 채팅방입니다.");
    }

    throw new Error(
      await parseErrorMessage(
        response,
        "채팅 메시지를 불러오는 중 문제가 발생했습니다.",
      ),
    );
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
};

/**
 * 채팅방 WebSocket 주소 생성
 *
 * 개발 환경이나 백엔드 주소에 맞게
 * REACT_APP_WS_BASE_URL을 설정할 수 있습니다.
 */
const createChatSocketUrl = (roomId) => {
  if (!roomId) {
    throw new Error("roomId는 필수입니다.");
  }

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const wsBaseUrl = process.env.REACT_APP_WS_BASE_URL;

  if (!wsBaseUrl) {
    throw new Error("REACT_APP_WS_BASE_URL 환경변수가 설정되지 않았습니다.");
  }

  return (
    `${wsBaseUrl}/ws/rooms/${encodeURIComponent(roomId)}/` +
    `?token=${encodeURIComponent(accessToken)}`
  );
};

/**
 * 채팅방 WebSocket 연결
 *
 * @param {Object} params
 * @param {number|string} params.roomId
 * @param {(data: Object) => void} params.onMessage
 * @param {() => void} [params.onOpen]
 * @param {(event: CloseEvent) => void} [params.onClose]
 * @param {(event: Event) => void} [params.onError]
 *
 * @returns {WebSocket}
 */
export const connectChatSocket = ({
  roomId,
  onMessage,
  onOpen,
  onClose,
  onError,
}) => {
  if (roomId === undefined || roomId === null || roomId === "") {
    throw new Error("roomId는 필수입니다.");
  }

  const socketUrl = createChatSocketUrl(roomId);
  const socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    onOpen?.();
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage?.(data);
    } catch (error) {
      console.error("WebSocket 메시지를 JSON으로 변환하지 못했습니다.", error);
    }
  };

  socket.onerror = (event) => {
    onError?.(event);
  };

  socket.onclose = (event) => {
    onClose?.(event);
  };

  return socket;
};

/**
 * WebSocket을 통해 채팅 메시지 전송
 *
 * 주의:
 * 백엔드가 요구하는 전송 필드가 content가 아니라
 * message 또는 text일 수도 있으므로 Swagger/백엔드 명세 확인 필요
 */
export const sendChatMessage = ({ socket, content }) => {
  const trimmedContent = content?.trim();

  if (!trimmedContent) {
    throw new Error("메시지를 입력해 주세요.");
  }

  if (!socket) {
    throw new Error("채팅 서버에 연결되어 있지 않습니다.");
  }

  if (socket.readyState !== WebSocket.OPEN) {
    throw new Error("채팅 서버 연결이 완료되지 않았습니다.");
  }

  socket.send(
    JSON.stringify({
      content: trimmedContent,
    }),
  );
};

/**
 * WebSocket 연결 종료
 */
export const disconnectChatSocket = (socket) => {
  if (!socket) {
    return;
  }

  if (
    socket.readyState === WebSocket.OPEN ||
    socket.readyState === WebSocket.CONNECTING
  ) {
    socket.close();
  }
};
