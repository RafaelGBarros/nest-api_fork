import { IsEnum, IsOptional } from 'class-validator';
import { RequestStatus } from '.prisma/client';

export class ListArtisanRequestsDto {
  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus;
} 