const ROOMS_URL = "https://api.gamemate.kr/api/rooms/";

const parseErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    return (
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      "방 목록을 불러오는 중 문제가 발생했습니다."
    );
  } catch {
    return "방 목록을 불러오는 중 문제가 발생했습니다.";
  }
};

/**
 * 방 목록 조회
 * GET https://api.gamemate.kr/api/rooms/
 * GET https://api.gamemate.kr/api/rooms/?game=<slug>
 */
export const getRooms = async ({ game } = {}) => {
  const searchParams = new URLSearchParams();

  if (game && game !== "all") {
    searchParams.set("game", game);
  }

  const requestUrl = searchParams.toString()
    ? `${ROOMS_URL}?${searchParams.toString()}`
    : ROOMS_URL;

  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(requestUrl, {
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
