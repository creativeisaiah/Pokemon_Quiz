import React, { useState } from "react";
import Welcome from "./components/Welcome/Welcome";
import Quiz from "./components/Quiz/Quiz";
import Results from "./components/Results/Results";
import PokemonReveal from "./components/PokemonReveal/PokemonReveal";
import MediaPlayer from "./components/MediaPlayer/MediaPlayer";
import "./App.css";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showPokemonReveal, setShowPokemonReveal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [resetClicked, setResetClicked] = useState(false);

  const handleStart = (name) => {
    setUserName(name);
    setStartQuiz(true);
    setUserAnswers([]); // Reset answers
    setQuizQuestions([]); // Reset questions
  };

  const handleAnswers = (answers) => {
    setUserAnswers(answers);
  };

  const handleQuestions = (questions) => {
    setQuizQuestions(questions);
  };

  const handlePokemonSelected = (pokemonName) => {
    setSelectedPokemon(pokemonName);
    setShowPokemonReveal(true);
  };

  const resetApp = () => {
    setResetClicked(true);
    setTimeout(() => setResetClicked(false), 500); // Revert after 500ms

    setStartQuiz(false);
    setIsQuizDone(false);
    setUserName("");
    setUserAnswers([]);
    setQuizQuestions([]);
    setShowPokemonReveal(false);
    setSelectedPokemon("");
  };

  return (
    <div className="App">
      <MediaPlayer />
      <button
        className={`reset-button ${resetClicked ? "reset-button-clicked" : ""}`}
        onClick={resetApp}
      >
        <h2>RESET</h2>
      </button>
      <p className="copyright">@Creativeisaiah</p>
      {!startQuiz && !isQuizDone && <Welcome onStart={handleStart} />}
      {startQuiz && !isQuizDone && (
        <Quiz
          onQuizComplete={() => setIsQuizDone(true)}
          onAnswersComplete={handleAnswers}
          onQuestionsComplete={handleQuestions}
        />
      )}
      {isQuizDone && !showPokemonReveal && (
        <Results
          userName={userName}
          answers={userAnswers}
          questions={quizQuestions}
          onPokemonSelected={handlePokemonSelected}
        />
      )}
      {showPokemonReveal && <PokemonReveal pokemonName={selectedPokemon} />}
    </div>
  );
}

export default App;
