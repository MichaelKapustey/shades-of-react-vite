import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    // Credit:
                    // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                    solidBg: 'var(--joy-palette-primary-400)',
                    solidActiveBg: 'var(--joy-palette-primary-500)',
                    outlinedBorder: 'var(--joy-palette-primary-500)',
                    outlinedColor: 'var(--joy-palette-primary-700)',
                    outlinedActiveBg: 'var(--joy-palette-primary-100)',
                    softColor: 'var(--joy-palette-primary-800)',
                    softBg: 'var(--joy-palette-primary-200)',
                    softActiveBg: 'var(--joy-palette-primary-300)',
                    plainColor: 'var(--joy-palette-primary-700)',
                    plainActiveBg: 'var(--joy-palette-primary-100)',
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    // Credit:
                    // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                    solidBg: 'var(--joy-palette-primary-400)',
                    solidActiveBg: 'var(--joy-palette-primary-500)',
                    outlinedBorder: 'var(--joy-palette-primary-700)',
                    outlinedColor: 'var(--joy-palette-primary-600)',
                    outlinedActiveBg: 'var(--joy-palette-primary-900)',
                    softColor: 'var(--joy-palette-primary-500)',
                    softBg: 'var(--joy-palette-primary-900)',
                    softActiveBg: 'var(--joy-palette-primary-800)',
                    plainColor: 'var(--joy-palette-primary-500)',
                    plainActiveBg: 'var(--joy-palette-primary-900)',
                },
            },
        },
    }
});
