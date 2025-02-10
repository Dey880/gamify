import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import CreateGame from "./pages/CreateGame";
import GamePage from "./pages/GamePage";
import IndividualGame from "./pages/IndividualGame";

export default function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<LandingPage  />}> </Route>
        <Route path="/login" element={<Login  />}> </Route>
        <Route path="/register" element={<Register  />}> </Route>
        <Route path="/profile" element={<Profile  />}> </Route>
        <Route path="/creategame" element={<CreateGame  />}> </Route>
        <Route path="/games" element={<GamePage  />}> </Route>
        <Route path="/game/:id" element={<IndividualGame  />}> </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFound  />}> </Route>
      </Routes>
    </div>
  );
};