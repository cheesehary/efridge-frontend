import { calculateBalance } from './FinanceService';
const typeorm = require('typeorm');

test('calculateBalance returns 0', async () => {
  const mockManager = {
    query: jest.fn().mockResolvedValue([{}]),
  };
  typeorm.getManager = jest.fn().mockReturnValue(mockManager);
  expect(await calculateBalance('')).toBe(0);
});

test('calculateBalance returns a number', async () => {
  const income = 8000;
  const months = 3;
  const savingsGoal = 1000;
  const spending = 1000;
  const mockManager = {
    query: jest
      .fn()
      .mockResolvedValueOnce([{ income, months }])
      .mockResolvedValueOnce([{ spending }]),
    findOne: jest.fn().mockResolvedValueOnce({ savingsGoal }),
  };
  typeorm.getManager = jest.fn().mockReturnValue(mockManager);
  expect(await calculateBalance('')).toBe(4000);
});
