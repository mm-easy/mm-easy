'use client';

import Image from 'next/image';
import PhonicsLayout from '../PhonicsLayout';
import PhonicsPlayer from '../PhonicsPlayer';
import { storageUrl } from '@/utils/supabase/storage';
import { useRef } from 'react';
import { RiNumbersFill } from 'react-icons/ri';

const ConsonantsPage = () => {
  // const audioRefs = useRef<Array<HTMLAudioElement | null>>(Array.from({ length: 19 }, () => null));
  const consonantLabels = [
    { letter: 'ㄱ', read: '[g/k]' },
    { letter: 'ㄴ', read: '[n]' },
    { letter: 'ㅁ', read: '[m]' },
    { letter: 'ㅅ', read: '[s]' },
    { letter: 'ㅇ', read: '[ŋ]' },
    { letter: null, read: null },
    { letter: 'ㄷ', read: '[d/t]' },
    { letter: 'ㅂ', read: '[b/p]' },
    { letter: 'ㅈ', read: '[d/z]' },
    { letter: null, read: null },
    { letter: 'ㅋ', read: '[k]' },
    { letter: 'ㅌ', read: '[t]' },
    { letter: 'ㅍ', read: '[ph]' },
    { letter: 'ㅊ', read: '[tch]' },
    { letter: 'ㅎ', read: '[h]' },
    { letter: 'ㄲ', read: '[k]' },
    { letter: 'ㄸ', read: '[t]' },
    { letter: 'ㅃ', read: '[p]' },
    { letter: 'ㅆ/ㅉ', read: '[s/t]' },
    { letter: null, read: null },
    { letter: 'ㄹ', read: '[r/l]' },
    { letter: null, read: null },
    { letter: null, read: null },
    { letter: null, read: null },
    { letter: null, read: null }
  ];

  const consonants = consonantLabels.map((item, index) => {
    if (item.letter !== null) {
      return `/audio/consonants/${index + 1}.wav`; // 자음이 있는 경우에만 오디오 파일 경로 생성
    } else {
      // 이전 자음의 오디오를 참조하여 반환
      for (let i = index - 1; i >= 0; i--) {
        if (consonantLabels[i].letter !== null) {
          return `/audio/consonants/${i + 1}.wav`; // 이전 자음의 오디오 파일 경로 반환
        }
      }
      return null; // 이전 자음이 없는 경우에는 null 반환
    }
  });

  // const handlePlaySound = (index: number) => {
  //   const audioRef = audioRefs.current[index];
  //   if (audioRef) {
  //     audioRef.currentTime = 0;
  //     audioRef.play();
  //   }
  // };

  return (
    <div className="grid grid-cols-[16%_84%] bgColor1">
      <PhonicsLayout />
      <section className="flex flex-col items-center">
        <p className="text-xl font-bold mt-8">한글의 자음 글자는 모두 19자이다.</p>
        <p className="text-pointColor1 mt-2">*글자를 눌러 발음을 들어보세요.</p>
        <div className="mt-14 flex gap-10">
          <div className="grid grid-cols-5 gap-4">
            {/* {consonantLabels.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col justify-center items-center p-1 w-24 h-24 border-solid border-pointColor1 rounded-full ${
                  item.letter ? 'border' : 'bg-bgColor2'
                }`}
                onClick={() => handlePlaySound(index)}
              >
                <p className="text-pointColor1 text-2xl font-bold">{item.letter}</p>
                <p className="">{item.read}</p>
                <audio ref={(ref) => (audioRefs.current[index] = ref)} src={consonants[index]} preload="auto"></audio>
              </div>
            ))} */}
          </div>
          <div className="w-64 h-64 bg-bgColor">
            <Image
              src={`${storageUrl}/assets/hangeul_background.png`}
              alt=""
              width={256}
              height={256}
              quality={100}
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsonantsPage;
