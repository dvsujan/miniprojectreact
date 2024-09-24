import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import LandingPage from "./components/LandingPage/LandingPage";
import GamePage from "./components/GamePage/GamePage";
import { GameProvider } from "./GameContext";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/2pgame" element={<GamePage aiplayer={false} />} />
          <Route path="/aigame" element={<GamePage aiplayer={true} />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
