import React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Summary from "./components/Summary";

const App = () => {
  return (
    <div className="App">
      <h1>Rapid Fire</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Game />}  />
          <Route exact path="/summary" element={<Summary />}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
