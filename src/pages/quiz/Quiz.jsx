import React from "react";
import "./quiz.css";
import { questions } from "./questions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

export default function Quiz() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();
  function send(){}

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      localStorage.setItem("quiz_score",score)
    }
  };

  return (
    <div className="app">
      {showScore ? (
        <section className="showScore-section">
          <p>Your score is {score} out of {questions.length}</p>
          <Link to="/">next challenge</Link>
        </section>
      ) : (
        <>
          <section className="question-section">
            <h1>
              Question {currentQuestion + 1}/{questions.length}
            </h1>
            <p>{questions[currentQuestion].questionText}</p>
          </section>

          <section className="answer-section">
            {questions[currentQuestion].answerOptions.map((item) => (
              <button onClick={() => handleClick(item.isCorrect)}>
                {item.answerText}
              </button>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
