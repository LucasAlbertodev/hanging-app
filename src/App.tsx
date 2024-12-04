import { useEffect, useState } from "react";

import { HangImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { getRandomWord } from "./helpers/getRandomWord";
import "./App.css";

function App() {
  const [word, setWord] = useState(getRandomWord().toUpperCase());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attemps, setAttemps] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    console.log(attemps);
    if (attemps === 9) {
      setGameOver(true);
    }
  }, [attemps]);

  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if (currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord]);

  const checkLetter = (letter: string) => {
    if (gameOver) return;
    if (!word.includes(letter)) {
      setAttemps(Math.min(attemps + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(" ");

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(" "));
  };

  const newGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setHiddenWord("_ ".repeat(newWord.length));
    setAttemps(0);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="App">
      {/* images */}
      {<HangImage imageNumber={attemps} />}
      <h3>{hiddenWord}</h3>
      <h3>Intentos : {attemps}</h3>
      {gameOver && <h1>Has perdido {word}</h1>}
      {won && <h1>Has ganado!! </h1>}
      {letters.map((letter) => (
        <button key={letter} onClick={() => checkLetter(letter)}>
          {letter}
        </button>
      ))}
      <br /> <br />
      <button onClick={newGame}>Nuevo Juego</button>
    </div>
  );
}

export default App;
