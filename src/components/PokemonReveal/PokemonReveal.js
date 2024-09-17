import React, { useEffect, useState, useRef } from "react";
import "./PokemonReveal.css";

function PokemonReveal() {
  const [pokemonData, setPokemonData] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Fetch the first page to get the total count
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
      .then((response) => response.json())
      .then((data) => {
        // Generate a random number between 1 and the total count
        const randomId = Math.floor(Math.random() * data.count) + 1;

        // Fetch the random Pokémon's data
        return fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      })
      .then((response) => response.json())
      .then((data) => setPokemonData(data));
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const percentageX = deltaX / centerX;
    const percentageY = deltaY / centerY;
    const rotationY = 15 * percentageX;
    const rotationX = -15 * percentageY;
    cardRef.current.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  if (!pokemonData) return <div>Loading...</div>;

  return (
    <div
      className="pokemon-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pokemon-details">
        <h2 className="typing-effect">{pokemonData.name}!</h2>
        {/* Add any other details you want here */}
      </div>
      <div className="pokemon-image">
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      </div>
    </div>
  );
}

export default PokemonReveal;
