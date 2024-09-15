import { generatePaginationIndexes } from "./generatePaginationIndexes";

test('Returns full first group, then null, then last item if first page is selected', () => {
    const indexes = generatePaginationIndexes(1, 10);
    expect(indexes).toEqual([1, 2, 3, 4, 5, null, 10]);
})

test('Returns full first group, then null, then last item if the 4th page is selected', () => {
    const indexes = generatePaginationIndexes(4, 10);
    expect(indexes).toEqual([1, 2, 3, 4, 5, null, 10]);
})

test('Returns first, then null, then middle group, then last item if the 5th page is selected', () => {
    const indexes = generatePaginationIndexes(5, 10);
    expect(indexes).toEqual([1, null, 4, 5, 6, null, 10]);
})

test('Returns first, then null, then middle group, then last item if the 5th element from the end is seleted', () => {
    const indexes = generatePaginationIndexes(10, 15);
    expect(indexes).toEqual([1, null, 9, 10, 11, null, 15]);
})

test('Returns first, then null, then last group item if the 3th element from the end is seleted', () => {
    const indexes = generatePaginationIndexes(13, 15);
    expect(indexes).toEqual([1, null, 11, 12, 13, 14, 15]);
})

test('Show all the elements if there are only 7 pages', () => {
    const indexes = generatePaginationIndexes(1, 7);
    expect(indexes).toEqual([1, 2, 3, 4, 5, 6, 7]);
})

test('Show all the elements if there are only 2 pages', () => {
    const indexes = generatePaginationIndexes(2, 2);
    expect(indexes).toEqual([1, 2]);
})

test('Works well with single page', () => {
    const indexes = generatePaginationIndexes(1, 1);
    expect(indexes).toEqual([1]);
})

test('Works well with huge numbers', () => {
    const indexes = generatePaginationIndexes(5567, 999984);
    expect(indexes).toEqual([1, null, 5566, 5567, 5568, null, 999984]);
})

test('If the current is bigger than total still produces meaningful output', () => {
    const indexes = generatePaginationIndexes(11, 9);
    expect(indexes).toEqual([1, null, 5, 6, 7, 8, 9]);
})

test('Returns empty array if total is negative', () => {
    const indexes = generatePaginationIndexes(2, -9);
    expect(indexes).toEqual([]);
})

test('If current is negative acts like the current is within the first group', () => {
    const indexes = generatePaginationIndexes(-2, 9);
    expect(indexes).toEqual([1, 2, 3, 4, 5, null, 9]);
})