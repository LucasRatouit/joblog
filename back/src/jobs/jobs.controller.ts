import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import type { Request } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
@UseGuards(AuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll(
    @Req() req: Request,
    @Query('search') search: string,
    @Query('status') status: string,
  ) {
    const userId = req.user?.token.id;
    return this.jobsService.findAll(userId!, search, status);
  }

  @Post()
  create(@Body() createJobDto: CreateJobDto, @Req() req: Request) {
    const userId = req.user?.token.id;
    return this.jobsService.create(createJobDto, userId!);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.jobsService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.token.id;
    return this.jobsService.update(id, updateJobDto, userId!);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user?.token.id;
    return this.jobsService.remove(id, userId!);
  }
}
