import { Observable } from 'rxjs';

export interface IGetProductDetailsByProductIdsInput {
  products: IGetProductDetailsByProductIdsInputProduct[];
  customerId: string;
}
export interface IGetProductDetailsByProductIdsInputProduct {
  productId: string;
  quantity: number;
  value: string;
}

export interface IGetProductDetailsByProductIdsOutput {
  products: IGetProductDetailsByProductIdsOutputProducts[];
}
export interface IGetProductDetailsByProductIdsOutputProducts {
  id: string;
  name: string;
  code: string;
  score: string;
  totalScore: string;
  scoringMethod: string;
  categoryId: string;
  categoryName: string;
  categoryMultiplyingFactor: string;
}

export interface IGetSimplifiedProductsByIdsInput {
  ids: string[];
}

export interface IGetSimplifiedProductsByIdsOutput {
  products: IGetSimplifiedProductsByIdsOutputProducts[];
}

export interface IGetSimplifiedProductsByIdsOutputProducts {
  id: string;
  name: string;
}

export interface IProductService {
  getProductDetailsByProductIds(
    input: IGetProductDetailsByProductIdsInput,
  ): Observable<IGetProductDetailsByProductIdsOutput>;
  getSimplifiedProductsByIds(
    input: IGetSimplifiedProductsByIdsInput,
  ): Observable<IGetSimplifiedProductsByIdsOutput>;
}
