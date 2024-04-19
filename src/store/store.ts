import { LanguageType } from '@/types/langs';
import { atom } from 'jotai';

export const isMenuOpenAtom = atom(false);
export const isLoggedInAtom = atom(false);
export const lang = atom<LanguageType>('en');
