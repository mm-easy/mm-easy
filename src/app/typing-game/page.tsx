'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { wordLists } from '@/utils/wordList';
import { Word } from '@/types/word';
import { supabase } from '@/utils/supabase/supabase';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store/store';
import { useRouter } from 'next/navigation';

import type { User } from '@/types/users';
import type { DifficultySetting } from '@/types/difficultySetting';

const difficultySettings: { [key: number]: DifficultySetting } = {
  1: { label: '초보', speed: 20, interval: 5000 },
  2: { label: '하수', speed: 30, interval: 4000 },
  3: { label: '중수', speed: 40, interval: 3000 },
  4: { label: '고수', speed: 50, interval: 2000 },
  5: { label: '지존', speed: 70, interval: 2000 }
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [gameAreaHeight, setGameAreaHeight] = useState(0);
  const router = useRouter();
  const maxLives = 5;
  const wordHeight = 80;

  useEffect(() => {
    setGameAreaHeight(Math.floor(window.innerHeight * 0.8));
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLoggedIn) {
        const userProfile = await getCurrentUserProfile();
        setUser(userProfile);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn]);

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
          left: Math.random() * (gameAreaWidth - 200)
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
      setScore(0);
      setLives(maxLives);
      setWords([]);
      setCorrectWordsCount(0);
    }
  }, [lives, score, user]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (correctWordsCount >= 20 && difficulty < maxDifficulty) {
      setDifficulty(difficulty + 1); // 다음 난이도로 변경
      setCorrectWordsCount(0); // 맞춘 단어 개수 초기화
      setWords([]);
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
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setGameStarted(true);
      setWords([]);
      setInput('');
      setScore(0);
      setLives(maxLives);
      setCorrectWordsCount(0);
    }
  };

  const proceedWithoutLogin = () => {
    setShowLoginModal(false);
    setGameStarted(true);
    setWords([]);
    setInput('');
    setScore(0);
    setLives(maxLives);
    setCorrectWordsCount(0);
  };

  const goToLogin = () => {
    router.push('/login');
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
        // 2. 새로운 점수 추가
        const { error: insertError } = await supabase
          .from('game_tries')
          .insert([{ user_id: user.id, score: finalScore }]);
        if (insertError) throw insertError;
        console.log('새 점수가 저장되었습니다!');
      } else {
        // 3. 현재 점수와 새로운 점수 비교 후 업데이트
        const currentScore = existingScores?.score || 0;
        if (finalScore > currentScore) {
          const { error: updateError } = await supabase
            .from('game_tries')
            .update({ score: finalScore })
            .eq('user_id', user.id);
          if (updateError) throw updateError;
          console.log('점수가 업데이트되었습니다!');
        } else {
          console.log('현재 점수보다 낮기 때문에 업데이트되지 않았습니다.');
        }
      }
    } catch (error) {
      console.error('점수 저장 중 오류 발생:', error);
    }
  };

  const lifePercentage = (lives / maxLives) * 60;

  return (
    <div className="relative flex flex-col">
      {gameStarted && (
        <header className="w-full h-[8vh] absolute z-30 flex leading-[7.5vh] font-bold text-xl border-solid border-b-2 border-pointColor1 bg-white">
          <h2 className="w-[8%] h-full text-center bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
            난이도
          </h2>
          <h3 className="w-[8%] h-full text-center text-pointColor2 border-solid border-r-2 border-pointColor1">
            {difficultySettings[difficulty].label}
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
      )}
      <div className="h-[84vh] flex-grow relative">
        {gameStarted ? (
          <div>
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
              className="h-[10vh] flex gap-3 justify-center absolute bottom-0 left-0 right-0 p-4 bg-pointColor3"
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
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-6 font-bold text-2xl text-pointColor1">난이도를 선택해주세요!</p>
            <div className="flex mb-4 items-center justify-center">
              {Array.from({ length: maxDifficulty }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handleDifficultyChange(index + 1)}
                  className={`text-pointColor1 mx-3 mb-6 ${
                    difficulty === index + 1
                      ? 'bg-pointColor1 text-white font-bold'
                      : 'font-bold border border-solid border-pointColor1'
                  } p-2 text-lg w-12 rounded-md`}
                >
                  {difficultySettings[index + 1].label}
                </button>
              ))}
            </div>
            <button onClick={startGame} className="w-[25%] bg-pointColor1 text-white text-lg font-bold p-4 rounded">
              시작하기
            </button>
          </div>
        )}
      </div>
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl border-solid border-2 border-pointColor1">
            <h2 className="font-bold text-xl mb-4">로그인이 필요합니다</h2>
            <p className="mb-4">로그인하지 않으면 점수가 저장되지 않습니다.</p>
            <div className="flex justify-around">
              <button onClick={proceedWithoutLogin} className="bg-gray-300 text-black font-bold py-2 px-4 rounded">
                그냥 진행하기
              </button>
              <button onClick={goToLogin} className="bg-pointColor1 text-white font-bold py-2 px-4 rounded">
                로그인 하러가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingGamePage;
