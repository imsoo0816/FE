import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`  
  @font-face { font-family: 'Pretendard'; src: url('/fonts/pretendard/Pretendard-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; } 
  
  @font-face { font-family: 'Pretendard'; src: url('/fonts/pretendard/Pretendard-Medium.woff2') format('woff2'); font-weight: 500; font-display: swap; } 
  
  @font-face { font-family: 'Pretendard'; src: url('/fonts/pretendard/Pretendard-SemiBold.woff2') format('woff2'); font-weight: 600; font-display: swap; } 
  
  @font-face { font-family: 'Pretendard'; src: url('/fonts/pretendard/Pretendard-Bold.woff2') format('woff2'); font-weight: 700; font-display: swap; }
  
  @font-face {
	font-family: 'Pretendard Variable';
	font-weight: normal;
	font-style: normal;
	font-display: block;
	src: url('./fonts/pretendard/PretendardVariable.woff2') format('woff2-variations');
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.22) transparent;
  }

  *::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.18);
    border-radius: 999px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.28);
  }

  body {
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-family: 'Pretendard Variable', sans-serif;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
