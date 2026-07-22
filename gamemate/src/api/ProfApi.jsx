import { authFetch } from "./ApiClient";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL ?�경변?��? ?�정?��? ?�았?�니??");
}

const MY_ROOMS_URL = `${API_BASE_URL}/api/rooms/mine/`;

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
 * 내 방 목록 조회
 * GET https://api.gamemate.kr/api/rooms/mine/
 */
export const getMyRooms = async () => {

  const response = await authFetch(MY_ROOMS_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    throw new Error(await parseErrorMessage(response));
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  return Array.isArray(data?.results) ? data.results : [];
};
