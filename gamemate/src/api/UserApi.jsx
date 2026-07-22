import { authFetch } from "./ApiClient";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL 환경변수가 설정되지 않았습니다.");
}

const AUTH_URL = `${API_BASE_URL}/api/auth/`;

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
      fallbackMessage
    );
  } catch {
    return fallbackMessage;
  }
};

export const getMyInfo = async () => {

  const response = await authFetch(`${AUTH_URL}me/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 404) {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }

    throw new Error(
      await parseErrorMessage(response, "사용자 정보를 불러오는 데 실패했습니다."),
    );
  }

  return response.json();
};
