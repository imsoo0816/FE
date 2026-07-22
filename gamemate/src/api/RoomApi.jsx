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
      "방 정보를 불러오는 중 문제가 발생했습니다."
    );
  } catch {
    return "방 정보를 불러오는 중 문제가 발생했습니다.";
  }
};

/**
 * 방 정보 조회
 * GET https://api.gamemate.kr/api/rooms/<roomId>/
 */
export const getRoomDetail = async (roomId) => {
  if (!roomId) {
    throw new Error("방 정보를 찾을 수 없습니다.");
  }

  const response = await authFetch(
    `${ROOMS_URL}${roomId}/`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
    { requireAuth: false },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 404) {
      throw new Error("존재하지 않는 방입니다.");
    }

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

  const response = await authFetch(
    `${ROOMS_URL}${roomId}/members/`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
    { requireAuth: false },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 404) {
      throw new Error("존재하지 않는 방입니다.");
    }

    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};

export const leaveRoom = async (roomId) => {
  if (!roomId) {
    throw new Error("방 정보를 찾을 수 없습니다.");
  }

  const response = await authFetch(`${ROOMS_URL}${roomId}/leave/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 403) {
      throw new Error("방에서 나갈 권한이 없습니다.");
    }

    if (response.status === 404) {
      throw new Error("존재하지 않는 방입니다.");
    }

    throw new Error(await parseErrorMessage(response));
  }

  return response.status === 204 ? null : response.json();
};

export const deleteRoom = async (roomId) => {
  if (!roomId) {
    throw new Error("방 정보를 찾을 수 없습니다.");
  }

  const response = await authFetch(`${ROOMS_URL}${roomId}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 403) {
      throw new Error("방을 삭제할 권한이 없습니다.");
    }

    if (response.status === 404) {
      throw new Error("존재하지 않는 방입니다.");
    }

    throw new Error(await parseErrorMessage(response));
  }

  return response.status === 204 ? null : response.json();
};
