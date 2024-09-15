import { render } from '@testing-library/react';
import { Home } from './Home';
import { vi } from 'vitest';
import React from 'react';

// #region Mocks

vi.mock('@tanstack/react-query', () => ({
    useQuery: () => ({
        data: {
            characters: {
                info: {
                    count: 1,
                    pages: 1,
                },
                results: [{
                    name: 'Char 1',
                    image: '/1.png',
                    status: 'Alive',
                    species: 'Human'
                }, {
                    name: 'Char 2',
                    image: '/2.png',
                    status: 'Dead',
                    species: 'Alien'
                }]
            },
        },
    })
}))

vi.mock('react-router-dom', () => ({
    Link: ({ children, ...rest }: React.PropsWithChildren) => <a {...rest}>{children}</a>
}))

vi.mock('@mui/joy/Sheet', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <div {...rest}>{children}</div>
}))

vi.mock('@mui/joy/Table', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <table {...rest}>{children}</table>
}))

vi.mock('@mui/joy/Avatar', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <img {...rest}>{children}</img>
}))

vi.mock('@mui/joy/Typography', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <p {...rest}>{children}</p>
}))

vi.mock('@mui/joy/Input', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <input {...rest}>{children}</input>
}))

vi.mock('../components/TinyCard', () => ({
    TinyCard: ({ children, ...rest }: React.PropsWithChildren) => <div {...rest}>{children}</div>
}))

vi.mock('../components/Page', () => ({
    Page: ({ children, ...rest }: React.PropsWithChildren) => <div {...rest}>{children}</div>
}))

vi.mock('../components/Pagination', () => ({
    Pagination: ({ children, ...rest }: React.PropsWithChildren) => <div {...rest}>{children}</div>
}))

//#endregion

test('Home renders correctly and matches snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
});

