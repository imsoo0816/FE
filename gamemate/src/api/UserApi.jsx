const AUTH_URL = "/api/auth/";

const parseErrorMessage = async (
  response,
  fallbackMessage = "요청을 처리하는 중 문제가 발생했습니다.",
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
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(`${AUTH_URL}me/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    throw new Error(
      await parseErrorMessage(response, "사용자 정보를 불러오지 못했습니다."),
    );
  }

  return response.json();
};
