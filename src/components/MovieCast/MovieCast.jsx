import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/tmdbApi';
import css from './MovieCast.module.css';
import { IMAGE_BASE_URL } from '../../services/imageBaseUrl';

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
          ? `${IMAGE_BASE_URL}${actor.profile_path}`
          : 'https://placehold.co/300x450?text=No+Poster&font=roboto';

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
