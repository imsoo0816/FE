export const PROFILE_AVATAR_IDS = Array.from({ length: 10 }, (_, index) =>
  String(index + 1).padStart(2, "0"),
);

export const normalizeProfileAvatarId = (profileAvatar) => {
  const avatarNumber = Number.parseInt(profileAvatar, 10);

  if (!Number.isInteger(avatarNumber) || avatarNumber < 1 || avatarNumber > 10) {
    return "01";
  }

  return String(avatarNumber).padStart(2, "0");
};

export const getProfileAvatarSrc = (profileAvatar) => {
  const avatarNumber = Number.parseInt(profileAvatar, 10);

  if (!Number.isInteger(avatarNumber) || avatarNumber < 1 || avatarNumber > 10) {
    return `${process.env.PUBLIC_URL}/images/person.svg`;
  }

  return `${process.env.PUBLIC_URL}/images/prof${avatarNumber}.svg`;
};
