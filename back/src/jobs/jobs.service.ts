import { Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  findAll(id: string, search: string, status: string): Promise<Job[]> {
    return this.prisma.job.findMany({
      where: {
        userId: id,
        AND: search.split(' ').map((term) => ({
          OR: [
            { company: { contains: term, mode: 'insensitive' } },
            { title: { contains: term, mode: 'insensitive' } },
          ],
        })),
        status: status !== '*' ? (status as Job['status']) : undefined,
      },
    });
  }

  async create(createJobDto: CreateJobDto, userId: string) {
    await this.prisma.job.create({
      data: { ...createJobDto, userId },
    });
    return 'Votre offre a été créée avec succès.';
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} job`;
  // }

  async update(id: string, updateJobDto: UpdateJobDto, userId: string) {
    await this.prisma.job.update({
      where: { id, userId },
      data: updateJobDto,
    });
    return 'Vous avez mis à jour votre offre avec succès.';
  }

  async remove(id: string, userId: string) {
    await this.prisma.job.delete({
      where: { id, userId },
    });
    return 'Vous avez supprimé votre offre avec succès.';
  }
}
