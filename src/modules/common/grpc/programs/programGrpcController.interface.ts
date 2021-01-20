import { Observable } from 'rxjs';

export interface IProgramGrpcController {
  getId(request: GetIdProgramRequestDto): Observable<GetIdProgramResponseDto>;
  getPrograms(
    request: GetProgramsRequestDto,
  ): Observable<GetProgramsResponse>;
}

export interface GetIdProgramRequestDto {
  programId: string;
}

export interface GetIdProgramResponseDto {
  id: string;
  name: string;
  subscriptions: any[];
  status: boolean;
}

export interface GetProgramsRequestDto {
  programsId: string[];
}

export interface GetProgramsResponse {
  programs: GetProgramsResponseProgram[];
}

export interface GetProgramsResponseProgram {
  id: string;
  name: string;
  imageUrl: string;
}
