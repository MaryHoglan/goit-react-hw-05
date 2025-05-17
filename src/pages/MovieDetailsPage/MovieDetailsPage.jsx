import { Link, Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../services/tmdbApi';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie).catch(() => {
    
      navigate('/');
    });
  }, [movieId, navigate]);

  if (!movie) return <div>Loading movie details...</div>;

  return (
    <div>
      <button onClick={() => navigate(location?.state?.from || '/')}>Go Back</button>

      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <hr />

      <ul>
        <li><Link to="cast" state={{ from: location.state?.from }}>Cast</Link></li>
        <li><Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link></li>
      </ul>

      <hr />

      <Outlet />
    </div>
  );
}


 