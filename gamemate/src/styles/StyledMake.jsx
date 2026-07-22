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
  flex-shrink: 0;
  overflow: hidden;
`;

export const Header = styled.div`
  height: 137px;
  width: 100%;
  max-width: 402px;
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
  box-sizing: border-box;
  background: #fff0c7;
`;

export const Title = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
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

export const Category = styled.div`
  width: 393px;
  height: 65px;
  padding: 18px 25px;
`;

export const CList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  align-items: center;
`;

export const LBtn = styled.div`
  display: flex;
  width: 60px;
  height: 28px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #ffe49a;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.3px;
`;

export const Plus = styled.div`
  width: 24px;
  height: 24px;
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

export const Body = styled.div`
  position: fixed;
  top: 137px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 402px;
  padding: 35px 0 40px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap:20px;
    p{
    color: #000;
    margin-bottom: 9px;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.3px;
}

`;
export const GameSelect = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
select{
appearance: none;
-webkit-appearance: none;
padding:20px 48px 20px 20px;
width: 343px;
background: #ffffff;
background-image: url("/images/chevron-down.svg");
background-repeat: no-repeat;
background-position: right 18px center;
background-size: 16px 16px;
border: 1px solid #D9D9D9;
border-radius: 10px;
color: #A2A2A2;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.3px;
}

`;
export const TitleInput = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
input{
padding:20px;
width: 343px;
    border-radius: 10px;
background: #ffffff;
border: 1px solid #D9D9D9;
color: #A2A2A2;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.3px;
}
`;
export const ContentInput = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
textarea{
  resize: none;
padding:20px;
width: 343px;
height: 118px;
background: #ffffff;
border: 1px solid #D9D9D9;
color: #A2A2A2;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.3px;
border-radius: 10px;

}
}`;
export const DetailSelect = styled.div`
display: flex;
width: 343px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

#SelectBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
select{
width: 161px;
appearance: none;
-webkit-appearance: none;
padding:20px 42px 20px 20px;
background: #ffffff;
background-image: url("/images/chevron-down.svg");
background-repeat: no-repeat;
background-position: right 16px center;
background-size: 16px 16px;
border: 1px solid #D9D9D9;
color: #A2A2A2;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.3px;
    border-radius: 10px;

}
`;
export const Button = styled.button`
width: 343px;
  height: 55px;
  min-height: 55px;
  flex: 0 0 55px;
  border-radius: 10px;
  border: 1px solid #ffe49a;
  background: #ffe49a;
  margin-top: 30px;
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
letter-spacing: -0.34px;

&:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
`;

export const Message = styled.p`
  width: 343px;
  color: #d93025 !important;
  margin: 0 !important;
  font-family: Pretendard;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.28px;
`;
