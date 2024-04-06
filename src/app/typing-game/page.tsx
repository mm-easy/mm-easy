"use client"

import { useState, useEffect } from 'react';
import { wordLists } from '@/utils/wordList';
import { Word } from '@/types/word';

const difficultySettings: { [key: number]: { speed: number; interval: number } } = {
  1: { speed: 10, interval: 2000 },
  2: { speed: 20, interval: 1000 },
  3: { speed: 30, interval: 500 },
};

const maxDifficulty = Object.keys(difficultySettings).length; 

const TypingGamePage = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const gameAreaWidth = window.innerWidth;
  const maxLives = 5;
  const gameAreaHeight = 600;
  const wordHeight = 80; 

useEffect(() => {
  let interval: NodeJS.Timeout;
  if (gameStarted) {
    interval = setInterval(() => {
      const difficultyKey = difficulty as keyof typeof wordLists; 
      const currentWordList = wordLists[difficultyKey]; 
      const newWord = {
        id: Date.now(),
        text: currentWordList[Math.floor(Math.random() * currentWordList.length)],
        top: 0,
        left: Math.random() * (gameAreaWidth - 200),
      };
      setWords((prevWords) => [...prevWords, newWord]);
    }, difficultySettings[difficulty].interval);
  }
  return () => clearInterval(interval);
}, [gameStarted, difficulty]);

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

  useEffect(() => {
    if (correctWordsCount >= 20 && difficulty < maxDifficulty) {
      setDifficulty(difficulty + 1); // 다음 난이도로 변경
      setCorrectWordsCount(0); // 맞춘 단어 개수 초기화
      alert(`축하합니다! 난이도 ${difficulty + 1}로 이동합니다.`);
    }
  }, [correctWordsCount, difficulty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wordIndex = words.findIndex((word) => word.text === input);
    if (wordIndex !== -1) {
      setWords(words.filter((_, index) => index !== wordIndex));
      setScore(score + 10);
      setCorrectWordsCount(correctWordsCount + 1); // 맞춘 단어의 개수 증가
      setInput('');
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setWords([]);
    setInput('');
    setScore(0);
    setLives(maxLives);
    setDifficulty(1);
  };

  const lifePercentage = (lives / maxLives) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    <header className="flex justify-between items-center bg-white">
    <div className="flex items-center">
      <div className="mr-2">난이도</div>
      <div>{difficulty}</div>
      </div>
      <div className="flex items-center">
      <div className='mr-2'>점수</div>
      <div>{score}</div>
      </div>
      <div className="flex items-center">
        <div className="text-red-500 mr-2">생명</div>
        <div className="w-64 bg-gray-200 h-10">
          <div className="bg-red-500 h-10" style={{ width: `${lifePercentage}%` }}></div>
        </div>
      </div>
    </header>
    <div className="flex-grow relative">
      {gameStarted ? (
        <>
          {words.map(word => (
            <div key={word.id} className="absolute bg-pointColor1 text-white p-2 rounded" style={{ top: `${word.top}px`, left: `${word.left}px` }}>
              {word.text}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-white">
            <input type="text" value={input} onChange={handleInput} className="border border-pointColor1 rounded p-2 w-full" />
            <button type="submit" className="mt-2 bg-pointColor1 text-white p-2 rounded w-full">입력</button>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <button onClick={startGame} className="bg-pointColor1 text-white p-4 rounded">게임 시작!</button>
        </div>
      )}
    </div>
  </div>
);
};

export default TypingGamePage;
