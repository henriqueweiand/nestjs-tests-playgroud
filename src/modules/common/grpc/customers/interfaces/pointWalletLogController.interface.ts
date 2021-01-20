import { Observable } from 'rxjs';

export interface IPointWalletLogController {
  getCustomerStatement(
    input: IGetCustomerStatementInput,
  ): Observable<IGetCustomerStatementOutput>;
}

export interface IGetCustomerStatementInput {
  customerId: string;
  storeId?: string;
  skip?: number;
  order?: 'ASC' | 'DESC';
}

export interface IGetCustomerStatementOutput {
  pointWalletLogs: PointWalletLog[];
}

enum LogType {
  ADDITION = 'addition',
  SUBTRACTION = 'subtraction',
}

enum PointWalletOrigin {
  AUDIT = 'audit',
  MANUAL_POINT = 'manual_point',
  MANUAL_SALE = 'manual_sale',
}

enum RedeemStatus {
  REDEEMED = 'redeemed',
  CANCELED = 'canceled',
}

interface PointWalletLog {
  id: string;
  createDate: string;
  value: number;
  type: LogType;
  pointWallet: PointWallet;
  redeem: Redeem;
  sale: Sale;
}

interface PointWallet {
  id?: string;
  origin: PointWalletOrigin;
}

interface Redeem {
  id: string;
  redeemProducts: RedeemProduct[];
  status: RedeemStatus;
}

interface RedeemProduct {
  id: string;
  rewardId: string;
  rewardName: string;
  rewardQuantity: string;
}

interface Sale {
  registerSaleId: string;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
}
