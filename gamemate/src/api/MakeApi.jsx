const ROOMS_URL = "https://api.gamemate.kr/api/rooms/";

const parseErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    return (
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      "방 생성 중 문제가 발생했습니다."
    );
  } catch {
    return "방 생성 중 문제가 발생했습니다.";
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
    throw new Error("방 소개를 입력해주세요.");
  }

  if (!game) {
    throw new Error("게임을 선택해주세요.");
  }

  if (!playTimeSlot) {
    throw new Error("시간대를 선택해주세요.");
  }

  if (
    !Number.isInteger(parsedMaxMembers) ||
    parsedMaxMembers < 2 ||
    parsedMaxMembers > 12
  ) {
    throw new Error("모집 인원은 2명 이상 12명 이하로 선택해주세요.");
  }

  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(ROOMS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
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
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};
