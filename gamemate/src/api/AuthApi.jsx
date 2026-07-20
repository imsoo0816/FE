const AUTH_MVP_URL = "https://api.gamemate.kr/api/auth/mvp/";

const parseErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    return (
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      "로그인 중 문제가 발생했습니다."
    );
  } catch {
    return "로그인 중 문제가 발생했습니다.";
  }
};

const saveAuthData = (authData) => {
  if (authData.access) {
    localStorage.setItem("accessToken", authData.access);
  }

  if (authData.refresh) {
    localStorage.setItem("refreshToken", authData.refresh);
  }

  if (authData.user) {
    localStorage.setItem("user", JSON.stringify(authData.user));
  }
};

/**
 * MVP 로그인/회원가입
 * POST https://api.gamemate.kr/api/auth/mvp/
 */
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
