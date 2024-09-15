import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import mediaQuery from 'css-mediaquery';

beforeAll(() => {
    createMatchMedia(576);
});

afterEach(() => {
    createMatchMedia(576);
});

export function createMatchMedia(width) {
    window.matchMedia = (query) => ({
        matches: mediaQuery.match(query, {
            width,
        }),
        media: '',
        onchange: () => { },
        removeEventListener: () => { },
        dispatchEvent: (_: Event) => true,
        addEventListener: () => { },
        addListener: () => { },
        removeListener: () => { },
    });
}

afterEach(() => {
    cleanup();
});