import { Connection, EntityManager } from 'typeorm';
import { entityManagerMock } from './entityManager.mock';

export const connectionMockFactory: (
  entityManager?: EntityManager,
) => Connection = jest.fn(entityManagerParam => ({
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
