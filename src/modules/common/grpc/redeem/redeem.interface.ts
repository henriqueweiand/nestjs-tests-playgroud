import { Observable } from 'rxjs';

export interface IRedeemController {
  getAll(parameters: IGetAllRequest): Observable<IGetAllResponse>;
  getRedeemsWithRedeemProductsByRedeemIds(
    parameters: IGetRedeemsWithRedeemProductsByRedeemIdsRequest,
  ): Observable<IGetRedeemsWithRedeemProductsByRedeemIdsResponse>;
}

export interface IGetAllRequest {
  programId: string;
  storeId: string;
  take?: number;
  skip?: number;
  search?: string;
  status?: string;
  order?: string;
}

export interface IGetAllResponse {
  data: IGetAllResponseData;
  count: number;
}

export interface IGetAllResponseData {
  id: string;
  customerId: string;
  customerName: string;
  customerDocument: string;
  pointsUsed: string;
  employeeId: string;
  employeeName: string;
  status: string;
  canceledAt: string;
  canceledReason: string;
  redeemProducts: IGetAllResponseDataRedeemProduct[];
}

export interface IGetAllResponseDataRedeemProduct {
  id: string;
  rewardId: string;
  rewardName: string;
  rewardValue: number;
  redeemId: string;
  rewardQuantity: number;
  campaignId: string;
  campaignName: string;
}

export interface IGetRedeemsWithRedeemProductsByRedeemIdsRequest {
  ids: string[];
}

export interface IGetRedeemsWithRedeemProductsByRedeemIdsResponse {
  redeems: IGetRedeemsWithRedeemProductsByRedeemIdsResponseRedeem[];
}

export interface IGetRedeemsWithRedeemProductsByRedeemIdsResponseRedeem {
  id: string;
  status: RedeemStatus;
  redeemProducts: IGetRedeemsWithRedeemProductsByRedeemIdsResponseRedeemProducts[];
}

export interface IGetRedeemsWithRedeemProductsByRedeemIdsResponseRedeemProducts {
  id: string;
  rewardId: string;
  rewardName: string;
  rewardQuantity: number;
}

enum RedeemStatus {
  REDEEMED = 'redeemed',
  CANCELED = 'canceled',
}
