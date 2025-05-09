import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { RequestStatus } from '.prisma/client';

export interface ListArtisanRequestsInput {
  status?: RequestStatus;
}

@Injectable()
export class ListArtisanRequestsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(input: ListArtisanRequestsInput) {
    const requests = await this.prisma.artisanCreationRequest.findMany({
      where: {
        status: input.status,
      },
      include: {
        userRequesting: {
          include: {
            profile: true,
          },
        },
        userReviwer: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return requests;
  }
} 