"use client"

import { useState, useEffect } from 'react';
import { wordList } from '@/utils/wordList';

type Word = {
  id: number;
  text: string;
  top: number;
  left: number;
}

const TypingGamePage = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const maxLives = 5;
  const gameAreaHeight = 600; // 게임 영역의 높이
  const wordHeight = 30; // 단어의 높이

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted) {
      interval = setInterval(() => {
        const newWord = {
          id: Date.now(),
          text: wordList[Math.floor(Math.random() * wordList.length)],
          top: 0,
          left: Math.random() * (window.innerWidth - 100) - 50
        };
        setWords((prevWords) => [...prevWords, newWord]);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted) {
      interval = setInterval(() => {
        const updatedWords = words.map(word => ({
          ...word,
          top: word.top + 10
        }));

        const outOfBoundWords = updatedWords.filter(word => word.top >= gameAreaHeight - wordHeight);
        if (outOfBoundWords.length > 0) {
          setLives((prevLives) => Math.max(0, prevLives - outOfBoundWords.length));
          setWords(updatedWords.filter(word => word.top < gameAreaHeight - wordHeight));
        } else {
          setWords(updatedWords);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [words, gameStarted]);

  useEffect(() => {
    if (lives <= 0) {
      alert(`게임 오버! 당신의 점수는 ${score}점입니다.`);
      setGameStarted(false);
    }
  }, [lives, score]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = words.find(word => word.text === input);
    if (match) {
      setWords(prevWords => prevWords.filter(word => word.id !== match.id));
      setScore(prevScore => prevScore + 100);
    }
    setInput('');
  };

  const startGame = () => {
    setGameStarted(true);
    setWords([]);
    setInput('');
    setScore(0);
    setLives(maxLives);
  };

  const lifePercentage = (lives / maxLives) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-bgColor1">
      <header className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-lg ml-4">점수: {score}</div>
        </div>
        <div className="flex">
        <div className="w-80 bg-white h-10 border border-solid border-black">
            <div className="bg-red-600 h-10" style={{ width: `${lifePercentage}%` }}></div>
          </div>
        </div>
      </header>
      {gameStarted ? (
          <div className="w-full min-h-screen bg-white shadow-lg relative">
          {words.map((word) => (
            <div
              key={word.id}
              className="absolute bg-pointColor1 text-white p-3 text-lg"
              style={{ top: `${word.top}px`, left: `${word.left}px` }}
            >
              {word.text}
            </div>
          ))}
          <div className="absolute bottom-0 w-full">
            <form className="flex justify-center items-center bg-white p-4" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={handleInput}
                className="border border-solid border-pointColor1 p-4 w-1/2 text-lg"
                placeholder="여기에 입력하세요..."
              />
              <button
                type="submit"
                className="bg-pointColor1 text-white p-4 ml-4 text-lg"
              >
                입력
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <button onClick={startGame} className="bg-blue-600 text-white text-lg py-2 px-6 rounded focus:outline-none">게임 시작</button>
        </div>
      )}
    </div>
  );
};

export default TypingGamePage;
