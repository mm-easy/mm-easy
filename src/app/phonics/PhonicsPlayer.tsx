"use client"

import { useRef } from 'react'

interface PhonicsPlayerProps {
  source: string; 
  buttonLabel: string;
}

const PhonicsPlayer: React.FC<PhonicsPlayerProps> = ( { source, buttonLabel }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className=''>
      <audio ref={audioRef} src={source} preload="auto"></audio>
      <button className='border border-solid border-black rounded-full w-20 h-20' onClick={playSound}>{buttonLabel}</button>
    </div>
  );
}

export default PhonicsPlayer