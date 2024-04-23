import PhonicsPlayer from './PhonicsPlayer';

const PhonicsExamplePage = () => {
  const consonants = Array.from({ length: 19 }, (_, i) => `/audio/consonants/${i + 1}.wav`);
  const vowels = Array.from({ length: 10 }, (_, i) => `/audio/vowels/${i + 1}.wav`);
  const combiningLetter = Array.from({ length: 11 }, (_, i) => `/audio/vowels/combiningLetter/${i + 1}.wav`);
  const consonantLabels = [
    'ㄱ',
    'ㄴ',
    'ㅁ',
    'ㅅ',
    'ㅇ',
    'ㄷ',
    'ㅂ',
    'ㅈ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅊ',
    'ㅎ',
    'ㄲ',
    'ㄸ',
    'ㅃ',
    'ㅆ',
    'ㅉ',
    'ㄹ'
  ]; // 자음
  const vovwelLabels = ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㅑ', 'ㅕ', 'ㅛ', 'ㅠ']; // 모음
  const combiningLetterLabels = ['ㅐ', 'ㅔ', 'ㅘ', 'ㅝ', 'ㅢ', 'ㅒ', 'ㅖ', 'ㅙ', 'ㅞ', 'ㅚ', 'ㅟ']; // 모음 합자

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        {consonants.map((sound, index) => (
          <div key={index} className="">
            <PhonicsPlayer source={sound} buttonLabel={consonantLabels[index]} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-4">
        {vowels.map((sounds, index) => (
          <div key={index}>
            <PhonicsPlayer source={sounds} buttonLabel={vovwelLabels[index]} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-4">
        {combiningLetter.map((sounds, index) => (
          <div key={index}>
            <PhonicsPlayer source={sounds} buttonLabel={combiningLetterLabels[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhonicsExamplePage;
