import { CustomThemeConfig } from 'tailwindcss/types/config';

export type TailwindColors = Partial<CustomThemeConfig['theme']['extend']['colors']> | undefined;
