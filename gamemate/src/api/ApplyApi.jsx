import { authFetch } from "./ApiClient";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL 환경변수가 설정되지 않았습니다.");
}

const ROOMS_URL = `${API_BASE_URL}/api/rooms/`;

const parseErrorMessage = async (
  response,
  fallbackMessage = "요청 처리 중 문제가 발생했습니다.",
) => {
  try {
    const errorData = await response.json();

    return (
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      errorData?.non_field_errors?.[0] ||
      fallbackMessage
    );
  } catch {
    return fallbackMessage;
  }
};

/**
 * 방 참여 신청
 *
 * POST https://api.gamemate.kr/api/rooms/{id}/apply/
 *
 * @param {Object} params
 * @param {number|string} params.roomId
 *
 * @returns {Promise<{
 *   id: number,
 *   room_id: number,
 *   user: {
 *     id: number,
 *     username: string,
 *     nickname: string
 *   },
 *   status: "pending" | "approved" | "rejected",
 *   created_at: string,
 *   updated_at: string
 * }>}
 */
export const applyToRoom = async ({ roomId } = {}) => {
  if (roomId === undefined || roomId === null || roomId === "") {
    throw new Error("방 ID가 필요합니다.");
  }

  const response = await authFetch(
    `${ROOMS_URL}${encodeURIComponent(roomId)}/apply/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(
        await parseErrorMessage(response, "방 참여 신청이 불가능한 방입니다."),
      );
    }

    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 403) {
      throw new Error("해당 방에 참여 신청할 권한이 없습니다.");
    }

    if (response.status === 404) {
      throw new Error("존재하지 않는 방입니다.");
    }

    throw new Error(
      await parseErrorMessage(response, "방 참여 신청 중 문제가 발생했습니다."),
    );
  }

  return response.json();
};
