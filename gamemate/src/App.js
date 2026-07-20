import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import GlobalStyle from "./pages/GlobalStyles";
import Home from "./pages/Home";
import Prof from "./pages/Prof";
import Chat from "./pages/Chat";
import Chatroom from "./pages/Chatroom";
import Make from "./pages/Make";
import SignupLogin from "./pages/SignupLogin";
import ProfileUpdate from "./pages/ProfileUpdate";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Prof />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatroom/:roomId" element={<Chatroom />} />
        <Route path="/make" element={<Make />} />
        <Route path="/" element={<SignupLogin />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
