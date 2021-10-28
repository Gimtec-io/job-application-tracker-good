import { sortNewestByCreatedAt } from './sortNewestByCreatedAt';

test('sorts createdAt newest first', () => {
  const newestElement = { createdAt: '2021-10-28T13:00:33.938Z' };
  const middleElement = { createdAt: '2021-10-28T11:00:33.938Z' }
  const oldestElement = { createdAt: '2021-10-26T11:00:33.938Z' }
  const elements = [
    middleElement,
    oldestElement,
    newestElement,
  ];
  const sortedElements = elements.sort(sortNewestByCreatedAt);
  expect(sortedElements[0]).toBe(newestElement);
  expect(sortedElements[2]).toBe(oldestElement);
});
