import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('home')
  async getHomeMovies() {
    return this.moviesService.getHomeData();
  }

  @Get(':id/details')
  async getMovieDetails(@Param('id') id: string) {
    return this.moviesService.getMovieDetails(id);
  }
}
