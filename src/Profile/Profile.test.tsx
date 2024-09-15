import { render } from '@testing-library/react';
import { Profile } from './Profile';
import { vi } from 'vitest';
import React from 'react';

// The purphose of this test is to check that the correct html is generated and that all the data is in correct places
// However react-testing-library author does not support shallow renderering
// Generating huge snapshots makes them unusable. From my experience, no one reviews 1000+ lines of code, they blindly accept the change
// Thats why I have to stupidly mock every single mui dependency I've used inside Profile page

// #region Mocks

vi.mock('@tanstack/react-query', () => ({
    useQuery: () => ({
        data: {
            character: {
                name: 'The Character',
                image: 'http://some.png',
                origin: {
                    name: 'Earth'
                },
                status: 'Alive',
                species: 'Human',
                type: 'Regular Human',
                location: {
                    name: "Earth"
                },
                episode: [{
                    id: 1, name: 'First Episode'
                }, {
                    id: 2, name: 'Second Episode'
                }]
            }
        }
    })
}))

vi.mock('react-router-dom', () => ({
    useParams: () => ({ id: 4 }),
    Link: ({ children, ...rest }: React.PropsWithChildren) => <a {...rest}>{children}</a>
}))

vi.mock('@mui/joy/Button', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <button {...rest}>{children}</button>
}))

vi.mock('@mui/joy/IconButton', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <button {...rest}>{children}</button>
}))

vi.mock('@mui/joy/CardCover', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <div {...rest}>{children}</div>
}))

vi.mock('@mui/joy/Card', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <div {...rest}>{children}</div>
}))

vi.mock('@mui/joy/Stack', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <div {...rest}>{children}</div>
}))

vi.mock('@mui/joy/Typography', () => ({
    default: ({ children, ...rest }: React.PropsWithChildren) => <p {...rest}>{children}</p>
}))

vi.mock('../components/TinyCard', () => ({
    TinyCard: ({ children, ...rest }: React.PropsWithChildren) => <div {...rest}>{children}</div>
}))

vi.mock('../components/Page', () => ({
    Page: ({ children, ...rest }: React.PropsWithChildren) => <div {...rest}>{children}</div>
}))

vi.mock('react-image', () => ({
    Img: ({ children, ...rest }: React.PropsWithChildren) => <img {...rest}>{children}</img>
}))

vi.mock('@mui/icons-material/ArrowBackIosNewRounded', () => ({
    default: () => <svg>{'<'}</svg>
}))

vi.mock('@mui/icons-material/LocationOnRounded', () => ({
    default: () => <svg>{'L'}</svg>
}))

vi.mock('@mui/icons-material/LocationCityRounded', () => ({
    default: () => <svg>{'C'}</svg>
}))

vi.mock('@mui/icons-material/NoAccounts', () => ({
    default: () => <svg>{'D'}</svg>
}))

vi.mock('@mui/icons-material/AccountCircleRounded', () => ({
    default: () => <svg>{'A'}</svg>
}))

vi.mock('@mui/icons-material/HelpRounded', () => ({
    default: () => <svg>{'U'}</svg>
}))

//#endregion

test('Profile renders correctly and matches snapshot', () => {
    const { asFragment } = render(<Profile />);
    expect(asFragment()).toMatchSnapshot();
});

