import React, { useState } from "react";
import "./Welcome.css";

function Welcome(props) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      // Pass the name to the parent component or wherever you're handling navigation/storing user's info
      console.log(name);
      props.onStart(name);

      // Proceed to the quiz...
    }
  };

  return (
    <div className="welcome-container">
      <div className="card">
        <h1>Pokémon Mystery Dungeon Quiz!</h1>
        <p>Enter your name and discover your spirit Pokémon.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Start Quiz</button>
        </form>
      </div>
    </div>
  );
}

export default Welcome;
