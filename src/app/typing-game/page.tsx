'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect, useRef } from 'react';
import { wordLists } from '@/utils/wordList';
import { Word } from '@/types/word';
import { supabase } from '@/utils/supabase/supabase';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store/store';
import { useRouter } from 'next/navigation';
import { BiSolidVolumeFull } from 'react-icons/bi';
import { toast } from 'react-toastify';
import ExitButton from '@/components/common/ExitButton';
import useMultilingual from '@/utils/useMultilingual';

import type { User } from '@/types/users';
import type { DifficultySetting } from '@/types/difficultySetting';

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
  const [volume, setVolume] = useState(0.5);
  const [slowMotion, setSlowMotion] = useState(false);
  const slowMotionDuration = 5000; // 느린 모션 지속 시간을 5초로 설정
  const [specialWord, setSpecialWord] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [frozenEffect, setFrozenEffect] = useState(false);
  const m = useMultilingual('typing-game');

  const router = useRouter();
  const maxLives = 5;
  const wordHeight = 80;

  const gameoverSound = useRef<HTMLAudioElement | null>(null);
  const wordpopSound = useRef<HTMLAudioElement | null>(null);
  const backgroundMusic = useRef<HTMLAudioElement | null>(null);
  const wrongAnswer = useRef<HTMLAudioElement | null>(null);
  const levelUp = useRef<HTMLAudioElement | null>(null);
  const newWrongAnswerSound = useRef<HTMLAudioElement | null>(null);
  const lifeDrainingSound = useRef<HTMLAudioElement | null>(null);
  const specialWordSound = useRef<HTMLAudioElement | null>(null);
  const lobbyMusic = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const finalRoundMusic = useRef<HTMLAudioElement | null>(null);

  /** 게임 난이도에 따라 다른 배경음악을 재생. difficulty 상태에 따라 선택된 음악 파일 경로를 설정하고, 
  backgroundMusic ref를 통해 오디오 플레이어의 소스를 변경하며 재생을 시작 */
  const playBackgroundMusic = () => {
    let bgMusicUrl;
    if (difficulty === 3) {
      bgMusicUrl = 'game/greatYJ.mp3';
    } else if (difficulty === 5) {
      bgMusicUrl = 'game/FinalRound.mp3';
    } else {
      bgMusicUrl = 'game/SeoulVibes.mp3';
    }
    if (backgroundMusic.current) {
      if (backgroundMusic.current.src !== bgMusicUrl) {
        // 소스가 업데이트가 필요한지 확인
        backgroundMusic.current.src = bgMusicUrl;
        backgroundMusic.current.loop = true;
        backgroundMusic.current.play();
      }
    }
  };

  /** 게임이 시작되거나 난이도가 변경될 때 playBackgroundMusic 함수를 호출하여 배경음악을 조절 */
  useEffect(() => {
    // 게임이 시작되었을 때만 배경음악 변경 실행
    if (gameStarted) {
      playBackgroundMusic();
    }
  }, [difficulty, gameStarted]);

  /** 게임 효과음 */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gameoverSound.current = new Audio('game/gameover.mp3');
      wordpopSound.current = new Audio('game/wordpopped.wav');
      wrongAnswer.current = new Audio('game/wrongAnswer.wav');
      levelUp.current = new Audio('game/levelUp.wav');
      backgroundMusic.current = new Audio('game/SeoulVibes.mp3');
      newWrongAnswerSound.current = new Audio('game/wrongAnswer.wav');
      lifeDrainingSound.current = new Audio('game/failure.wav');
      specialWordSound.current = new Audio('game/specialWord.wav');
      lobbyMusic.current = new Audio('game/Lobby.mp3');
      clickSound.current = new Audio('game/clickSound.wav');
      finalRoundMusic.current = new Audio('game/FinalRound.mp3');

      /** 클린업 함수 */
      return () => {
        if (gameoverSound.current) gameoverSound.current.pause();
        if (backgroundMusic.current) backgroundMusic.current.pause();
        if (wordpopSound.current) wordpopSound.current.pause();
        if (wrongAnswer.current) wrongAnswer.current.pause();
        if (levelUp.current) levelUp.current.pause();
        if (lifeDrainingSound.current) lifeDrainingSound.current.pause();
        if (specialWordSound.current) specialWordSound.current.pause();
        if (lobbyMusic.current) lobbyMusic.current.pause();
        if (clickSound.current) clickSound.current.pause();
        if (finalRoundMusic.current) finalRoundMusic.current.pause();
      };
    }
  }, []);

  /** 게임 볼륨 조절 */
  useEffect(() => {
    if (gameoverSound.current) gameoverSound.current.volume = volume;
    if (wordpopSound.current) wordpopSound.current.volume = volume;
    if (wrongAnswer.current) wrongAnswer.current.volume = volume;
    if (backgroundMusic.current) backgroundMusic.current.volume = volume;
    if (levelUp.current) levelUp.current.volume = volume;
    if (lifeDrainingSound.current) lifeDrainingSound.current.volume = volume;
    if (specialWordSound.current) specialWordSound.current.volume = volume;
    if (lobbyMusic.current) lobbyMusic.current.volume = volume;
    if (clickSound.current) clickSound.current.volume = volume;
  }, [volume]);

  /** 게임의 시작 상태에 따라 로비 음악을 재생하거나 정지 */
  useEffect(() => {
    if (!gameStarted && lobbyMusic.current) {
      lobbyMusic.current.play();
      lobbyMusic.current.loop = true;
    } else if (gameStarted && lobbyMusic.current) {
      lobbyMusic.current.pause();
      lobbyMusic.current.currentTime = 0; // 음악을 처음으로 되돌림
    }
  }, [gameStarted]);

  /** window.innerHeight를 사용하여 게임 영역의 높이를 동적으로 계산 */
  useEffect(() => {
    setGameAreaHeight(Math.floor(window.innerHeight * 0.8));
  }, []);

  /** 난이도가 5 이상일 때 무작위로 특별 단어를 선택하고 상태를 업데이트 */
  useEffect(() => {
    if (difficulty >= 5) {
      const difficultyKey = difficulty as keyof typeof wordLists;
      const currentWordList = wordLists[difficultyKey];
      const randomWord = currentWordList[Math.floor(Math.random() * currentWordList.length)];
      setSpecialWord(randomWord);
    } else {
      setSpecialWord('');
    }
  }, [difficulty, gameStarted]);

  /** 사용자 프로필 정보 패칭 */
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLoggedIn) {
        const userProfile = await getCurrentUserProfile();
        setUser(userProfile);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn]);

  /** 게임 영역의 최대 너비를 1440px로 제한 */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 1440) {
        setGameAreaWidth(1440);
      } else {
        setGameAreaWidth(window.innerWidth);
      }
    }
  }, []);

  /** 단어 생성 타이머 */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted) {
      interval = setInterval(() => {
        const difficultyKey = difficulty as keyof typeof wordLists;
        const currentWordList = wordLists[difficultyKey];
        const newWord = {
          id: Date.now(),
          text: currentWordList[Math.floor(Math.random() * currentWordList.length)],
          top: 50,
          left: Math.random() * (gameAreaWidth - 200)
        };
        setWords((prevWords) => [...prevWords, newWord]);
      }, difficultySettings[difficulty].interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, difficulty]);

  /** 단어 속도, 생명 감소 타이머 */
  useEffect(() => {
    let interval = setInterval(() => {
      const speedAdjustment = slowMotion ? 4 : difficultySettings[difficulty].speed; // slowMotion 활성화 시 속도는 4, 아니면 난이도에 따른 속도
      const updatedWords = words.map((word) => ({
        ...word,
        top: word.top + speedAdjustment
      }));

      const outOfBoundWords = updatedWords.filter((word) => word.top >= gameAreaHeight - wordHeight);
      if (outOfBoundWords.length > 0) {
        setLives((prevLives) => Math.max(0, prevLives - outOfBoundWords.length));
        setWords(updatedWords.filter((word) => word.top < gameAreaHeight - wordHeight));
        if (lifeDrainingSound.current) {
          lifeDrainingSound.current.play();
        }
      } else {
        setWords(updatedWords);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [words, gameStarted, slowMotion, gameAreaHeight, difficulty]);

  /** 게임 오버 처리 */
  useEffect(() => {
    if (lives <= 0) {
      if (gameoverSound.current) {
        gameoverSound.current.play();
        toast.info(`${m('ALERT_MESSAGE1')} ${score} ${m('ALERT_MESSAGE2')}`);
        if (user) {
          addGameScore(score);
        }
        setGameStarted(false);
        setScore(0);
        setLives(maxLives);
        setWords([]);
        setCorrectWordsCount(0);
        if (backgroundMusic.current) {
          backgroundMusic.current.pause();
          backgroundMusic.current.currentTime = 0;
        }
      }
    }
  }, [lives, score, user]);

  /** 입력 처리 상태 업데이트 */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  /** 플레이 중 난이도 관리 */
  useEffect(() => {
    if (correctWordsCount >= 20 && difficulty < maxDifficulty && levelUp.current !== null) {
      if (levelUp.current) {
        levelUp.current.play();
      }
      setDifficulty(difficulty + 1);
      setCorrectWordsCount(0);
      setWords([]);
      setLives(5);
      toast.success(`${m('ALERT_MESSAGE3')} ${difficulty + 1}${m('ALERT_MESSAGE4')}`);
    }
  }, [correctWordsCount, difficulty]);

  /** 단어 입력 시 처리 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const wordIndex = words.findIndex((word) => word.text === input);
      if (wordIndex !== -1) {
        const newWordpopSound = new Audio('game/wordpopped.wav');
        newWordpopSound.volume = volume;
        newWordpopSound.play();

        setWords(words.filter((_, index) => index !== wordIndex));
        setScore(score + 10);
        setCorrectWordsCount(correctWordsCount + 1);
        /** 특수 단어 입력 처리 */
        if (input === specialWord) {
          if (specialWordSound.current) {
            specialWordSound.current.play();
            applyFrozenEffect();
            setSlowMotion(true);
            setTimeout(() => {
              setSlowMotion(false);
            }, slowMotionDuration);
          }
        }
      } else {
        const newWrongAnswerSound = new Audio('game/wrongAnswer.wav');
        newWrongAnswerSound.volume = volume;
        newWrongAnswerSound.play();
      }
    }
    setInput('');
  };

  /** 게임 시작 함수 */
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
      playBackgroundMusic();
    }
  };

  /** 로그인 없이 시작 함수 */
  const proceedWithoutLogin = () => {
    setShowLoginModal(false);
    setGameStarted(true);
    setWords([]);
    setInput('');
    setScore(0);
    setLives(maxLives);
    setCorrectWordsCount(0);
    playBackgroundMusic();
  };

  /** 로그인 페이지 리디렉션 */
  const goToLogin = () => {
    router.push('/login');
  };

  /** 난이도 변경 함수 */
  const handleDifficultyChange = (newDifficulty: number) => {
    playClickSound();
    if (newDifficulty >= 1 && newDifficulty <= maxDifficulty && newDifficulty !== difficulty) {
      setDifficulty(newDifficulty);
      if (gameStarted) {
        playBackgroundMusic(); // 난이도 변경 시 배경음악도 변경
      }
    }
  };

  /** 점수 저장 함수 */
  const addGameScore = async (finalScore: number) => {
    if (!user) {
      return;
    }

    try {
      const { data: existingScores, error: fetchError } = await supabase
        .from('game_tries')
        .select('score')
        .eq('user_id', user.id)
        .single();

      if (fetchError && !existingScores) {
        const { error: insertError } = await supabase
          .from('game_tries')
          .insert([{ user_id: user.id, score: finalScore, created_at: new Date().toISOString() }]);
        if (insertError) throw insertError;
      } else {
        const currentScore = existingScores?.score || 0;
        if (finalScore > currentScore) {
          const { error: updateError } = await supabase
            .from('game_tries')
            .update({ score: finalScore, created_at: new Date().toISOString() })
            .eq('user_id', user.id);
          if (updateError) throw updateError;
        } else {
        }
      }
    } catch (error) {}
  };

  /** 볼륨 슬라이더 입력 처리 */
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(e.target.valueAsNumber);
  };

  /** 각 난이도 관리 */
  const difficultySettings: { [key: number]: DifficultySetting } = {
    1: { label: m('DIFFICULTY1'), speed: 4, interval: 5000 },
    2: { label: m('DIFFICULTY2'), speed: 6, interval: 4000 },
    3: { label: m('DIFFICULTY3'), speed: 8, interval: 3000 },
    4: { label: m('DIFFICULTY4'), speed: 10, interval: 2000 },
    5: { label: m('DIFFICULTY5'), speed: 12, interval: 1000 }
  };

  const maxDifficulty = Object.keys(difficultySettings).length;

  const lifePercentage = (lives / maxLives) * 55;

  /** 게임 리셋 */
  const resetGame = () => {
    setGameStarted(false);
    setWords([]);
    setInput('');
    setScore(0);
    setLives(maxLives);
    setCorrectWordsCount(0);
    setShowLoginModal(false);
    if (backgroundMusic.current) {
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;
    }
  };

  const handleBackButtonClick = () => {
    setShowConfirmModal(true);
  };

  const confirmBack = () => {
    resetGame();
    setShowConfirmModal(false);
  };

  const cancelBack = () => {
    setShowConfirmModal(false);
  };

  /** 속도 느려지게 만드는 효과 */
  const applyFrozenEffect = () => {
    setFrozenEffect(true);
    setTimeout(() => {
      setFrozenEffect(false); // 일정 시간 후 배경색을 원래대로 돌립니다
    }, 5000);
  };

  const playClickSound = () => {
    if (clickSound.current) {
      clickSound.current.play();
    }
  };

  return (
    <div
      className={`relative flex flex-col bg-cover bg-no-repeat bg-center ${frozenEffect && 'frozenEffect'}`}
      style={{
        backgroundImage: "url('https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/assets/game_bg.png')"
      }}
    >
      {!gameStarted && (
        <div className="top-0 left-0 p-4 h-[4vh] bg-white bg-opacity-50 custom-volume-control">
          <div className="volume-control flex items-center">
            <label htmlFor="volume-slider" className="flex items-center mr-2 text-pointColor1">
              <BiSolidVolumeFull className="mr-1 text-xl text-pointColor1" />:
            </label>
            <input
              type="range"
              id="volume-slider"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      )}
      {gameStarted && (
        <header className="w-full h-[8vh] absolute z-30 flex leading-[7.5vh] font-bold text-xl border-solid border-b-2 border-pointColor1 bg-white">
          <h2 className="w-[9%] h-full text-center text-[16px] bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
            {m('DIFFICULTY')}
          </h2>
          <h3 className="w-[9%] h-full text-center text-[16px] text-pointColor2 border-solid border-r-2 border-pointColor1">
            {difficultySettings[difficulty].label}
          </h3>
          <h2 className="w-[9%] h-full text-center text-[16px] bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
            {m('SCORE')}
          </h2>
          <h3 className="w-[9%] h-full text-center text-[16px] text-pointColor2 border-solid border-r-2 border-pointColor1">
            {score}
          </h3>
          <h2 className="w-[9%] h-full text-center text-[16px] bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
            {m('LIFE')}
          </h2>
          <div className="h-[calc(8vh-2px)] bg-pointColor2" style={{ width: `${lifePercentage}%` }}></div>
        </header>
      )}
      <div className={`${gameStarted ? 'h-[84vh]' : 'h-[80vh]'} flex-grow relative`}>
        {gameStarted ? (
          <div>
            {words.map((word) => (
              <div
                key={word.id}
                className={`absolute bg-white font-bold p-2 rounded border border-solid border-pointColor1 ${
                  word.text === specialWord ? 'text-red-500 text-[18px]' : 'text-blackColor1'
                } transition-all duration-[500ms] ease-out`}
                style={{ top: `${word.top}px`, left: `${word.left}px` }}
              >
                {word.text}
              </div>
            ))}
            <form
              onSubmit={handleSubmit}
              className="h-[10vh] flex gap-3 justify-center absolute bottom-0 left-0 right-0 p-4 bg-pointColor3"
            >
              <ExitButton size="md" exitText={m('EXIT_BUTTON')} onClick={handleBackButtonClick} />
              <div className="volume-control flex items-center mr-2">
                <label htmlFor="volume-slider" className="flex items-center mr-2 text-pointColor1">
                  <BiSolidVolumeFull className="mr-1 text-xl text-pointColor1" />:
                </label>
                <input
                  type="range"
                  id="volume-slider"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
              <input
                type="text"
                value={input}
                placeholder={m('INPUT_FIELD')}
                onChange={handleInput}
                className="w-[60vw] pl-4 text-pointColor1 border border-pointColor1 rounded-md"
              />
              <button type="submit" className="w-[10vw] bg-pointColor1 text-white rounded-md">
                {m('INPUT_BUTTON')}
              </button>
            </form>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-white bg-opacity-50">
            <p className="mb-6 font-bold text-2xl text-pointColor1">{m('SELECT_DIFFICULTY')}</p>
            <div className="flex mb-4 items-center justify-center">
              {Array.from({ length: maxDifficulty }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handleDifficultyChange(index + 1)}
                  className={`text-pointColor1 mx-2 mb-6 px-3 ${
                    difficulty === index + 1
                      ? 'bg-pointColor1 text-white font-bold border border-solid border-pointColor1'
                      : 'bg-white font-bold border border-solid border-pointColor1'
                  } w-full p-2 text-lg rounded-md relative overflow-hidden`}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 animate-none hover:animate-wave-opacity"></div>
                  {difficultySettings[index + 1].label}
                </button>
              ))}
            </div>
            <button
              onClick={startGame}
              className="w-[25%] bg-pointColor1 text-white text-lg font-bold p-4 rounded animate-wave-opacity hover:animate-hover-opacity"
            >
              {m('START_BUTTON')}
            </button>
            <div className="mt-10 font-semibold text-pointColor1">
              <p className="leading-7 text-center">
                {m('GAME_GUIDE1')}
                <br />
                {m('GAME_GUIDE2')}
                <br />
                <span className="text-pointColor2">{m('GAME_GUIDE3')}</span>
              </p>
            </div>
          </div>
        )}
        <div className="sm:block hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl border-solid border-2 border-pointColor1">
              <h2 className="font-bold text-xl mb-4">{m('MOBILE_MODAL_MESSAGE1')}</h2>
              <p className="mb-4">{m('MOBILE_MODAL_MESSAGE2')}</p>
            </div>
          </div>
        </div>
      </div>
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl border-solid border-2 border-pointColor1">
            <h2 className="font-bold text-xl mb-4">{m('MODAL_TITLE')}</h2>
            <p className="mb-4">{m('MODAL_CONTENT')}</p>
            <div className="flex justify-around">
              <button onClick={proceedWithoutLogin} className="bg-gray-300 text-black font-bold py-2 px-4 rounded">
                {m('MODAL_BUTTON1')}
              </button>
              <button onClick={goToLogin} className="bg-pointColor1 text-white font-bold py-2 px-4 rounded">
                {m('MODAL_BUTTON2')}
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl border-solid border-2 border-pointColor1">
            <h2 className="font-bold text-xl mb-4">{m('MODAL_MESSAGE1')}</h2>
            <p className="mb-4">{m('MODAL_MESSAGE2')}</p>
            <div className="flex justify-around">
              <button onClick={cancelBack} className="bg-gray-300 text-black font-bold py-2 px-4 rounded">
                {m('MODAL_MESSAGE3')}
              </button>
              <button onClick={confirmBack} className="bg-pointColor1 text-white font-bold py-2 px-4 rounded">
                {m('MODAL_MESSAGE4')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingGamePage;
