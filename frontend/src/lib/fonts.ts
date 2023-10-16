import { JetBrains_Mono as FontMono, Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans'
});

export const fontMono = FontMono({
    subsets: ['latin'],
    variable: '--font-mono'
});

export const fontSFPro = localFont({
    src: [
        { path: '../fonts/SFProDisplay-Medium.ttf', weight: '500', style: 'normal' },
        { path: '../fonts/SFProDisplay-Heavy.ttf', weight: '900', style: 'normal' },
        { path: '../fonts/SFProDisplay-UltralightItalic.ttf', weight: '200', style: 'italic' },
        { path: '../fonts/SFProDisplay-RegularItalic.ttf', weight: 'normal', style: 'italic' },
        { path: '../fonts/SFProDisplay-Thin.ttf', weight: '100', style: 'normal' },
        { path: '../fonts/SFProDisplay-Light.ttf', weight: '200', style: 'normal' },
        { path: '../fonts/SFProDisplay-BlackItalic.ttf', weight: '900', style: 'italic' },
        { path: '../fonts/SFProDisplay-Bold.ttf', weight: 'bold', style: 'normal' },
        { path: '../fonts/SFProDisplay-Black.ttf', weight: '900', style: 'normal' },
        { path: '../fonts/SFProDisplay-SemiboldItalic.ttf', weight: '600', style: 'italic' },
        { path: '../fonts/SFProDisplay-Ultralight.ttf', weight: '200', style: 'normal' },
        { path: '../fonts/SFProDisplay-LightItalic.ttf', weight: '200', style: 'italic' },
        { path: '../fonts/SFProDisplay-ThinItalic.ttf', weight: '100', style: 'italic' },
        { path: '../fonts/SFProDisplay-MediumItalic.ttf', weight: '500', style: 'italic' },
        { path: '../fonts/SFProDisplay-Semibold.ttf', weight: '600', style: 'normal' },
        { path: '../fonts/SFProDisplay-HeavyItalic.ttf', weight: '900', style: 'italic' },
        { path: '../fonts/SFProDisplay-Regular.ttf', weight: 'normal', style: 'normal' },
        { path: '../fonts/SFProDisplay-BoldItalic.ttf', weight: 'bold', style: 'italic' }
    ],
    preload: true,
    variable: '--font-sfpro'
});
