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
      "방을 생성하는 중 문제가 발생했습니다."
    );
  } catch {
    return "방을 생성하는 중 문제가 발생했습니다.";
  }
};

/**
 * 방 만들기
 * POST https://api.gamemate.kr/api/rooms/
 */
export const createRoom = async ({
  title,
  description,
  game,
  playTimeSlot,
  maxMembers = 5,
}) => {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  const parsedMaxMembers = Number(maxMembers);

  if (!trimmedTitle) {
    throw new Error("방 제목을 입력해주세요.");
  }

  if (!trimmedDescription) {
    throw new Error("방 설명을 입력해주세요.");
  }

  if (!game) {
    throw new Error("게임을 선택해주세요.");
  }

  if (!playTimeSlot) {
    throw new Error("시간을 선택해주세요.");
  }

  if (
    !Number.isInteger(parsedMaxMembers) ||
    parsedMaxMembers < 2 ||
    parsedMaxMembers > 12
  ) {
    throw new Error("모집 인원은 2명 이상 12명 이하로 선택해주세요.");
  }

  const response = await authFetch(ROOMS_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: trimmedTitle,
      description: trimmedDescription,
      game,
      play_time_slot: playTimeSlot,
      max_members: parsedMaxMembers,
    }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(await parseErrorMessage(response));
    }

    if (response.status === 401) {
      throw new Error("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
    }

    if (response.status === 403) {
      throw new Error("방을 생성할 권한이 없습니다.");
    }

    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};
