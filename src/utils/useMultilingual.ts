import COMMUNITY_DETAIL_STRINGS from '@/constant/locales/community/communityDetail';
import COMMUNITY_LIST_STRINGS from '@/constant/locales/community/communityList';
import COMMUNITY_POST_STRINGS from '@/constant/locales/community/communityPost';
import HEADER_STRINGS from '@/constant/locales/components/header';

export type LanguageType = 'ko' | 'en';

export type StringEssetType = Record<string, Record<LanguageType, string>>;

export default function useMultilingual(lang: LanguageType, assets: string) {
  let assetsObject: StringEssetType;

  if (assets === 'header') {
    assetsObject = HEADER_STRINGS;
  } else if (assets === 'communityList') {
    assetsObject = COMMUNITY_LIST_STRINGS;
  } else if (assets === 'communityDetail') {
    assetsObject = COMMUNITY_DETAIL_STRINGS;
  } else if (assets === 'communityPost') {
    assetsObject = COMMUNITY_POST_STRINGS;
  } else {
    assetsObject = HEADER_STRINGS;
  }
  return (key: keyof typeof assetsObject) => {
    return assetsObject[key][lang];
  };
}
