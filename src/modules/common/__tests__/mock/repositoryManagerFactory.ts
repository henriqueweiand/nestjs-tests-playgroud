import { EntityManager } from 'typeorm';
import { entityManagerMock } from './entityManager.mock';

export const repositoryManagerFactory: (
  entityManager?: EntityManager,
) => EntityManager = jest.fn(entityManagerParam => ({
  transaction: jest.fn(
    async (
      runInTransaction: (entityManager: EntityManager) => Promise<any>,
    ) => {
      return await runInTransaction(
        entityManagerParam ? entityManagerParam : entityManagerMock(),
      );
    },
  ),
})) as any;
