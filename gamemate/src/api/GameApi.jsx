const GAMES_URL = "https://api.gamemate.kr/api/games/";

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
  const response = await fetch(GAMES_URL);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};
