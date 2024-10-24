import { useState, useEffect } from "react";

const useMemoryGame = (initialCards) => {
  const [grid, setGrid] = useState(() =>
    [...initialCards].sort(() => Math.random() - 0.5)
  );
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (index) => {
    if (
      selected.length === 2 ||
      matched.includes(index) ||
      selected.includes(index)
    )
      return;
    setSelected((prev) => [...prev, index]);
    setFlipped((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (grid[first].id === grid[second].id) {
        setMatched((prev) => [...prev, first, second]);
      }
      setTimeout(() => {
        setSelected([]);
        setFlipped((prev) => prev.filter((i) => ![first, second].includes(i)));
      }, 1000);
      setMoves((prev) => prev + 1);
    }
  }, [selected, grid]);

  const resetGame = () => {
    setGrid([...initialCards].sort(() => Math.random() - 0.5));
    setSelected([]);
    setMatched([]);
    setFlipped([]);
    setMoves(0);
  };

  return { grid, flipped, matched, moves, handleCardClick, resetGame };
};

export default useMemoryGame;
