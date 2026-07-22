import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 100dvh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #fff0c7;
  width: 100%;
  max-width: 402px;
  flex-shrink: 0;
`;

export const Body = styled.div`
  width: 100%;
  min-height: 100dvh;
  padding: 72px 25px 34px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  img {
    width: 88px;
    height: 88px;
    object-fit: contain;
    flex: 0 0 auto;
  }

  h1 {
    margin: 0;
    color: #111;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: 0;
  }

  p {
    margin: 7px 0 0;
    color: #4f4f4f;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: 0;
  }
`;

export const Panel = styled.div`
  width: 100%;
  padding: 24px 18px 18px;
  border: 1px solid #ffe49a;
  border-radius: 10px;
  background: #fffcf4;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const PanelHeader = styled.div`
  h2 {
    margin: 0;
    color: #111;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: 0;
  }

  p {
    margin: 8px 0 0;
    color: #697077;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: 0;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: #21272a;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: 0;
  }

  input {
    width: 100%;
    height: 52px;
    padding: 0 16px;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    color: #111;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0;
    outline: none;
    box-sizing: border-box;
  }

  input::placeholder {
    color: #a2a2a2;
  }

  input:focus {
    border-color: #f4c430;
    box-shadow: 0 0 0 3px rgba(255, 228, 154, 0.55);
  }
`;

export const HelperText = styled.p`
  margin: -4px 0 0;
  color: #697077;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 145%;
  letter-spacing: 0;
`;

export const Button = styled.button`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  border: 1px solid #ffe49a;
  background: #ffe49a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

export const Message = styled.p`
  width: 100%;
  margin: 0;
  padding: 11px 12px;
  border-radius: 10px;
  background: ${({ $isError }) => ($isError ? "#fff1f0" : "#eef8f0")};
  color: ${({ $isError }) => ($isError ? "#d93025" : "#188038")};
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: 0;
  box-sizing: border-box;
`;
