import COMMUNITY_DETAIL_STRINGS from '@/constant/locales/community/communityDetail';
import COMMUNITY_LIST_STRINGS from '@/constant/locales/community/communityList';
import COMMUNITY_POST_STRINGS from '@/constant/locales/community/communityPost';
import HEADER_STRINGS from '@/constant/locales/components/header';
import QUIZEDITOR_STRINGS from '@/constant/locales/quiz/quiz-editor';
import TYPING_GAME_STRINGS from '@/constant/locales/typing-game/typing-game';
import COMMUNITY_SECTION_STRINGS from '@/constant/locales/home/community-section';
import QUIZ_SECTION_STRINGS from '@/constant/locales/home/quiz-section';
import RANKING_SECTION_STRINGS from '@/constant/locales/home/ranking-section';
import MY_PROFILE_STRINGS from '@/constant/locales/my-page/my-profile';
import MY_ACTIVITY_STRINGS from '@/constant/locales/my-page/my-activity';
import QUIZLIST_STRINGS from '@/constant/locales/quiz/quiz-list';
import QUIZ_TRY_STRINGS from '@/constant/locales/quiz/quiz-try';
import NEWS_SECTION_STRINGS from '@/constant/locales/home/news-section';
import type { StringEssetType } from '@/types/langs';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';
import ABOUT_STRINGS from '@/constant/locales/about/about';

export default function useMultilingual(assets: string) {
  const [lang] = useAtom(langAtom);
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
  } else if (assets === 'my-activity') {
    assetsObject = MY_ACTIVITY_STRINGS;
  } else if (assets === 'quiz-list') {
    assetsObject = QUIZLIST_STRINGS;
  } else if (assets === 'quiz-try') {
    assetsObject = QUIZ_TRY_STRINGS;
  } else if (assets === 'about') {
    assetsObject = ABOUT_STRINGS;
  } else if (assets === 'news-section') {
    assetsObject = NEWS_SECTION_STRINGS;
  } else if (assets === 'communityList') {
    assetsObject = COMMUNITY_LIST_STRINGS;
  } else if (assets === 'communityDetail') {
    assetsObject = COMMUNITY_DETAIL_STRINGS;
  } else if (assets === 'communityPost') {
    assetsObject = COMMUNITY_POST_STRINGS;
  } else {
    assetsObject = QUIZLIST_STRINGS;
  }
  return (key: keyof typeof assetsObject) => {
    return assetsObject[key][lang];
  };
}
