import { useState, useEffect } from 'react';
import { fetchHomeMovies } from '../services/movieService';
import { Movies } from '../types/types';

export const useHomeMovies = () => {
  const [movies, setMovies] = useState<Movies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchHomeMovies();
        if (data) {
          setMovies(data);
        } else {
          setError('Failed to fetch movie data.');
        }
      } catch (error: any) {
        console.error('Error fetching home movies:', error);
        setError('Error fetching movie data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return { movies, loading, error };
};
