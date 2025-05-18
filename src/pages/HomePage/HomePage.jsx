import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/tmdbApi";
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingMovies()
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={css.homePage}>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}

