import { Observable } from 'rxjs';

export interface IGetStoreByDocumentInput {
  storeDocument: string;
}

export interface IGetStoreByIdInput {
  id: string;
}

export interface IGetProgramByStoreIdInput {
  id: string;
}

export interface IGetStoreByDocumentOutput {
  id: string;
  programId: string;
}

export interface IGetStoreByIdOutput {
  id: string;
  name: string;
  programId: string;
}

export interface IGetProgramByStoreIdOutput {
  id: string;
  cashPerPoint: string;
  litersPerPoint: number;
}

export interface IStoreService {
  getStoreByDocument(
    input: IGetStoreByDocumentInput,
  ): Observable<IGetStoreByDocumentOutput>;
  getStoreById(input: IGetStoreByIdInput): Observable<IGetStoreByIdOutput>;
  getProgramByStoreId(
    input: IGetProgramByStoreIdInput,
  ): Observable<IGetProgramByStoreIdOutput>;
}

export interface IStoreService {}
