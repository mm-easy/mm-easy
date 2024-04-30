import { LanguageType } from '@/types/langs';
import { atom } from 'jotai';

export const isLoggedInAtom = atom(false);
export const langAtom = atom<LanguageType>('en');
