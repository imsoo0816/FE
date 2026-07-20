import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 0px;
  min-height: 100dvh;
  padding: 0; /* 불필요한 패딩 제거 */
  box-sizing: border-box; /* 패딩이 width에 포함되도록 설정 */
  display: flex;
  flex-direction: column;
  background: #fff0c7;
  width: 100%;
  max-width: 402px;
  flex-shrink: 0;
  padding-bottom: 30px;
`;

export const Header = styled.div`
  height: 137px;
  width: 393px;
  padding: 64px 25px 32px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

export const Title = styled.div`
  gap: 37px;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const CTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  #title {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
  }

  #members {
    color: #767676;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.26px;
  }
`;

export const Chat = styled.div`
  width: 58px;
  height: 58px;
  background: #fffcf4;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Alarm = styled.div`
  position: absolute;

  width: 17px;
  height: 17px;
  background: #f72323;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  right: 7px;
  bottom: 14px;

  color: #fff;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
  font-align: center;
`;

export const Body = styled.div`
  flex: 1;
  min-height: 0;

  padding-top: 154px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
`;

export const Board = styled.div`
  width: 343px;

  height: calc(100dvh - 174px);
  min-height: 400px;
  max-height: 690px;

  border-radius: 30px;
  background: #fffcf4;

  padding: 21px 10px 25px;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  overflow: hidden;
`;

export const Content = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;

  overflow-y: auto;
  overflow-x: hidden;

  padding-bottom: 20px;

  box-sizing: border-box;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Alert = styled.div`
  width: 100%;

  display: flex;
  margin-bottom: 36px;

  align-items: center;
  justify-content: center;

  div {
    padding: 4px 20px;

    border-radius: 50px;
    border: 1px solid #ffe49a;

    color: #767676;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.24px;
  }
`;

export const Opp = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;

  margin-top: ${({ $isSameSender }) => ($isSameSender ? "8px" : "26px")};
`;

export const Prof = styled.div`
  width: 40px;
  height: 40px;
  background: #d9d9d9;
  border-radius: 50%;
`;

export const OMs = styled.div`
  max-width: 230px;

  padding: 8px 14px;

  border-radius: 10px 10px 10px 0;
  border: 0.5px solid #ffe49a;
  background: #fff;

  display: flex;
  justify-content: flex-start;

  box-sizing: border-box;

  div {
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    line-height: 1.4;

    word-break: break-word;
    white-space: pre-wrap;
  }
`;

export const Me = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  margin-top: ${({ $isSameSender }) => ($isSameSender ? "8px" : "26px")};

  div {
    max-width: 230px;
    padding: 8px 14px;

    border-radius: 10px 10px 0 10px;
    border: 0.5px solid #ffe49a;
    background: #ffe49a;

    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    line-height: 1.4;

    word-break: break-word;
    white-space: pre-wrap;
    box-sizing: border-box;
  }
`;

export const Input = styled.form`
  width: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 7px;

  padding: 10px 0 env(safe-area-inset-bottom);

  box-sizing: border-box;
`;

export const Message = styled.textarea`
  flex: 1;
  min-width: 0;

  height: 41px;
  max-height: 100px;

  padding: 10px 16px;

  border-radius: 29.464px;
  border: 0.982px solid #ffe49a;
  background: #fff;

  color: #21272a;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  outline: none;
  resize: none;

  box-sizing: border-box;

  &::placeholder {
    color: #a4a4a4;
  }

  &:focus {
    border-color: #ffc84a;
  }
`;

export const Send = styled.button`
  width: 41px;
  height: 41px;
  flex-shrink: 0;

  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    width: 41px;
    height: 41px;
    display: block;
  }

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px;
  justify-content: space-between;
  align-items: center;
  width: 216px;
  height: 65px;
  z-index: 1000;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 40px;
  background: #fff;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const Select = styled.div`
  width: 95px;
  height: 53px;
  border-radius: 40px;
  background: #ffe49a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NSelect = styled.div`
  width: 95px;
  height: 53px;
  border-radius: 40px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NBtn = styled.div`
  width: 34px;
  height: 34px;
`;
