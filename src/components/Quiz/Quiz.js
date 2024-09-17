import React, { useState, useEffect } from "react";
import questionsData from "../data/questions.json";
import "./Quiz.css";

function Quiz(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Shuffle and take 5 questions
    const shuffled = questionsData.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    setQuestions(selected);
    setCurrentQuestion(selected[0]);
  }, []);

  const handleAnswer = (option) => {
    const newAnswers = [
      ...answers,
      { question: currentQuestion.question, answer: option }
    ];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setFadeIn(false); // Reset the fadeIn state
      setTimeout(() => {
        setCurrentQuestion(questions[nextIndex]);
        setCurrentIndex(nextIndex);
        setFadeIn(true); // Trigger the fadeIn animation
      }, 50); // A short delay to ensure the re-render happens
    } else {
      props.onAnswersComplete(newAnswers); // Use newAnswers here
      props.onQuizComplete();
    }
  };

  return (
    <div className={`quiz-container ${fadeIn ? "fade-in" : ""}`}>
      {currentQuestion && (
        <div>
          <h2>{currentQuestion.question}</h2>
          <div>
            {currentQuestion.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
