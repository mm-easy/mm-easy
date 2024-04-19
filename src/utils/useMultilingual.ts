import STRING_ESSETS from '@/constant/lang';

export type LanguageType = 'ko' | 'en';

export type StringEssetType = Record<string, Record<LanguageType, string>>;

export default function useMultilingual(lang: LanguageType) {
  return (key: keyof typeof STRING_ESSETS) => {
    return STRING_ESSETS[key][lang];
  };
}
