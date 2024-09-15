import { render, fireEvent, screen, within, act } from '@testing-library/react';
import App from '../src/App';
import { mockApi } from './mockApi';
import userEvent from '@testing-library/user-event';
import { beforeAll, afterAll, afterEach, test, expect } from 'vitest'

const server = mockApi();

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Loads table', async () => {
    render(<App />)

    await screen.findByText('John the 1');
    const tbody = await screen.findByTestId('characters-table-body');

    expect(tbody?.children).toHaveLength(10)
});

test('Can change page', async () => {
    render(<App />)

    await screen.findByText('John the 1');

    const pagination = await screen.findByTestId('pagination');

    act(() => {
        fireEvent.click(within(pagination).getByText('2'));
    });

    await screen.findByText('John the 2');
    const tbody = await screen.findByTestId('characters-table-body');

    expect(tbody?.children).toHaveLength(10)
})

test('Can search', async () => {
    render(<App />)

    await screen.findByText('John the 1');
    act(() => {
        userEvent.type(screen.getByRole('textbox'), 'Charlie the 5')
    });

    await screen.findByText('Charlie the 5');
    const tbody = await screen.findByTestId('characters-table-body');

    expect(tbody?.children).toHaveLength(1)
})

test('Click on character name loads profile page', async () => {
    render(<App />)

    const johnLink = await screen.findByText('John the 1');

    act(() => {
        fireEvent.click(johnLink);
    });

    await screen.findByText('Episodes:')
    const name = await screen.findByText('John the 1');

    expect(name).toBeDefined()
})