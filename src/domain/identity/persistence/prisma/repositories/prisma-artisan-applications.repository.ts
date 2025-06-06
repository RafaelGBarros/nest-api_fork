import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { ArtisanApplicationsRepository } from '@/domain/identity/core/repositories/artisan-applications.repository';
import { ArtisanApplication } from '@/domain/identity/core/entities/artisan-application.entity';
import { PrismaArtisanApplicationsMapper } from '../mappers/prisma-artisan-applications.mappers';

@Injectable()
export class PrismaArtisanApplicationsRepository implements ArtisanApplicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<ArtisanApplication[] | null> {
    const artisanApplication = await this.prisma.artisanApplication.findMany({
      where: {
        userId,
      },
    });

    if (artisanApplication.length === 0) {
      return null;
    }

    return artisanApplication.map((app) => PrismaArtisanApplicationsMapper.toDomain(app));
  }

  async findById(id: string): Promise<ArtisanApplication | null> {
    const artisanApplication = await this.prisma.artisanApplication.findUnique({
      where: {
        id,
      },
    });

    if (!artisanApplication) {
      return null;
    }

    return PrismaArtisanApplicationsMapper.toDomain(artisanApplication);
  }

  async listAll(): Promise<ArtisanApplication[]> {
    const artisanApplications = await this.prisma.artisanApplication.findMany();

    if (artisanApplications.length === 0) {
      return [];
    }

    return artisanApplications.map((ap) => PrismaArtisanApplicationsMapper.toDomain(ap));
  }

  async save(artisanApplication: ArtisanApplication): Promise<void> {
    await this.prisma.artisanApplication.upsert({
      where: {
        id: artisanApplication.id,
      },
      create: {
        id: artisanApplication.id,
        userId: artisanApplication.userId,
        rawMaterial: artisanApplication.rawMaterial,
        technique: artisanApplication.technique,
        finalityClassification: artisanApplication.finalityClassification,
        sicab: artisanApplication.sicab,
        sicabRegistrationDate: artisanApplication.sicabRegistrationDate,
        sicabValidUntil: artisanApplication.sicabValidUntil,
        status: artisanApplication.status,
        reviewerId: artisanApplication.reviewerId,
        rejectionReason: artisanApplication.rejectionReason,
        createdAt: artisanApplication.createdAt,
        updatedAt: artisanApplication.updatedAt,
      },
      update: {
        rawMaterial: artisanApplication.rawMaterial,
        technique: artisanApplication.technique,
        finalityClassification: artisanApplication.finalityClassification,
        sicab: artisanApplication.sicab,
        sicabRegistrationDate: artisanApplication.sicabRegistrationDate,
        sicabValidUntil: artisanApplication.sicabValidUntil,
        status: artisanApplication.status,
        reviewerId: artisanApplication.reviewerId,
        rejectionReason: artisanApplication.rejectionReason,
        updatedAt: artisanApplication.updatedAt,
      },
    });
  }
}
