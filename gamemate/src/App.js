import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import GlobalStyle from "./pages/GlobalStyles";
import Home from "./pages/Home";
import Prof from "./pages/Prof";
import Chat from "./pages/Chat";
import Chatroom from "./pages/Chatroom";
import Make from "./pages/Make";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Prof />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="/make" element={<Make />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
