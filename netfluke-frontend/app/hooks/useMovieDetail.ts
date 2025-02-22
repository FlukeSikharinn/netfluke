import { useState, useCallback } from 'react';
import { getMovieDetail } from '../services/movieService';
import { MovieDetail } from '../types/types';

export const useMovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMovieDetailById = useCallback(async (movieId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovieDetail(movieId);
      if (data) {
        setMovieDetails(data);
      } else {
        setError('Failed to fetch movie details.');
      }
    } catch (error: any) {
      console.error('Error fetching movie details:', error);
      setError('Error fetching movie details. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { movieDetails, getMovieDetailById, loading, error };
};
