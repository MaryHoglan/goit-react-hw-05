import { Link, Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { fetchMovieDetails } from '../../services/tmdbApi';
import { IMAGE_BASE_URL } from '../../services/imageBaseUrl';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

 const backLinkRef = useRef(location.state?.from || '/');

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch(() => {
        navigate('/');
      });
  }, [movieId, navigate]);

  if (!movie) {   
    return <div>Loading movie details...</div>;
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://placehold.co/300x450?text=No+Poster&font=roboto';
  
  const genres = movie.genres?.map(genre => genre.name).join(', ') || 'N/A';

  return (
    <>
      <button className={css.backButton} onClick={() => navigate(backLinkRef.current)}>Go Back</button>

      <div className={css.container}>
        <img className={css.poster} src={posterUrl} alt={movie.title} />
        <div className={css.info}>
          <h2 className={css.title}>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
          <p className={css.meta}><strong>User Score:</strong> {movie.vote_average} / 10</p>
          <p className={css.meta}><strong>Runtime:</strong> {movie.runtime} min</p>
          <p className={css.meta}><strong>Genres:</strong> {genres}</p>
          <p className={css.meta}><strong>Overview:</strong> {movie.overview}</p>
        </div>
      </div>

      <div className={css.links}>
        <Link to="cast" state={{ from: backLinkRef.current }}>Cast</Link>
        <Link to="reviews" state={{ from: backLinkRef.current }}>Reviews</Link>
      </div>

      <Outlet />
    </>
  );
}
