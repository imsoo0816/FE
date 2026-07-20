const MY_ROOMS_URL = "https://api.gamemate.kr/api/rooms/mine/";

const parseErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    return (
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      "내 방 목록을 불러오는 중 문제가 발생했습니다."
    );
  } catch {
    return "내 방 목록을 불러오는 중 문제가 발생했습니다.";
  }
};

/**
 * 내가 참여 중인 방 목록 조회
 * GET https://api.gamemate.kr/api/rooms/mine/
 */
export const getMyRooms = async () => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(MY_ROOMS_URL, {
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
