import { Module } from '@nestjs/common';
import { CreateArtisanModule } from './create-artisan/create-artisan.module';
import { ListArtisanRequestsModule } from './list-artisan-requests/list-artisan-requests.module';

@Module({
  imports: [CreateArtisanModule, ListArtisanRequestsModule],
})
export class ArtisanModule {}
