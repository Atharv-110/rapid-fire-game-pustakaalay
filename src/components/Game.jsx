import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import gameData from "../assets/gameData";

const Game = () => {
  const navigate = useNavigate();

  const [player, setPlayer] = useState("Player");
  const [disableOne, setDisableOne] = useState(false);
  const [disableTwo, setDisableTwo] = useState(false);
  const [inputDisable, setinputDisable] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  const [correctCountOne, setCorrectCountOne] = useState(0);
  const [correctCountTwo, setCorrectCountTwo] = useState(0);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handlePlayerOne = () => {
    setinputDisable(false);
    setDisableTwo(true);
    setPlayer("Player 1");
  };
  const handlePlayerTwo = () => {
    setinputDisable(false);
    setDisableOne(true);
    setPlayer("Player 2");
  };

  const complete = () => {
    navigate("/summary");
  };

  const handleSubmit = () => {
    // Logic for Answer check
    const correctAnswer = gameData[currentQuestion].answer;
    const answerIsCorrect = userAnswer === correctAnswer;
    if (answerIsCorrect) {
      if (player === "Player 1") {
        setCorrectCountOne(correctCountOne + 1);
        console.log("Player 1 Answer is Correct");
      } else {
        setCorrectCountTwo(correctCountTwo + 1);
        console.log("Player 2 Answer is Correct");
      }
    }
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswer("");
    setDisableOne(false);
    setDisableTwo(false);
    setinputDisable(true);
    setPlayer(null);
  };

  if (currentQuestion >= gameData.length) {
    // navigate("/summary");
    return (
      <div>
        <h1>Player 1 Score: {correctCountOne}</h1>
        <h1>Player 2 Score: {correctCountTwo}</h1>
      </div>
    );
  }

  const currentQuestionObj = gameData[currentQuestion];

  return (
    <div className="game">
      <CountdownCircleTimer
        strokeLinecap={"round"}
        size={60}
        strokeWidth={4}
        isPlaying={true}
        duration={60}
        trailColor="black"
        colors="red"
        onComplete={complete}
      >
        {({ remainingTime }) => (
          <p className="game-timer-count">{remainingTime}</p>
        )}
      </CountdownCircleTimer>
      <div className="">
        <div className="game_container">
          <button
            className="player_btn"
            disabled={disableOne}
            onClick={handlePlayerOne}
          >
            Player 1
          </button>
          <h1 className="">{currentQuestionObj.question}</h1>
          <button
            className="player_btn"
            disabled={disableTwo}
            onClick={handlePlayerTwo}
          >
            Player 2
          </button>
        </div>
        <div className="game_answer_input">
          <label htmlFor="answer">{player}</label>
          <input
            disabled={inputDisable}
            type="text"
            id="answer"
            value={userAnswer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
          />
        </div>
      </div>
      <button
        className="submit_Btn"
        disabled={inputDisable}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Game;
