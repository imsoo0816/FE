import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 100dvh;
  padding: 0 0 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #fff0c7;
  width: 100%;
  max-width: 402px;
  flex-shrink: 0;
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
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  div {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.4px;
  }
`;

export const Body = styled.div`
  padding-top: 172px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

export const ImgButton = styled.button`
  position: relative;
  width: 86px;
  height: 86px;
  background: none;
  border: 1px solid #fddf8d;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0;
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
  width: 26px;
  height: 26px;
`;

export const TitleInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 18px;

  p {
    color: #000;
    margin-bottom: 9px;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
  }

  input {
    padding: 20px;
    width: 343px;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
    outline: none;
  }

  input:focus {
    border-color: #ffe49a;
  }

  input:disabled {
    background: #f8f8f8;
    color: #697077;
  }
`;

export const WarningText = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  color: #d93025;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0;
`;

export const AvatarPanel = styled.div`
  width: 343px;
  padding: 14px;
  border: 1px solid #ffe49a;
  border-radius: 10px;
  background: #fffcf4;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  box-sizing: border-box;
`;

export const AvatarOption = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid ${({ $selected }) => ($selected ? "#f4c430" : "#ffffff")};
  background: ${({ $selected }) => ($selected ? "#fff0c7" : "#ffffff")};
  padding: 2px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
`;

export const Message = styled.p`
  width: 343px;
  margin: 0;
  color: #d93025;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

export const Button = styled.button`
  width: 343px;
  height: 55px;
  border-radius: 10px;
  border: 1px solid #ffe49a;
  background: #ffe49a;
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;
