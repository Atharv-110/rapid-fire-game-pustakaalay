import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Swal from "sweetalert2";

// import Images
import pauseBtn from "../assets/pause-btn.svg";
import submitBtn from "../assets/submit-btn.svg";

import gameData from "../assets/gameData";

const Game = () => {
  const navigate = useNavigate();

  const [isPlaying, setPlaying] = useState(true);

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
      setPlaying(false);
      Swal.fire({
        allowOutsideClick: false,
        icon: "success",
        title: "Right Answer",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        setPlaying(true);
      });
      if (player === "Player 1") {
        setCorrectCountOne(correctCountOne + 1);
        console.log("Player 1 Answer is Correct");
      } else {
        setCorrectCountTwo(correctCountTwo + 1);
        console.log("Player 2 Answer is Correct");
      }
    } else {
      setPlaying(false);
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Wrong",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        setPlaying(true);
      });
    }
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswer("");
    setDisableOne(false);
    setDisableTwo(false);
    setinputDisable(true);
    setPlayer("Player");
  };

  // Pause Function
  const handlePause = () => {
    // console.log("Pause");
    setPlaying(false);
    Swal.fire({
      title: "Game Paused!",
      iconHtml: '<i class="fa-solid fa-pause" style="color: #000000;"></i>',
      allowOutsideClick: false,
      showDenyButton: true,
      confirmButtonText: "Resume",
      denyButtonText: `Quit`,
    }).then((result) => {
      if (result.isConfirmed) {
        setPlaying(true);
      } else {
        navigate("/");
      }
    });
  };

  if (currentQuestion >= gameData.length) {
    navigate("/summary");
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
      <div className="game-header">
        <button onClick={handlePause} className="game-pause-btn">
          <img src={pauseBtn} alt="pause-button-img" />
        </button>
        <div className="game-timer">
          <CountdownCircleTimer
            strokeLinecap={"round"}
            size={60}
            strokeWidth={5}
            isPlaying={isPlaying}
            // isPlaying={false}
            duration={50}
            trailColor="#fff"
            colors="#f000f5"
            onComplete={() => complete()}
          >
            {({ remainingTime }) => (
              <h1 className="game-timer-count">{remainingTime}</h1>
            )}
          </CountdownCircleTimer>
        </div>
      </div>
      <div className="game_container">
        <div className="game_container_control">
          <button
            className="player_btn"
            disabled={disableOne}
            onClick={handlePlayerOne}
          >
            Player 1
          </button>
          <h1>{currentQuestionObj.question}</h1>
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
        <img src={submitBtn} alt="" />
      </button>
    </div>
  );
};

export default Game;
