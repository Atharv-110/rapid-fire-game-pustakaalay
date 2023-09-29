import React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Instruction from "./components/Instruction";
import Level from "./components/Level";
import Game from "./components/Game";
import Summary from "./components/Summary";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Menu />}  />
          <Route exact path="/instruction" element={<Instruction />}  />
          <Route exact path="/level" element={<Level />}  />
          <Route exact path="/game" element={<Game />}  />
          <Route exact path="/summary" element={<Summary />}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
