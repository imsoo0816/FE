import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as U from "../styles/StyledProfileUpdate";
import { navigateBackOrHome } from "../utils/navigation";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [nickname, setNickname] = useState(user?.nickname || "");

  const goBack = () => navigateBackOrHome(navigate);

  return (
    <U.Container>
      <U.Header>
        <U.Title>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg   `}
            alt="back"
            onClick={goBack}
          />
          <div>프로필 수정하기</div>
        </U.Title>
      </U.Header>

      <U.Body>
        <U.Img>
          <img
            id="person"
            src={`${process.env.PUBLIC_URL}/images/person.svg   `}
            alt="person"
          />
          <U.EditIcon
            src={`${process.env.PUBLIC_URL}/images/pencil.svg`}
            alt="edit"
          />
        </U.Img>

        <U.TitleInput>
          <p>닉네임</p>
          <input
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <U.DuplicateText>*중복불가</U.DuplicateText>
        </U.TitleInput>

        <U.Button type="button">수정하기</U.Button>
      </U.Body>
    </U.Container>
  );
};

export default ProfileUpdate;
