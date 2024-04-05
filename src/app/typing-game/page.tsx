"use client"

import { useState, useEffect } from 'react';

interface Word {
  id: number;
  text: string;
  top: number;
}

const wordList = [
  "fifa", "maple", "lol", "battleground", "철권",
  "던전앤파이터", "카트라이더", "포켓몬스터", "디지몬", "짱구"
];

const TypingWordPage = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10); // 초기 생명 3개로 설정
  const maxLives = 10; // 최대 생명 값

  useEffect(() => {
    const interval = setInterval(() => {
      const newWord = {
        id: Date.now(),
        text: wordList[Math.floor(Math.random() * wordList.length)],
        top: 0
      };
      setWords((prevWords) => [...prevWords, newWord]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedWords = words.map(word => ({
        ...word,
        top: word.top + 10
      }));

      const outOfBoundWords = updatedWords.filter(word => word.top >= 150);
      if (outOfBoundWords.length > 0) {
        setLives((prevLives) => prevLives - outOfBoundWords.length);
        setWords(updatedWords.filter(word => word.top < 150));
      } else {
        setWords(updatedWords);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [words]);

  useEffect(() => {
    if (lives <= 0) {
      alert('게임 오버! 당신의 점수는 ' + score + '점입니다.');
      setWords([]);
      setInput('');
      setScore(0);
      setLives(maxLives);
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

  const lifePercentage = (lives / maxLives) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-2xl font-bold mb-4">타자 게임</div>
      <div className="w-full max-w-xl h-64 bg-white shadow-md relative overflow-hidden">
        {words.map((word) => (
          <div key={word.id} className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-2" style={{ top: `${word.top}px` }}>
            {word.text}
          </div>
        ))}
      </div>
      <form className="mt-4 flex" onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInput} className="border-2 border-gray-300 p-2 w-full" placeholder="여기에 입력하세요..." />
        <button type="submit" className="bg-blue-500 text-white p-2 ml-2">입력</button>
      </form>
      <div className="mt-4 w-full max-w-xl">
        <div className="bg-gray-400 w-full h-4">
          <div className="bg-green-500 h-4" style={{ width: `${lifePercentage}%` }}></div>
        </div>
        <div>점수: {score} | 남은 생명: {lives}</div>
      </div>
    </div>
  );
};

export default TypingWordPage;
