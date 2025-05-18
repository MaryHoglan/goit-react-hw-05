import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/tmdbApi';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then(setCast)
      .catch(setError);
  }, [movieId]);

  if (error) return <p style={{ color: 'red' }}>Error loading cast.</p>;
  if (cast.length === 0) return <p>No cast information available.</p>;

  return (
    <ul className={css.castList}>
      {cast.slice(0, 10).map(actor => {
        const imgUrl = actor.profile_path
          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
          : 'https://via.placeholder.com/300x450?text=No+Image';

        return (
          <li key={actor.cast_id || actor.credit_id} className={css.castItem}>
            <img src={imgUrl} alt={actor.name} className={css.castImage} />
            <p className={css.castName}>{actor.name}</p>
            <p className={css.character}>as {actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
}
