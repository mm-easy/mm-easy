import HEADER_STRINGS from '@/constant/locales/components/header';
import QUIZEDITOR_STRINGS from '@/constant/locales/quiz/quiz-editor';
import TYPING_GAME_STRINGS from '@/constant/locales/typing-game/typing-game';
import COMMUNITY_SECTION_STRINGS from '@/constant/locales/home/community-section';
import QUIZ_SECTION_STRINGS from '@/constant/locales/home/quiz-section';
import RANKING_SECTION_STRINGS from '@/constant/locales/home/ranking-section';
import MY_PROFILE_STRINGS from '@/constant/locales/my-page/my-profile';

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
  } else if (assets === 'community-section') {
    assetsObject = COMMUNITY_SECTION_STRINGS;
  } else if (assets === 'quiz-section') {
    assetsObject = QUIZ_SECTION_STRINGS;
  } else if (assets === 'ranking-section') {
    assetsObject = RANKING_SECTION_STRINGS;
  } else if (assets === 'my-profile') {
    assetsObject = MY_PROFILE_STRINGS;
  }
  return (key: keyof typeof assetsObject) => {
    return assetsObject[key][lang];
  };
}
