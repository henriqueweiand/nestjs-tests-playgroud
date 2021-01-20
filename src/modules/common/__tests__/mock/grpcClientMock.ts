import { MockType } from './mockType';

export const grpcClientMock: () => MockType<any> = jest.fn(() => ({
  getService: jest.fn(value => value),
  getClientByServiceName: jest.fn(value => value),
}));
