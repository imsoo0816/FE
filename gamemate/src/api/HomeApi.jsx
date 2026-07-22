import { authFetch } from "./ApiClient";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL 환경변수가 설정되지 않았습니다.");
}

const ROOMS_URL = `${API_BASE_URL}/api/rooms/`;

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

  const response = await authFetch(
    requestUrl,
    {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    },
    { requireAuth: false },
  );

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};
