import { authFetch } from "./ApiClient";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL is not configured.");
}

const GAMES_URL = `${API_BASE_URL}/api/games/`;

const parseErrorMessage = async (response) => {
  try {
    const errorData = await response.json();

    return (
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      "게임 목록을 불러오는 중 문제가 발생했습니다."
    );
  } catch {
    return "게임 목록을 불러오는 중 문제가 발생했습니다.";
  }
};

/**
 * 게임 목록 조회
 * GET https://api.gamemate.kr/api/games/
 */
export const getGames = async () => {
  const response = await authFetch(
    GAMES_URL,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
    { requireAuth: false },
  );

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};
