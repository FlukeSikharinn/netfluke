import axios from 'axios';

const BASE_URL = process.env.NEST_BACKEND_URL || 'http://localhost:4000';

export const fetchHomeMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movies/home`);
        
        if (response.data.statusCode === 200) {
            return response.data.data; 
        } else {
            console.error('Error:', response.data.message); 
            return null;
        }
    } catch (error) {
        console.error('Error fetching home movies:', error);
        return null;
    }
};

export const getMovieDetail = async (movieId: string) => {
  try {
      const response = await axios.get(`${BASE_URL}/movies/${movieId}/details`);
      
      if (response.data.statusCode === 200) {
          return response.data.data;
      } else {
          console.error('Error:', response.data.message); 
          return null;
      }
  } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
  }
};