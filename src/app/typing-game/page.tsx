'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { wordLists } from '@/utils/wordList';
import { Word } from '@/types/word';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/supabase';

import type { User } from '@/types/users';

const difficultySettings: { [key: number]: { speed: number; interval: number } } = {
  1: { speed: 20, interval: 5000 },
  2: { speed: 30, interval: 4000 },
  3: { speed: 40, interval: 3000 },
  4: { speed: 50, interval: 2000 },
  5: { speed: 60, interval: 1000 },
};

const maxDifficulty = Object.keys(difficultySettings).length; 

const TypingGamePage = () => {
  const { getCurrentUserProfile } = useAuth();
  const [words, setWords] = useState<Word[]>([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [gameAreaWidth, setGameAreaWidth] = useState(0);
  const [gameAreaHeight, setGameAreaHeight] = useState(550);
  const [user, setUser] = useState<User | null>(null);
  const maxLives = 5;
  const wordHeight = 80;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await getCurrentUserProfile();
      setUser(userProfile);
    };
  
    fetchUserProfile();
  }, []);

  useEffect(() => {
    setGameAreaWidth(window.innerWidth);
  }, []);

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
        const updatedWords = words.map((word) => ({
          ...word,
          top: word.top + 10
        }));

        const outOfBoundWords = updatedWords.filter((word) => word.top >= gameAreaHeight - wordHeight);
        if (outOfBoundWords.length > 0) {
          setLives((prevLives) => Math.max(0, prevLives - outOfBoundWords.length));
          setWords(updatedWords.filter((word) => word.top < gameAreaHeight - wordHeight));
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
    if (user) { 
      addGameScore(score); 
    }
    setGameStarted(false);
  }
}, [lives, score, user]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (correctWordsCount >= 20 && difficulty < maxDifficulty) {
      setDifficulty(difficulty + 1); // 다음 난이도로 변경
      setCorrectWordsCount(0); // 맞춘 단어 개수 초기화
      setWords([])
      setLives(5);
      alert(`축하합니다! 난이도 ${difficulty + 1}로 이동합니다.`);
    }
  }, [correctWordsCount, difficulty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wordIndex = words.findIndex((word) => word.text === input);
    if (wordIndex !== -1) {
      setWords(words.filter((_, index) => index !== wordIndex));
      setScore(score + 10);
      setCorrectWordsCount(correctWordsCount + 1);
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

  const handleDifficultyChange = (newDifficulty: number) => {
    if (newDifficulty >= 1 && newDifficulty <= maxDifficulty) {
      setDifficulty(newDifficulty);
    }
  };

  const addGameScore = async (finalScore: number) => {
    if (!user) {
      console.error('로그인한 유저가 없어, 점수를 저장할 수 없습니다.');
      return;
    }
  
    try {
      // 1. 현재 점수 가져오기
      const { data: existingScores, error: fetchError } = await supabase
        .from('game_tries')
        .select('score')
        .eq('user_id', user.id)
        .single();
  
      if (fetchError && !existingScores) {
        const { error: insertError } = await supabase
          .from('game_tries')
          .insert([{ user_id: user.id, score: finalScore }]);
        if (insertError) throw insertError;
        console.log('새 점수가 저장되었습니다!');
      } else {
        
        const newTotalScore = existingScores.score + finalScore;
        const { error: updateError } = await supabase
          .from('game_tries')
          .update({ score: newTotalScore })
          .eq('user_id', user.id);
        if (updateError) throw updateError;
        console.log('점수가 업데이트되었습니다!');
      }
    } catch (error) {
      console.error('점수 저장 중 오류 발생:', error);
    }
  };
  
  const lifePercentage = (lives / maxLives) * 60;

  return (
    <div className="flex flex-col bg-gray-100">
      <header className="h-[8vh] flex leading-[7.5vh] font-bold border-solid border-b-2 border-pointColor1">
        <h2 className="w-[8%] h-full text-center bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
          난이도
        </h2>
        <h3 className="w-[8%] h-full text-center text-pointColor2 border-solid border-r-2 border-pointColor1">
          {difficulty}
        </h3>
        <h2 className="w-[8%] h-full text-center bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
          점수
        </h2>
        <h3 className="w-[8%] h-full text-center text-pointColor2 border-solid border-r-2 border-pointColor1">
          {score}
        </h3>
        <h2 className="w-[8%] h-full text-center bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
          생명
        </h2>
        <div className="h-[calc(8vh-2px)] bg-pointColor2" style={{ width: `${lifePercentage}%` }}></div>
      </header>
      <div className="h-[76vh] flex-grow relative">
        {gameStarted ? (
          <>
            {words.map((word) => (
              <div
                key={word.id}
                className="absolute bg-pointColor1 text-white p-2 rounded"
                style={{ top: `${word.top}px`, left: `${word.left}px` }}
              >
                {word.text}
              </div>
            ))}
            <form
              onSubmit={handleSubmit}
              className="h-[10vh] flex gap-3 justify-center absolute bottom-0 left-0 right-0 p-4 border border-solid border-pointColor2 bg-white"
            >
              <input
                type="text"
                value={input}
                placeholder="입력창"
                onChange={handleInput}
                className="w-[60vw] pl-4 text-pointColor1 border border-pointColor1 rounded-md"
              />
              <button type="submit" className="w-[10vw] bg-pointColor1 text-white rounded-md">
                입력
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className='mb-2 text-lg text-pointColor1'>난이도를 선택해주세요!</p>
             <div className="flex mb-4 items-center justify-center">
            {Array.from({ length: maxDifficulty }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleDifficultyChange(index + 1)}
              className={`text-pointColor2 mx-1 ${
                difficulty === index + 1 ? 'bg-pointColor1 text-white' : 'bg-bgColor1'
              } p-1 rounded-md`}
            >
              {index + 1}
            </button>
             ))}
             </div>
            <button onClick={startGame} className="bg-pointColor1 text-white p-4 rounded">
              게임 시작!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingGamePage;
