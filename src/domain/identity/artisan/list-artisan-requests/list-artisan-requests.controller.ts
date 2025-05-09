import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ListArtisanRequestsService } from './list-artisan-requests.service';
import { ListArtisanRequestsDto } from './list-artisan-requests.dto'
import { JwtAuthGuard } from '@/domain/auth/jwt-auth.guard'
import { RolesGuard } from '@/domain/auth/roles/roles.guard'
import { Roles } from '@/domain/auth/roles/roles.decorator'
import { Role } from '@prisma/client'

@Controller('artisans/requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ListArtisanRequestsController {
  constructor(
    private readonly listArtisanRequests: ListArtisanRequestsService,
  ) {}

  @Get()
  @Roles(Role.ADMIN, Role.MODERATOR)
  async handle(@Query() query: ListArtisanRequestsDto) {
    return this.listArtisanRequests.execute(query)
  }
} 