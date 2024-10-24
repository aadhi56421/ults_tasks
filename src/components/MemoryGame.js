import React, { useEffect, useState } from "react";
import useMemoryGame from "./useMemoryGame";
import "../components/style.css";

const cards = [
  { id: 1, value: "🐶" },
  { id: 1, value: "🐶" },
  { id: 2, value: "🐱" },
  { id: 2, value: "🐱" },
  { id: 3, value: "🐻" },
  { id: 3, value: "🐻" },
  { id: 4, value: "🦊" },
  { id: 4, value: "🦊" },
  { id: 5, value: "🐸" },
  { id: 5, value: "🐸" },
  { id: 6, value: "🐯" },
  { id: 6, value: "🐯" },
  { id: 7, value: "🦁" },
  { id: 7, value: "🦁" },
  { id: 8, value: "🐧" },
  { id: 8, value: "🐧" },
];

const MemoryGame = () => {
  const { grid, flipped, matched, moves, handleCardClick, resetGame } =
    useMemoryGame(cards);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (matched.length === cards.length) {
      alert(`You won in ${moves} moves and ${timer} seconds!`);
    }
  }, [matched]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-4">Memory Card Game</h1>
      <div className="grid grid-cols-4 gap-4">
        {grid.map((card, index) => (
          <div
            key={index}
            className={`card ${
              flipped.includes(index) || matched.includes(index)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-front">{card.value}</div>
            <div className="card-back"></div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p>Moves: {moves}</p>
        <p>Time: {timer} sec</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
        onClick={resetGame}
      >
        Restart Game
      </button>
    </div>
  );
};

export default MemoryGame;
