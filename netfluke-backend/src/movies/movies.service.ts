import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  private TMDB_API_KEY: string;
  private TMDB_BASE_URL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.TMDB_API_KEY = this.configService.get<string>('TMDB_API_KEY', '');
    this.TMDB_BASE_URL = this.configService.get<string>('TMDB_BASE_URL', '');
  }

  async getHomeData() {
    try {
      const [popularMoviesResponse, popularTvShowsResponse, genresResponse] = await Promise.allSettled([
        lastValueFrom(this.httpService.get(`${this.TMDB_BASE_URL}/movie/popular`, { params: { api_key: this.TMDB_API_KEY } })),
        lastValueFrom(this.httpService.get(`${this.TMDB_BASE_URL}/tv/popular`, { params: { api_key: this.TMDB_API_KEY } })),
        lastValueFrom(this.httpService.get(`${this.TMDB_BASE_URL}/genre/movie/list`, { params: { api_key: this.TMDB_API_KEY } })),
      ]);

      if (popularMoviesResponse.status === 'rejected') {
        console.error('Error fetching popular movies:', popularMoviesResponse.reason);
        throw new InternalServerErrorException('Failed to fetch popular movies');
      }

      if (popularTvShowsResponse.status === 'rejected') {
        console.error('Error fetching popular TV shows:', popularTvShowsResponse.reason);
        throw new InternalServerErrorException('Failed to fetch popular TV shows');
      }

      if (genresResponse.status === 'rejected') {
        console.error('Error fetching genres:', genresResponse.reason);
        throw new InternalServerErrorException('Failed to fetch genres');
      }

      const popularMoviesData = popularMoviesResponse.value.data.results;
      const popularTvShowsData = popularTvShowsResponse.value.data.results;
      const genresData = genresResponse.value.data.genres;

      const bannerMovie = popularMoviesData[0];

      const bannerVideoResponse = await lastValueFrom(
        this.httpService.get(`${this.TMDB_BASE_URL}/movie/${bannerMovie.id}/videos`, {
          params: { api_key: this.TMDB_API_KEY },
        })
      ).catch((err) => {
        console.error('Error fetching banner video:', err);
        return { data: { results: [] } };
      });

      const trailer = bannerVideoResponse.data.results?.find(
        (video) => video.type === 'Trailer' || video.type === 'Teaser'
      ) || null;

      const genreMap = genresData.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});

      const popularMovies = popularMoviesData.slice(1).map(movie => ({
        ...movie,
        genres: movie.genre_ids.map(id => genreMap[id] || 'Unknown'),
      }));

      const popularTvShows = popularTvShowsData.map(tvShow => ({
        ...tvShow,
        genres: tvShow.genre_ids.map(id => genreMap[id] || 'Unknown'),
      }));

      return {
        statusCode: 200,
        status: 'success',
        data: {
          banner: { ...bannerMovie, video: trailer },
          popularMovies,
          popularTvShows,
        },
      };
    } catch (error) {
      console.error('Error in getHomeData:', error);
      throw new InternalServerErrorException('Error fetching home data');
    }
  }

  async getMovieDetails(movieId: string) {
    try {
        const [detailsResponse, creditsResponse, videosResponse] = await Promise.allSettled([
            lastValueFrom(this.httpService.get(`${this.TMDB_BASE_URL}/movie/${movieId}`, { params: { api_key: this.TMDB_API_KEY } })),
            lastValueFrom(this.httpService.get(`${this.TMDB_BASE_URL}/movie/${movieId}/credits`, { params: { api_key: this.TMDB_API_KEY } })),
            lastValueFrom(this.httpService.get(`${this.TMDB_BASE_URL}/movie/${movieId}/videos`, { params: { api_key: this.TMDB_API_KEY } })),
        ]);

        if (detailsResponse.status === 'rejected') {
            console.error('Error fetching movie details:', detailsResponse.reason);
            throw new InternalServerErrorException('Failed to fetch movie details');
        }

        if (creditsResponse.status === 'rejected') {
            console.error('Error fetching movie credits:', creditsResponse.reason);
            throw new InternalServerErrorException('Failed to fetch movie credits');
        }

        if (videosResponse.status === 'rejected') {
            console.error('Error fetching movie videos:', videosResponse.reason);
            throw new InternalServerErrorException('Failed to fetch movie videos');
        }

        const movie = detailsResponse.value.data;
        const credits = creditsResponse.value.data;
        const videos = videosResponse.value.data.results;

        const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube') || videos[0];

        return {
            statusCode: 200,
            status: 'success',
            data: {
                id: movie.id,
                title: movie.title,
                genres: movie.genres.map((g) => g.name),
                rating: movie.vote_average,
                originalLanguage: movie.original_language,
                releaseDate: movie.release_date,
                cast: credits.cast.slice(0, 10),
                crew: credits.crew.filter(member => member.job === 'Director' || member.job === 'Producer'),
                video: trailer ? { key: trailer.key, site: trailer.site } : null, // เพิ่มวิดีโอเข้าไป
            },
        };
    } catch (error) {
        console.error('Error in getMovieDetails:', error);
        throw new InternalServerErrorException('Error fetching movie details');
    }
  }
}
