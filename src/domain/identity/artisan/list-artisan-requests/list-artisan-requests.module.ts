import { Module } from '@nestjs/common';
import { ListArtisanRequestsController } from './list-artisan-requests.controller';
import { ListArtisanRequestsService } from './list-artisan-requests.service';
import { PrismaService } from '@/shared/prisma/prisma.service';

@Module({
  controllers: [ListArtisanRequestsController],
  providers: [ListArtisanRequestsService, PrismaService],
})
export class ListArtisanRequestsModule {} 