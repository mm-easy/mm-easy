import HEADER_STRINGS from '@/constant/locales/components/header';
import QUIZEDITOR_STRINGS from '@/constant/locales/quiz/quiz-editor';
import TYPING_GAME_STRINGS from '@/constant/locales/typing-game/typing-game';

export type LanguageType = 'ko' | 'en';

export type StringEssetType = Record<string, Record<LanguageType, string>>;

export default function useMultilingual(lang: LanguageType, assets: string) {
  let assetsObject: StringEssetType;

  if (assets === 'header') {
    assetsObject = HEADER_STRINGS;
  } else if (assets === 'quizEditor') {
    assetsObject = QUIZEDITOR_STRINGS;
  } else if (assets === 'typing-game') {
    assetsObject = TYPING_GAME_STRINGS;
  }  
  return (key: keyof typeof assetsObject) => {
    return assetsObject[key][lang];
  };
}
