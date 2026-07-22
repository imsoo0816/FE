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
import RoomDetail from "./pages/RoomDetail";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Prof />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatroom/:roomId" element={<Chatroom />} />
          <Route path="/make" element={<Make />} />
          <Route path="/roomdetail" element={<RoomDetail />} />
          <Route path="/roomdetail/:roomId" element={<RoomDetail />} />
          <Route path="/profile/update" element={<ProfileUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
