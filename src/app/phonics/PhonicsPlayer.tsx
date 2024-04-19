"use client"

import { useRef } from 'react'

interface PhonicsPlayerProps {
  source: string; 
}

const PhonicsPlayer: React.FC<PhonicsPlayerProps> = ( { source }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={source} preload="auto"></audio>
      <button onClick={playSound}>Play Sound</button>
    </div>
  );
}

export default PhonicsPlayer