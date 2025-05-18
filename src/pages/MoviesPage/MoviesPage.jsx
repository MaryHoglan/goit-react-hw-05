import { useState } from 'react';
import { searchMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!query.trim()) {
      alert('Please enter a search query');
      return;
    }
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={css.moviesPage}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter movie title"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>Search</button>
      </form>

      {error && <p className={css.errorMessage}>{error.message}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
