import localFont from 'next/font/local';

export const myFont = localFont({
  src: [
    { path: './GothicA1-Black.woff2', weight: '900', style: 'normal' },
    { path: './GothicA1-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: './GothicA1-Bold.woff2', weight: 'bold', style: 'normal' },
    { path: './GothicA1-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './GothicA1-Medium.woff2', weight: '800', style: 'normal' },
    { path: './GothicA1-Regular.woff2', weight: 'normal', style: 'normal' },
    { path: './GothicA1-Light.woff2', weight: '300', style: 'normal' },
    { path: './GothicA1-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: './GothicA1-Thin.woff2', weight: '100', style: 'normal' }
  ]
});
