'use client';

import Image from 'next/image';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';
import { useState } from 'react';
import PhonicsLayout from '../PhonicsLayout';
import useMultilingual from '@/utils/useMultilingual';
import { storageUrl } from '@/utils/supabase/storage';

const VowelPage = () => {
  const [activeTab, setActiveTab] = useState('basicVowels');
  const [letter, setLetter] = useState('');
  const [letterName, setLetterName] = useState('');

  const [lang] = useAtom(langAtom);
  const m = useMultilingual('hangul-vowels');

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
    <div className="sm:block sm:px-2 grid grid-cols-[16%_84%] bg-bgColor1 sm:bg-white">
      <PhonicsLayout />
      <section className="flex flex-col justify-center items-center bg-white border-solid sm:border-l-0 border-l-2 border-pointColor1">
        <nav className="sm:mt-8 sm:mb-6 mt-14 sm:pb-0 w-[70%] pb-[4vh] flex justify-between text-pointColor1 font-medium  border-solid border-pointColor1 cursor-pointer">
          <ul className="sm:gap-2 sm:border-0 sm:px-4 sm:text-sm flex justify-center text-xl w-full text-center border-b-1 border-solid">
            <li
              className={`sm:h-7 sm:flex sm:justify-center sm:items-center sm:pb-0 sm:w-28 sm:text-xs sm:border-pointColor1 sm:border-1 sm:border-solid sm:rounded-xl w-[50%] pb-3 ${
                activeTab === 'basicVowels' &&
                'sm:bg-pointColor1 sm:text-white sm:rounded-xl sm:border-1 font-bold border-solid border-b-3'
              }`}
              onClick={() => {
                setActiveTab('basicVowels');
                setLetterName('');
                setLetter('');
              }}
            >
              {m('VOWEL_MENU1')}
            </li>
            <li
              className={`sm:flex sm:justify-center sm:items-center sm:pb-0 sm:w-28 sm:text-xs sm:border-pointColor1 sm:border-1 sm:border-solid sm:rounded-xl w-[50%] pb-3 ${
                activeTab === 'combinedVowels' &&
                'sm:bg-pointColor1 sm:text-white sm:rounded-xl sm:border-1 font-bold border-solid border-b-3'
              }`}
              onClick={() => {
                setActiveTab('combinedVowels');
                setLetterName('');
                setLetter('');
              }}
            >
              {m('VOWEL_MENU2')}
            </li>
          </ul>
        </nav>
        {activeTab === 'basicVowels' && (
          <div>
            <div className="text-center">
              <p className="sm:text-base sm:hidden text-xl font-bold">{m('VOWEL_TITLE')}</p>
              <p className="sm:block sm:text-base text-xl font-bold hidden">{m('VOWEL_TITLE1')}</p>
              <p className="sm:block sm:text-base text-xl font-bold hidden">{m('VOWEL_TITLE2')}</p>
              <p className="sm:font-semibold sm:mt-10 sm:text-xs text-pointColor1 mt-2">* {m('GUIDE_TEXT')}</p>
            </div>
            <div className="sm:gap-10 sm:mt-4 sm:flex-col-reverse sm:items-center mt-14 flex gap-20 items-start">
              <div className="grid grid-cols-5 gap-4 select-none">
                {basicVowelLabels.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col text-pointColor1 hover:text-white justify-center items-center w-16 h-16 border-solid border-pointColor1 rounded-full ${
                      item.letter ? 'cursor-pointer border hover:bg-pointColor1' : 'bg-bgColor2 hover:bg-bgColor2'
                    }`}
                    onClick={() => {
                      handlePlaySound(item.audio as string);
                      setLetter(item.letter as string);
                      setLetterName(item.name as string);
                    }}
                  >
                    <>
                      <p className="text-xl font-bold">{item.letter}</p>
                      <p className="sm:text-xs text-[#C1DDFF] font-bold">{item.read}</p>
                    </>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative flex justify-center items-center w-60 h-60 bg-bgColor">
                  <Image
                    src={`${storageUrl}/assets/hangeul_background.png`}
                    alt=""
                    width={240}
                    height={240}
                    quality={100}
                    className="object-contain"
                  />
                  <p className="absolute text-9xl font-bold text-pointColor1">{letter}</p>
                </div>
                <p className="text-center items-center">
                  {m('LETTER_NAME')} <span className="text-pointColor1 font-bold text-lg">{letterName}</span>
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'combinedVowels' && (
          <>
            <p className="sm:text-base sm:text-center text-xl font-bold">{m('C_VOWEL_TITLE')}</p>
            <p className="sm:font-semibold sm:mt-10 sm:text-xs text-pointColor1 mt-2">* {m('GUIDE_TEXT')}</p>
            <div className="sm:gap-10 sm:mt-4 sm:flex-col-reverse sm:items-center mt-14 flex gap-20 items-start">
              <div className="grid grid-cols-5 gap-4 select-none">
                {combinedVowelLabels.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col text-pointColor1 hover:text-white justify-center items-center w-16 h-16 border-solid border-pointColor1 rounded-full ${
                      item.letter ? 'cursor-pointer border hover:bg-pointColor1' : 'bg-bgColor2 hover:bg-bgColor2'
                    }`}
                    onClick={() => {
                      handlePlaySound(item.audio as string);
                      setLetter(item.letter as string);
                      setLetterName(item.name as string);
                    }}
                  >
                    <>
                      <p className="text-xl font-bold">{item.letter}</p>
                      <p className="sm:text-xs text-[#C1DDFF] font-bold">{item.read}</p>
                    </>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative flex justify-center items-center w-60 h-60 bg-bgColor">
                  <Image
                    src={`${storageUrl}/assets/hangeul_background.png`}
                    alt=""
                    width={240}
                    height={240}
                    quality={100}
                    className="object-contain"
                  />
                  <p className="absolute text-9xl font-bold text-pointColor1">{letter}</p>
                </div>
                <p className="text-center items-center">
                  {m('LETTER_NAME')} <span className="text-pointColor1 font-bold text-lg">{letterName}</span>
                </p>
              </div>
            </div>
          </>
        )}
        <div className="sm:pb-28 sm:pt-10 sm:text-[13px] sm:leading-7 py-14 text-center leading-9">
          <p>
            {m('B_VOWEL_INFO1')}
            <br />
            {lang === 'ko' && (
              <>
                <span className="text-pointColor1 font-bold">ㆍ는 하늘의 둥근 모양</span>을,{' '}
                <span className="text-pointColor1 font-bold">ㅡ는 땅의 평평한 모양</span>을, <br />
                <span className="text-pointColor1 font-bold">ㅣ는 꼿꼿이 서 있는 사람의 모양</span>을 본뜬 것이다.
              </>
            )}
            {lang === 'en' && (
              <>
                <span className="text-pointColor1 font-bold">
                  {m('B_VOWEL_INFO2')}
                  <br />
                  {m('B_VOWEL_INFO3')}
                </span>
              </>
            )}
            <br />
            {m('B_VOWEL_INFO4')}
            <br />
            {m('B_VOWEL_INFO5')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default VowelPage;
