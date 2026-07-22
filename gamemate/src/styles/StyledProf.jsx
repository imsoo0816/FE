import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 0px;
  height: 100dvh;
  padding: 0; /* 불필요한 패딩 제거 */
  box-sizing: border-box; /* 패딩이 width에 포함되도록 설정 */
  display: flex;
  flex-direction: column;
  background: #fff0c7;
  width: 100%;
  max-width: 402px;
  min-width: 350px; /* 최소 너비 설정 -수연 추가 */
  flex-shrink: 0;
  overflow: hidden;
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

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  align-items: center;
  justify-content: center;
`;

export const Img = styled.div`
  position: relative;
  width: 68px;
  height: 68px;
  background: none;
  border: 1px solid #ffe49a;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;

  img#person {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const EditIcon = styled.img`
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 22px;
  height: 22px;
`;

export const Name = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.3px;
  cursor: pointer;
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

  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: #f72323;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  right: 4px;
  bottom: 12px;

  color: #fff;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0;
`;

export const Category = styled.div`
  position: fixed;
  top: 137px;
  left: 50%;
  transform: translateX(-50%);
  width: 393px;
  height: 65px;
  padding: 18px 25px;
  z-index: 999;
`;

export const CList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  align-items: center;
`;

export const LBtn = styled.button`
  display: flex;
  height: 28px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 10px;
  background: ${({ $selected }) => ($selected ? "#ffe49a" : "#fff")};

  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.3px;

  cursor: pointer;
  transition: background-color 0.2s ease;
`;

export const Body = styled.div`
  position: fixed;
  top: 202px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 402px;
  padding-bottom: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;
export const List = styled.div`
display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 13px 25px;
  flex: 0 0 auto;
`;

export const Component = styled.div`
width: 343px;
  height: 126px;
  border-radius: 10px;
  border: 1px solid #ffe49a;
  background: #fffcf4;
  padding: 22px 18px 20px 12px;
  display: flex;
  flex-direction: row;
  gap: 13px;
`;
export const ProfileImg = styled.div`
 width: 35px;
  height: 35px;
  background: #d9d9d9;
  border-radius: 50%;
`;

export const Content = styled.div`
width: 265px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Text = styled.div`
gap: 6px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;
export const Up = styled.div`
display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  #title {
    color: #21272a;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%; /* 16.5px */
  }

  #members {
    color: #21272a;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%; /* 16.5px */
  }

  #status {
    flex: 0 0 auto;
    padding: 3px 8px;
    border-radius: 10px;
    background: #ffe49a;
    color: #000;
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  }
`;
export const Down = styled.div`
  color: #697077;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
`;
export const ButtonLeft = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #fff0c7;
  border: 1px solid #FFE49A;
  color: #000;
  cursor: pointer;
`;
export const ButtonRight = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #FFE49A;
  color: #000;
  cursor: pointer;
`;
export const Button = styled.div`width: 265px;
width: 265px;
  height: 33px;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;`;

export const NBtn = styled.div`
  width: 34px;
  height: 34px;
`;

export const Message = styled.p`
  width: 343px;
  color: #d93025;
  margin: 0;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.28px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
`;

export const Modal = styled.div`
  width: calc(100% - 56px);
  max-width: 335px;
  min-height: 300px;
  padding: 44px 30px 30px;
  border-radius: 34px;
  background: #fffcf4;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Pretendard;
`;

export const ModalIcon = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid ${({ $danger }) => ($danger ? "#ff3b30" : "#ffe49a")};
  color: ${({ $danger }) => ($danger ? "#ff3b30" : "#000")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  box-sizing: border-box;
`;

export const ModalTitle = styled.div`
  margin-top: 22px;
  color: #21272a;
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
  text-align: center;
`;

export const ModalDescription = styled.div`
  margin-top: 28px;
  margin-bottom: 40px;
  color: #697077;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export const ModalPrimaryButton = styled.button`
  width: 100%;
  height: 54px;
  border: 1px solid #ffe49a;
  border-radius: 10px;
  background: #ffe49a;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

export const ModalSecondaryButton = styled.button`
  width: 100%;
  height: 54px;
  margin-top: 8px;
  border: 1px solid #ffe49a;
  border-radius: 10px;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
