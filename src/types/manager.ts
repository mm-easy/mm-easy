import { StringEssetType } from '@/utils/useMultilingual';

export type MultilingualFunction = (key: keyof StringEssetType) => string;
