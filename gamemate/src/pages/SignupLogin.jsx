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
  const [messageType, setMessageType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("error");
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

      setMessageType("success");
      setMessage(authData.message || "로그인되었습니다.");
      navigate(location.state?.redirectTo || "/home", { replace: true });
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "로그인 처리 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Body as="form" onSubmit={handleSubmit}>
        <S.Brand>
          <img
            src={`${process.env.PUBLIC_URL}/images/logoImg.svg`}
            alt="GAMEMATE logo"
          />
          <div>
            <h1>GAMEMATE</h1>
            <p>닉네임과 비밀번호만으로 바로 시작해요.</p>
          </div>
        </S.Brand>

        <S.Panel>
          <S.PanelHeader>
            <h2>로그인 / 회원가입</h2>
            <p>처음 쓰는 닉네임이면 자동으로 가입됩니다.</p>
          </S.PanelHeader>

          <S.FieldGroup>
            <S.Field>
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="사용할 닉네임"
                autoComplete="username"
              />
            </S.Field>

            <S.Field>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호"
                autoComplete="current-password"
              />
            </S.Field>
          </S.FieldGroup>

          <S.HelperText>
            기존 닉네임은 같은 비밀번호로 로그인하고, 새 닉네임은 바로 가입돼요.
          </S.HelperText>

          {message && (
            <S.Message $isError={messageType === "error"} role="alert">
              {message}
            </S.Message>
          )}

          <S.Button type="submit" disabled={isLoading}>
            {isLoading ? "처리 중..." : "시작하기"}
          </S.Button>
        </S.Panel>
      </S.Body>
    </S.Container>
  );
};

export default SignupLogin;
