import { saveAuthData } from "./ApiClient";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error("REACT_APP_API_BASE_URL is not configured.");
}

const AUTH_MVP_URL = `${API_BASE_URL}/api/auth/mvp/`;

const parseErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    const detail = errorData?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail)) {
      return detail.join(" ");
    }

    return (
      errorData?.message ||
      errorData?.error ||
      "로그인 처리 중 문제가 발생했습니다."
    );
  } catch {
    return "로그인 처리 중 문제가 발생했습니다.";
  }
};

export const mvpLogin = async (nickname, password) => {
  const trimmedNickname = nickname.trim();

  if (!trimmedNickname) {
    throw new Error("닉네임을 입력해주세요.");
  }

  if (!password) {
    throw new Error("비밀번호를 입력해주세요.");
  }

  const response = await fetch(AUTH_MVP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      nickname: trimmedNickname,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const responseData = await response.json();
  saveAuthData(responseData);

  return responseData;
};
