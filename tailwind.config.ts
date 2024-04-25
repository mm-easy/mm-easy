import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import { redirect } from 'next/dist/server/api-utils';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bgColor1: '#FDF8F1',
        bgColor2: '#F0F7FF',
        bgColor3: '#FFF0EF',
        bgColor4: '##C1DDFF',
        pointColor1: '#2B84ED',
        pointColor2: '#FF8878',
        pointColor3: '#8dbdf6',
        blackColor: '#2E2E2E',
        grayColor1: '#E5E7EB',
        grayColor2: '#D9D9D9'
      },
      keyframes: {
        'wave-opacity': {
          '0%, 100%': { opacity: 1 as any },
          '50%': { opacity: 0.4 as any }
        },
        'hover-opacity': {
          'from, to': { opacity: 1 as any }
        },
        slash: {
          '0%': {
            transform: 'scaleX(0) rotate(-45deg)',
            opacity: 0.5 as any,
            filter: 'brightness(1)' 
          },
          '50%': {
            transform: 'scaleX(1) rotate(-45deg)',
            opacity: 1 as any,
            filter: 'brightness(2.5)'
          },
          '100%': {
            transform: 'scaleX(0) rotate(-45deg)',
            opacity: 0.5 as any,
            filter: 'brightness(1)'
          }
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        dropIn: {
          '0%': {
            opacity: 0 as any,
            transform: 'translateY(-50px)'
          },
          '50%': {
            opacity: 0.5 as any,
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: 1 as any,
            transform: 'translateY(0)'
          }
        },
        fadein: {
          '0%': { opacity: 0 as any },
          '100%': { opacity: 1 as any }
        },
        twinkling: {
          '0%, 100%': { filter: 'brightness(90%)' },
          '50%': { filter: 'brightness(120%)' }
        }
      }
    },
    backgroundSize: { md: '80%', cover: 'cover' },
    screens: {
      md: { max: '1440px' },
      sm: { max: '480px' }
    },
    animation: {
      'wave-opacity': 'wave-opacity 0.75s ease-in-out',
      'twinkling': 'twinkling 2s ease-in-out infinite',
      'hover-opacity': 'hover-opacity 0.3s ease-out',
      slash: 'slash 1s ease-in-out forwards',
      'drop-in': 'dropIn 0.8s ease-out forwards',
      'spin-slow': 'spin 2s linear infinite',
      fadein: 'fadein 0.5s ease-out'
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
};
export default config;
