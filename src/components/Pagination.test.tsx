import { render, fireEvent, screen } from '@testing-library/react';
import { Pagination } from "./Pagination";

const doNothing = () => { };

test('Pevious button is disabled if the first item is selected', async () => {
    render(<Pagination current={1} total={12} onPageChange={doNothing} />)
    const prevButton = screen.getByText('Prev');

    expect(prevButton).toBeDisabled()
})

test('Next button is disabled if the last item is selected', async () => {
    render(<Pagination current={12} total={12} onPageChange={doNothing} />)
    const nextButton = screen.getByText('Next');

    expect(nextButton).toBeDisabled()
})

test('Active element has primary color', async () => {
    render(<Pagination current={5} total={12} onPageChange={doNothing} />)
    const activeButton = screen.getByText('5');

    expect(activeButton).toHaveClass('MuiIconButton-colorPrimary')
})

test('Inactive element have neutral color', async () => {
    render(<Pagination current={5} total={12} onPageChange={doNothing} />)
    const activeButton = screen.getByText('4');

    expect(activeButton).toHaveClass('MuiIconButton-colorNeutral')
})

test('Clicking on next fires onPageChange event with current+1', async () => {
    let pageChangeArg = null;
    const onPageChange = (page: number) => pageChangeArg = page;


    render(<Pagination current={5} total={12} onPageChange={onPageChange} />)
    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton)

    expect(pageChangeArg).toEqual(6)
})

test('Clicking on prev fires onPageChange event with current-1', async () => {
    let pageChangeArg = null;
    const onPageChange = (page: number) => pageChangeArg = page;


    render(<Pagination current={5} total={12} onPageChange={onPageChange} />)
    const prevButton = screen.getByText('Prev');

    fireEvent.click(prevButton)

    expect(pageChangeArg).toEqual(4)
})

test('Clicking on number fires onPageChange event with that number', async () => {
    let pageChangeArg = null;
    const onPageChange = (page: number) => pageChangeArg = page;

    render(<Pagination current={5} total={12} onPageChange={onPageChange} />)
    const button = screen.getByText('12');

    fireEvent.click(button)

    expect(pageChangeArg).toEqual(12)
})

