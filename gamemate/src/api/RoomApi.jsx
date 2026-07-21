const ROOMS_URL = "/api/rooms/";

const parseErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    return (
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      "방 정보를 불러오는 중 문제가 발생했습니다."
    );
  } catch {
    return "방 정보를 불러오는 중 문제가 발생했습니다.";
  }
};

/**
 * 방 상세 조회
 * GET https://api.gamemate.kr/api/rooms/<roomId>/
 */
export const getRoomDetail = async (roomId) => {
  if (!roomId) {
    throw new Error("방 정보를 찾을 수 없습니다.");
  }

  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${ROOMS_URL}${roomId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};

/**
 * 방 멤버 목록 조회
 * GET https://api.gamemate.kr/api/rooms/<roomId>/members/
 */
export const getRoomMembers = async (roomId) => {
  if (!roomId) {
    throw new Error("방 정보를 찾을 수 없습니다.");
  }

  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${ROOMS_URL}${roomId}/members/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};
