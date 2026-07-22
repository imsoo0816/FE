import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { applyToRoom } from "../api/ApplyApi";
import { mvpLogin } from "../api/AuthApi";
import * as S from "../styles/StyledSignup";

const SignupLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const authData = await mvpLogin(nickname, password);
      const applyRoomId = location.state?.applyRoomId;

      if (applyRoomId) {
        await applyToRoom({ roomId: applyRoomId });
        navigate(location.state?.redirectTo || `/roomdetail/${applyRoomId}`, {
          replace: true,
          state: {
            applied: true,
            roomId: applyRoomId,
          },
        });
        return;
      }

      setMessage(authData.message || "로그인되었습니다.");
      navigate(location.state?.redirectTo || "/home", { replace: true });
    } catch (error) {
      setMessage(error.message || "로그인 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <div>로그인 / 회원가입</div>
        </S.Title>
      </S.Header>

      <S.Body as="form" onSubmit={handleSubmit}>
        <S.Img>
          <img
            id="person"
            src={`${process.env.PUBLIC_URL}/images/person.svg`}
            alt="person"
          />
        </S.Img>

        <S.TitleInput>
          <p>닉네임</p>
          <input
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="닉네임을 입력해주세요."
            autoComplete="username"
          />

          <p>*닉네임은 대소문자를 구분하지 않고 고유해야 합니다.</p>
          <p>비밀번호</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력해주세요."
            autoComplete="current-password"
          />
        </S.TitleInput>

        {message && (
          <S.Message $isError={!message.includes("로그인")}>
            {message}
          </S.Message>
        )}

        <S.Button type="submit" disabled={isLoading}>
          {isLoading ? "처리 중..." : "로그인 / 회원가입"}
        </S.Button>
      </S.Body>
    </S.Container>
  );
};

export default SignupLogin;
