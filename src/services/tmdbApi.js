import axios from 'axios';


const accessToken = import.meta.env.VITE_API_TOKEN;
const options = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  },
};

const TRENDING_MOVIES_URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const SEARCH_MOVIES_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
const MOVIE_DETAILS = 'https://api.themoviedb.org/3/movie/';

export async function fetchTrendingMovies() {
  try {
    const response = await axios.get(TRENDING_MOVIES_URL, options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
}

export async function searchMovies(query) {
  try {
    const response = await axios.get(`${SEARCH_MOVIES_URL}&query=${query}`, options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export async function fetchMovieDetails(movieId) { 
    try {
        const response = await axios.get(`${MOVIE_DETAILS}${movieId}`, options);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }

}

export async function fetchMovieCast(movieId) {
  try {
    const response = await axios.get(`${MOVIE_DETAILS}${movieId}/credits`, options);
    return response.data.cast;  
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
}

export async function fetchMovieReviews(movieId) {
  try {
    const response = await axios.get(`${MOVIE_DETAILS}${movieId}/reviews`, options);
    return response.data.results; 
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
}