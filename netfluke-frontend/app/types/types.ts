export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres?: string[];
    cast?: {
      name: string;
    }[];
    crew?: string[];
    original_language: string;
    video?: {
      key: string;
      size: number;
    };
  }
  
export interface Video {
    id: string;
    key: string;
    site: string;
    type: string;
    size: number;
}
  
export interface Movies {
    banner: Movie;
    popularMovies: Movie[];
    popularTvShows: Movie[];
}
  

export interface MovieDetail {
    rating: number;
    genres: string[];
    video: {
      key: string;
      site: string;
    };
    cast?: {
      id: number;
      name: string;
    }[];
    crew?: {
      id: number;
      name: string;
    }[];
    director: string;
}