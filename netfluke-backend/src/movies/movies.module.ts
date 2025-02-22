import { Module } from '@nestjs/common';
import { HttpModule  } from '@nestjs/axios';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
