import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo, updateMyInfo } from "../api/UserApi";
import * as U from "../styles/StyledProfileUpdate";
import {
  getProfileAvatarSrc,
  normalizeProfileAvatarId,
  PROFILE_AVATAR_IDS,
} from "../utils/profileAvatar";
import { navigateBackOrHome } from "../utils/navigation";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const saveStoredUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  const [user, setUser] = useState(storedUser);
  const [selectedAvatar, setSelectedAvatar] = useState(
    normalizeProfileAvatarId(storedUser?.profile_avatar),
  );
  const [isAvatarListOpen, setIsAvatarListOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const goBack = () => navigateBackOrHome(navigate);

  useEffect(() => {
    const loadMyInfo = async () => {
      try {
        const myInfo = await getMyInfo();
        setUser(myInfo);
        setSelectedAvatar(normalizeProfileAvatarId(myInfo.profile_avatar));
        saveStoredUser(myInfo);
      } catch (error) {
        setMessage(error.message || "프로필 정보를 불러오지 못했습니다.");
      }
    };

    loadMyInfo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setMessage("");

      const updatedUser = await updateMyInfo({
        profileAvatar: selectedAvatar,
      });
      saveStoredUser(updatedUser);
      navigate(-1);
    } catch (error) {
      setMessage(error.message || "프로필을 수정하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <U.Container>
      <U.Header>
        <U.Title>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg`}
            alt="back"
            onClick={goBack}
          />
          <div>프로필 수정하기</div>
        </U.Title>
      </U.Header>

      <U.Body as="form" onSubmit={handleSubmit}>
        <U.ImgButton
          type="button"
          onClick={() => setIsAvatarListOpen((prev) => !prev)}
          aria-expanded={isAvatarListOpen}
        >
          <img
            id="person"
            src={getProfileAvatarSrc(selectedAvatar)}
            alt="profile avatar"
          />
          <U.EditIcon
            src={`${process.env.PUBLIC_URL}/images/pencil.svg`}
            alt="edit"
          />
        </U.ImgButton>

        {isAvatarListOpen && (
          <U.AvatarPanel>
            {PROFILE_AVATAR_IDS.map((avatarId) => (
              <U.AvatarOption
                key={avatarId}
                type="button"
                $selected={selectedAvatar === avatarId}
                onClick={() => setSelectedAvatar(avatarId)}
              >
                <img
                  src={getProfileAvatarSrc(avatarId)}
                  alt={`profile avatar ${Number(avatarId)}`}
                />
              </U.AvatarOption>
            ))}
          </U.AvatarPanel>
        )}

        <U.TitleInput>
          <p>닉네임</p>
          <input type="text" value={user?.nickname || ""} disabled readOnly />
          <U.WarningText>*닉네임은 수정할 수 없습니다.</U.WarningText>
        </U.TitleInput>

        {message && <U.Message>{message}</U.Message>}

        <U.Button type="submit" disabled={isSaving}>
          {isSaving ? "수정 중..." : "수정하기"}
        </U.Button>
      </U.Body>
    </U.Container>
  );
};

export default ProfileUpdate;
