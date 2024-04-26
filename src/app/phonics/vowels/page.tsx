'use client';

import { storageUrl } from '@/utils/supabase/storage';
import PhonicsLayout from '../PhonicsLayout';
import { useState } from 'react';
import Image from 'next/image';

const VowelPage = () => {
  const [activeTab, setActiveTab] = useState('basicVowels');
  const [letter, setLetter] = useState('');
  const [letterName, setLetterName] = useState('');

  const basicVowelLabels = [
    { letter: 'ㅏ', read: '[a]', name: '아', audio: '/audio/vowels/a.wav' },
    { letter: 'ㅓ', read: '[^]', name: '어', audio: '/audio/vowels/eo.wav' },
    { letter: 'ㅗ', read: '[o]', name: '오', audio: '/audio/vowels/o.wav' },
    { letter: 'ㅜ', read: '[u]', name: '우', audio: '/audio/vowels/u.wav' },
    { letter: 'ㅡ', read: '[w]', name: '으', audio: '/audio/vowels/eu.wav' },
    { letter: 'ㅣ', read: '[i]', name: '이', audio: '/audio/vowels/i.wav' },
    { letter: 'ㅑ', read: '[ja]', name: '야', audio: '/audio/vowels/ya.wav' },
    { letter: 'ㅕ', read: '[j^]', name: '여', audio: '/audio/vowels/yeo.wav' },
    { letter: 'ㅛ', read: '[jo]', name: '요', audio: '/audio/vowels/yo.wav' },
    { letter: 'ㅠ', read: '[ju]', name: '유', audio: '/audio/vowels/yu.wav' }
  ];

  const combinedVowelLabels = [
    { letter: 'ㅐ', read: '[E]', name: '애', audio: '/audio/vowels/ae.wav' },
    { letter: 'ㅔ', read: '[e]', name: '에', audio: '/audio/vowels/e.wav' },
    { letter: 'ㅘ', read: '[wa]', name: '와', audio: '/audio/vowels/wa.wav' },
    { letter: 'ㅝ', read: '[w^]', name: '워', audio: '/audio/vowels/weo.wav' },
    { letter: 'ㅢ', read: '[wi]', name: '의', audio: '/audio/vowels/ui.wav' },
    { letter: 'ㅒ', read: '[je]', name: '얘', audio: '/audio/vowels/yae.wav' },
    { letter: 'ㅖ', read: '[je]', name: '예', audio: '/audio/vowels/ye.wav' },
    { letter: 'ㅙ', read: '[we]', name: '왜', audio: '/audio/vowels/we.wav' },
    { letter: 'ㅞ', read: '[we]', name: '웨', audio: '/audio/vowels/uwe.wav' },
    { letter: 'ㅚ', read: '[we]', name: '외', audio: '/audio/vowels/oe.wav' },
    { letter: 'ㅟ', read: '[y/wi]', name: '위', audio: '/audio/vowels/wi.wav' }
  ];

  /** 오디오 재생 핸들러 */
  const handlePlaySound = (audio: string) => {
    if (audio) {
      const audioElement = new Audio(audio);
      audioElement.play();
    }
  };

  return (
    <div className="grid grid-cols-[16%_84%] bgColor1">
      <PhonicsLayout />
      <section className="flex flex-col justify-center items-center">
        <nav className="mt-14 sm:pb-0 w-[70%] pb-[4vh] flex justify-between text-pointColor1 font-medium  border-solid border-pointColor1 cursor-pointer">
          <ul className="sm:px-4 sm:text-sm flex justify-center text-xl w-full text-center border-b-1 border-solid">
            <li
              className={`w-[50%] pb-3 ${
                activeTab === 'basicVowels' && 'sm:border-b-[6px] font-bold border-solid border-b-3'
              }`}
              onClick={() => setActiveTab('basicVowels')}
            >
              기본모음
            </li>
            <li
              className={`w-[50%] pb-3 ${
                activeTab === 'combinedVowels' && 'sm:border-b-[6px] font-bold border-solid border-b-3'
              }`}
              onClick={() => setActiveTab('combinedVowels')}
            >
              합자
            </li>
          </ul>
        </nav>
        {activeTab === 'basicVowels' && (
          <>
            <p className="text-xl font-bold">한글의 모음 글자는 21자이다. 이 중에서 10자가 기본 모음 글자이다.</p>
            <p className="text-pointColor1 mt-2">*글자를 눌러 발음을 들어보세요.</p>
            <div className="mt-14 flex gap-10 items-start">
              <div className="grid grid-cols-5 gap-4 select-none">
                {basicVowelLabels.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col text-pointColor1 hover:text-white justify-center items-center w-20 h-20 border-solid border-pointColor1 rounded-full ${
                      item.letter ? 'cursor-pointer border hover:bg-pointColor1' : 'bg-bgColor2 hover:bg-bgColor2'
                    }`}
                    onClick={() => {
                      handlePlaySound(item.audio as string);
                      setLetter(item.letter as string);
                      setLetterName(item.name as string);
                    }}
                  >
                    <>
                      <p className="text-2xl font-bold">{item.letter}</p>
                      <p className="text-[#C1DDFF] font-bold">{item.read}</p>
                    </>
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
            <div className="py-14 text-center leading-9">
              <p>
                모음 글자를 처음 만들 때 ·, ㅡ, ㅣ의 형태를 기본으로 삼았다.
                <br />
                <span className="text-pointColor1 font-bold">ㆍ는 하늘의 둥근 모양</span>을,{' '}
                <span className="text-pointColor1 font-bold">ㅡ는 땅의 평평한 모양</span>을,{' '}
                <span className="text-pointColor1 font-bold">ㅣ는 꼿꼿이 서 있는 사람의 모양</span>을 본뜬 것이다.
                <br />
                이는 만물의 근본 요소를 하늘, 땅, 사람이라고 생각한 동양 철학을 적용한 것이다.
                <br />이 세 글자의 조합을 통해 기본 모음 글자 10자를 만들었다. ·는 현재 쓰지 않는 글자이다.
              </p>
            </div>
          </>
        )}
        {activeTab === 'combinedVowels' && (
          <>
            <p className="text-xl font-bold">기본 모음 글자의 조합으로 나머지 모음 글자를 만들었다.</p>
            <p className="text-pointColor1 mt-2">*글자를 눌러 발음을 들어보세요.</p>
            <div className="mt-14 flex gap-10 items-start">
              <div className="grid grid-cols-5 gap-4 select-none">
                {combinedVowelLabels.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col text-pointColor1 hover:text-white justify-center items-center w-20 h-20 border-solid border-pointColor1 rounded-full ${
                      item.letter ? 'cursor-pointer border hover:bg-pointColor1' : 'bg-bgColor2 hover:bg-bgColor2'
                    }`}
                    onClick={() => {
                      handlePlaySound(item.audio as string);
                      setLetter(item.letter as string);
                      setLetterName(item.name as string);
                    }}
                  >
                    <>
                      <p className="text-2xl font-bold">{item.letter}</p>
                      <p className="text-[#C1DDFF] font-bold">{item.read}</p>
                    </>
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
            <div className="py-14 text-center leading-9">
              <p>
                모음 글자를 처음 만들 때 ·, ㅡ, ㅣ의 형태를 기본으로 삼았다.
                <br />
                <span className="text-pointColor1 font-bold">ㆍ는 하늘의 둥근 모양</span>을,{' '}
                <span className="text-pointColor1 font-bold">ㅡ는 땅의 평평한 모양</span>을,{' '}
                <span className="text-pointColor1 font-bold">ㅣ는 꼿꼿이 서 있는 사람의 모양</span>을 본뜬 것이다.
                <br />
                이는 만물의 근본 요소를 하늘, 땅, 사람이라고 생각한 동양 철학을 적용한 것이다.
                <br />이 세 글자의 조합을 통해 기본 모음 글자 10자를 만들었다. ·는 현재 쓰지 않는 글자이다.
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default VowelPage;
