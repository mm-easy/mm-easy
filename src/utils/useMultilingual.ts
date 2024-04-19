import HEADER_STRINGS from '@/constant/locales/components/header';

export type LanguageType = 'ko' | 'en';

export type StringEssetType = Record<string, Record<LanguageType, string>>;

export default function useMultilingual(lang: LanguageType, assets: string) {
  let assetsObject: StringEssetType;

  if (assets === 'header') {
    assetsObject = HEADER_STRINGS;
  } else {
    assetsObject = HEADER_STRINGS; //여긴 임시로 넣어놓은건데 추가하실 때 else if 로 위에 header 경우랑 똑같이 넣어주시면돼요
  }
  return (key: keyof typeof assetsObject) => {
    return assetsObject[key][lang];
  };
}
