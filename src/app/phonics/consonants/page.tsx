'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';
import PhonicsLayout from '../PhonicsLayout';
import useMultilingual from '@/utils/useMultilingual';
import { storageUrl } from '@/utils/supabase/storage';

const ConsonantsPage = () => {
  const [letter, setLetter] = useState('');
  const [letterName, setLetterName] = useState('');
  const [lang] = useAtom(langAtom);

  const m = useMultilingual('hangul-consonants');

  const consonantLabels = [
    { letter: 'ㄱ', read: '[g/k]', name: '기역', audio: '/audio/consonants/giyeok.wav' },
    { letter: 'ㄴ', read: '[n]', name: '니은', audio: '/audio/consonants/nieun.wav' },
    { letter: 'ㅁ', read: '[m]', name: '미음', audio: '/audio/consonants/mieum.wav' },
    { letter: 'ㅅ', read: '[s]', name: '시옷', audio: '/audio/consonants/shiot.wav' },
    { letter: 'ㅇ', read: '[ŋ]', name: '이응', audio: '/audio/consonants/ieung.wav' },
    { letter: null, read: null, name: null }, //5
    { letter: 'ㄷ', read: '[d/t]', name: '디귿', audio: '/audio/consonants/digeut.wav' },
    { letter: 'ㅂ', read: '[b/p]', name: '비읍', audio: '/audio/consonants/bieup.wav' },
    { letter: 'ㅈ', read: '[d/z]', name: '지읒', audio: '/audio/consonants/jieut.wav' },
    { letter: null, read: null, name: null }, //9
    { letter: 'ㅋ', read: '[k]', name: '키읔', audio: '/audio/consonants/kieuk.wav' },
    { letter: 'ㅌ', read: '[t]', name: '티읕', audio: '/audio/consonants/tieut.wav' },
    { letter: 'ㅍ', read: '[ph]', name: '피읖', audio: '/audio/consonants/pieup.wav' },
    { letter: 'ㅊ', read: '[tch]', name: '치읓', audio: '/audio/consonants/chieut.wav' },
    { letter: 'ㅎ', read: '[h]', name: '히읗', audio: '/audio/consonants/hieut.wav' },
    { letter: 'ㄲ', read: '[k]', name: '쌍기역', audio: '/audio/consonants/ssangGiyeok.wav' },
    { letter: 'ㄸ', read: '[t]', name: '쌍디귿', audio: '/audio/consonants/ssangDigeut.wav' },
    { letter: 'ㅃ', read: '[p]', name: '쌍비읍', audio: '/audio/consonants/ssangBieup.wav' },
    { letter: 'ㅆ', read: '[s]', name: '쌍시옷', audio: '/audio/consonants/ssangShiot.wav' },
    { letter: null, read: null, name: null },
    { letter: null, read: null, name: null },
    { letter: 'ㄹ', read: '[r/l]', name: '리을', audio: '/audio/consonants/Rieul.wav' },
    { letter: null, read: null, name: null },
    { letter: null, read: null, name: null },
    { letter: 'ㅉ', read: '[t]', name: '쌍지읒', audio: '/audio/consonants/ssangJieut.wav' }
  ];
  /** 오디오 재생 핸들러 */
  const handlePlaySound = (audio: string) => {
    if (audio) {
      const audioElement = new Audio(audio);
      audioElement.play();
    }
  };

  return (
    <div className="sm:block sm:px-0 grid grid-cols-[16%_84%] bg-bgColor1 sm:bg-white">
      <PhonicsLayout />
      <section className="flex flex-col items-center bg-white border-solid sm:border-l-0 border-l-2 border-pointColor1">
        <p className="sm:text-lg sm:mt-8 text-xl font-bold mt-14 text-center">{m('CONSONANT_TITLE')}</p>
        <p className="sm:font-semibold sm:mt-10 sm:text-xs text-pointColor1 mt-2">* {m('GUIDE_TEXT')}</p>
        <div className="sm:gap-10 sm:flex-col-reverse sm:mt-4 mt-14 flex gap-20">
          <div className="grid grid-cols-5 gap-4 select-none">
            {consonantLabels.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col text-pointColor1 hover:text-white justify-center items-center w-16 h-16 border-solid border-pointColor1 rounded-full ${
                  item.letter && index !== 24
                    ? 'cursor-pointer border hover:bg-pointColor1'
                    : 'bg-bgColor2 hover:bg-bgColor2'
                }`}
                onClick={(e) => {
                  const parentElement = (e.target as HTMLElement).parentNode as HTMLElement;
                  if (index === 18) {
                    if (parentElement.id === '18') {
                      handlePlaySound(item.audio as string);
                      setLetter(item.letter as string);
                      setLetterName(item.name as string);
                    }
                    if (parentElement.id === '24') {
                      handlePlaySound(consonantLabels[24].audio as string);
                      setLetter(consonantLabels[24].letter as string);
                      setLetterName(consonantLabels[24].name as string);
                    }
                  } else if (index === 24) {
                    return;
                  } else {
                    handlePlaySound(item.audio as string);
                    setLetter(item.letter as string);
                    setLetterName(item.name as string);
                  }
                }}
              >
                {index === 18 ? (
                  <div className="flex justify-center w-full h-full rounded-full hover:bg-white hover:text-pointColor1 overflow-hidden">
                    <div
                      id="18"
                      className="z-10 w-1/2 h-full flex flex-col justify-center items-center hover:bg-pointColor1 hover:text-white"
                    >
                      <p className="text-xl font-bold">{item.letter}</p>
                      <p className="sm:text-xs text-[#C1DDFF] font-bold">{item.read}</p>
                    </div>
                    <div
                      id="24"
                      className="z-10 w-1/2 h-full flex flex-col justify-center items-center border-solid border-l-1 border-pointColor1 hover:text-white hover:bg-pointColor1"
                    >
                      <p className="text-xl font-bold">{`${consonantLabels[index + 6]?.letter}`}</p>
                      <p className="sm:text-xs text-[#C1DDFF] font-bold">{`${consonantLabels[index + 6]?.read}`}</p>
                    </div>
                  </div>
                ) : index === 24 ? null : (
                  <>
                    <p className="text-xl font-bold">{item.letter}</p>
                    <p className="sm:text-xs text-[#C1DDFF] font-bold">{item.read}</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="sm:items-center flex flex-col gap-4">
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
        <div className="sm:pb-28 sm:pt-10 sm:text-[13px] sm:leading-7 py-14 text-center leading-9">
          <p>
            <span className="text-pointColor1 font-bold">{lang === 'en' && m('CONSONANTS')}</span>{' '}
            {m('CONSONANT_INFO1')}
            <br />
            <span className="text-pointColor1 font-bold">{lang === 'ko' && m('CONSONANTS')}</span>{' '}
            {m('CONSONANT_INFO2')}
            <br />
            {m('CONSONANT_INFO3')}
            <br />
            <span className="text-pointColor1 font-bold">{m('SSANG_CONSONANTS')}</span>
            {m('CONSONANT_INFO4')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ConsonantsPage;
