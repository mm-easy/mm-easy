import COMMUNITY_DETAIL_STRINGS from '@/constant/locales/community/communityDetail';
import COMMUNITY_LIST_STRINGS from '@/constant/locales/community/communityList';
import COMMUNITY_POST_STRINGS from '@/constant/locales/community/communityPost';
import HEADER_STRINGS from '@/constant/locales/components/header';
import QUIZEDITOR_STRINGS from '@/constant/locales/quiz/quiz-editor';
import TYPING_GAME_STRINGS from '@/constant/locales/typing-game/typing-game';
import COMMUNITY_SECTION_STRINGS from '@/constant/locales/home/community-section';
import QUIZ_SECTION_STRINGS from '@/constant/locales/home/quiz-section';
import RANKING_SECTION_STRINGS from '@/constant/locales/home/ranking-section';
import LOG_IN_STRINGS from '@/constant/locales/login/login';
import SIGN_UP_STRINGS from '@/constant/locales/login/signup';
import PRIVACY_POLICY_STRINGS from '@/constant/locales/login/privacypolicy';
import TERMS_STRINGS from '@/constant/locales/login/terms';
import MY_PROFILE_STRINGS from '@/constant/locales/my-page/my-profile';
import MY_ACTIVITY_STRINGS from '@/constant/locales/my-page/my-activity';
import QUIZLIST_STRINGS from '@/constant/locales/quiz/quiz-list';
import QUIZ_TRY_STRINGS from '@/constant/locales/quiz/quiz-try';
import NEWS_SECTION_STRINGS from '@/constant/locales/home/news-section';
import MAIN_FOOTER_STRINGS from '@/constant/locales/home/footer';
import ABOUT_STRINGS from '@/constant/locales/about/about';
import REPORT_STRINGS from '@/constant/locales/admin/reports';
import ADMIN_STRINGS from '@/constant/locales/admin/admin';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';

import type { StringEssetType } from '@/types/langs';
import MOBILE_MENU_STRINGS from '@/constant/locales/components/mobileMenu';
import CONSONANTS_STRINGS from '@/constant/locales/hangul/consonants';
import VOWELS_STRINGS from '@/constant/locales/hangul/vowels';
import LOADING_STRINGS from '@/constant/locales/components/loading';
import PHONICS_STRINGS from '@/constant/locales/hangul/phonics';

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
  } else if (assets === 'login') {
    assetsObject = LOG_IN_STRINGS;
  } else if (assets === 'signup') {
    assetsObject = SIGN_UP_STRINGS;
  } else if (assets === 'privacypolicy') {
    assetsObject = PRIVACY_POLICY_STRINGS;
  } else if (assets === 'terms') {
    assetsObject = TERMS_STRINGS;
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
  } else if (assets === 'main-footer') {
    assetsObject = MAIN_FOOTER_STRINGS;
  } else if (assets === 'report') {
    assetsObject = REPORT_STRINGS;
  } else if (assets === 'admin') {
    assetsObject = ADMIN_STRINGS;
  } else if (assets === 'mobile-menu') {
    assetsObject = MOBILE_MENU_STRINGS;
  } else if (assets === 'hangul-consonants') {
    assetsObject = CONSONANTS_STRINGS;
  } else if (assets === 'hangul-vowels') {
    assetsObject = VOWELS_STRINGS;
  } else if (assets === 'phonics') {
    assetsObject = PHONICS_STRINGS;
  } else if (assets === 'loading') {
    assetsObject = LOADING_STRINGS;
  } else {
    assetsObject = QUIZLIST_STRINGS;
  }

  return (key: keyof typeof assetsObject) => {
    return assetsObject[key][lang];
  };
}
