import { useState, useEffect } from 'react';
import { searchMovies } from '../../services/tmdbApi';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';  
  const [inputValue, setInputValue] = useState(query); 

  
  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    async function fetchMovies() {
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
      } catch (err) {
        setError(err);
      }
    }
    fetchMovies();
  }, [query]);

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedQuery = inputValue.trim();

    if (!trimmedQuery) {
      alert('Please enter a search query');
      return;
    }

    
    setSearchParams({ query: trimmedQuery });
  };

  return (
    <div className={css.moviesPage}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter movie title"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>Search</button>
      </form>

      {error && <p className={css.errorMessage}>{error.message}</p>}

      
      {!error && query && movies.length === 0 && (
        <p className={css.notFoundMessage}>Movie not found.</p>
      )}

      <MovieList movies={movies} />
    </div>
  );
}
