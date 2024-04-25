'use client';

import Image from 'next/image';
import PhonicsLayout from '../PhonicsLayout';
import { storageUrl } from '@/utils/supabase/storage';
import { RefObject, useRef, useState } from 'react';

const ConsonantsPage = () => {
  const [letter, setLetter] = useState('');
  const [letterName, setLetterName] = useState('');
  const audioRefs: RefObject<HTMLAudioElement>[] = Array.from({ length: 25 }, () => useRef<HTMLAudioElement>(null));
  const firstHalfRef = useRef<HTMLDivElement>(null);
  const secondHalfRef = useRef<HTMLDivElement>(null);

  const consonantLabels = [
    { letter: 'ㄱ', read: '[g/k]', name: '기역' },
    { letter: 'ㄴ', read: '[n]', name: '니은' },
    { letter: 'ㅁ', read: '[m]', name: '디귿' },
    { letter: 'ㅅ', read: '[s]', name: '시옷' },
    { letter: 'ㅇ', read: '[ŋ]', name: '이응' },
    { letter: null, read: null, name: null }, //5
    { letter: 'ㄷ', read: '[d/t]', name: '디귿' },
    { letter: 'ㅂ', read: '[b/p]', name: '비읍' },
    { letter: 'ㅈ', read: '[d/z]', name: '지읒' },
    { letter: null, read: null, name: null }, //9
    { letter: 'ㅋ', read: '[k]', name: '키읔' },
    { letter: 'ㅌ', read: '[t]', name: '티읕' },
    { letter: 'ㅍ', read: '[ph]', name: '피읖' },
    { letter: 'ㅊ', read: '[tch]', name: '치읓' },
    { letter: 'ㅎ', read: '[h]', name: '히읗' },
    { letter: 'ㄲ', read: '[k]', name: '쌍기역' },
    { letter: 'ㄸ', read: '[t]', name: '쌍디귿' },
    { letter: 'ㅃ', read: '[p]', name: '쌍비읍' },
    { letter: 'ㅆ', read: '[s]', name: '쌍시옷' }, //18 -> 실제 19.wav
    { letter: null, read: null, name: null }, //19
    { letter: null, read: null, name: null }, //20
    { letter: 'ㄹ', read: '[r/l]', name: '리을' },
    { letter: null, read: null, name: null }, //22
    { letter: null, read: null, name: null }, //23
    { letter: 'ㅉ', read: '[t]', name: '쌍지읒' } //24 -> 실제론 25.wav
  ];

  const nullList = [5, 9, 19, 20, 22, 23];

  /** 글자에 맞는 오디오 파일 연결 */
  const consonantAudios = Array.from({ length: 25 }, (_, index) => `/audio/consonants/${index + 1}.wav`);

  /** 오디오 재생 핸들러 */
  const handlePlaySound = (index: number) => {
    console.log('soundIndex', audioRefs);
    const audioRef = audioRefs[index].current;
    console.log('audioRefs', audioRef);
    if (audioRef) {
      audioRef.currentTime = 0;
      audioRef.play();
    }
  };

  return (
    <div className="grid grid-cols-[16%_84%] bgColor1">
      <PhonicsLayout />
      <section className="flex flex-col items-center">
        <p className="text-xl font-bold mt-8">한글의 자음 글자는 모두 19자이다.</p>
        <p className="text-pointColor1 mt-2">*글자를 눌러 발음을 들어보세요.</p>
        <div className="mt-14 flex gap-10">
          <div className="grid grid-cols-5 gap-4">
            {consonantLabels.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col cursor-pointer text-pointColor1 hover:text-white justify-center items-center w-24 h-24 border-solid border-pointColor1 rounded-full ${
                  item.letter ? 'border hover:bg-pointColor1' : 'bg-bgColor2 hover:bg-bgColor2'
                }`}
                onClick={(e) => {
                  const parentElement = (e.target as HTMLElement).parentNode as HTMLElement;
                  if (index === 18) {
                    if (parentElement.id === '18') {
                      handlePlaySound(18);
                      setLetter(item.letter as string);
                      setLetterName(item.name as string);
                    }
                    if (parentElement.id === '24') {
                      handlePlaySound(24);
                      setLetter(consonantLabels[index + 6].letter as string);
                      setLetterName(consonantLabels[index + 6].name as string);
                    }
                  } else if (index in nullList) {
                    return;
                  } else {
                    handlePlaySound(index);
                    setLetter(item.letter as string);
                    setLetterName(item.name as string);
                  }
                }}
              >
                {index === 18 ? (
                  <div className="flex justify-center w-full h-full rounded-full hover:bg-white hover:text-pointColor1 overflow-hidden">
                    <div
                      ref={firstHalfRef}
                      id="18"
                      className="z-10 w-1/2 h-full flex flex-col justify-center items-center hover:bg-pointColor1 hover:text-white"
                    >
                      <p className="text-2xl font-bold">{item.letter}</p>
                      <p className="text-[#C1DDFF] font-bold">{item.read}</p>
                      <audio ref={audioRefs[index]} src={consonantAudios[index]} preload="auto"></audio>
                    </div>
                    <div
                      ref={secondHalfRef}
                      id="24"
                      className="z-10 w-1/2 h-full flex flex-col justify-center items-center border-solid border-l-1 border-pointColor1 hover:text-white hover:bg-pointColor1"
                    >
                      <p className="text-2xl font-bold">{`${consonantLabels[index + 6]?.letter}`}</p>
                      <p className="text-[#C1DDFF] font-bold">{`${consonantLabels[index + 6]?.read}`}</p>
                      <audio ref={audioRefs[index + 6]} src={consonantAudios[index + 6]} preload="auto"></audio>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-2xl font-bold">{item.letter}</p>
                    <p className="text-[#C1DDFF] font-bold">{item.read}</p>
                    <audio ref={audioRefs[index]} src={consonantAudios[index]} preload="auto"></audio>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative flex justify-center items-center w-64 h-64 bg-bgColor">
              <Image
                src={`${storageUrl}/assets/hangeul_background.png`}
                alt=""
                width={256}
                height={256}
                quality={100}
                className="object-contain"
              />
              <p className="absolute text-9xl font-bold text-pointColor1">{letter}</p>
            </div>
            <p className="text-center items-center">
              글자이름 <span className="text-pointColor1 font-bold text-lg">{letterName}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsonantsPage;
