import { EntityManager } from 'typeorm';

export const entityManagerMock: () => EntityManager = jest.fn(() => ({
  save: jest.fn(entity => entity),
  createQueryBuilder: jest.fn(),
  query: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  delete: jest.fn(entity => entity),
})) as any;
