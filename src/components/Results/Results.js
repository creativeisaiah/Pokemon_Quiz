import React, { useState, useEffect, useRef } from "react";
import "./Results.css";

function Results({ userName, answers, questions, onPokemonSelected }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [allRendered, setAllRendered] = useState(false);
  const resultsContainerRef = useRef(null); // Create a ref

  useEffect(() => {
    if (revealedCount === answers.length) {
      setAllRendered(true);
    }
  }, [revealedCount, answers]);

  useEffect(() => {
    if (revealedCount < answers.length) {
      const timer = setTimeout(() => {
        setRevealedCount(revealedCount + 1);

        // Add a slight delay before adjusting the scroll position
        setTimeout(() => {
          resultsContainerRef.current.scrollTop =
            resultsContainerRef.current.scrollHeight;
        }, 100); // 100ms delay
      }, 2500); // 2 seconds delay, adjust as needed

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [revealedCount, answers]);

  const handleRevealPokemon = () => {
    // Fetch a random Pokémon (you can modify this logic)
    const randomPokemonId = Math.floor(Math.random() * 151) + 1; // For first-generation Pokémon

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        onPokemonSelected(data.name); // Notify App.js about the selected Pokemon
      });
  };

  console.log(answers);
  console.log(questions);
  return (
    <div className="results-container" ref={resultsContainerRef}>
      <h1>Hello {userName},</h1>
      {answers.slice(0, revealedCount).map((answerObj, index) => (
        <div key={index} className="answer-block glassmorphism-card">
          <p>
            When asked the question "{answerObj.question}". Your response was "
            {answerObj.answer}".
          </p>
        </div>
      ))}
      <p></p>

      {allRendered && (
        <button onClick={handleRevealPokemon}>
          Find out your spirit Pokémon!
        </button>
      )}
    </div>
  );
}

export default Results;
