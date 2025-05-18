import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/tmdbApi';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then(setReviews)
      .catch(setError);
  }, [movieId]);

  if (error) return <p style={{ color: 'red' }}>Error loading reviews.</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul className={css.reviewList}>
      {reviews.map(review => (
        <li key={review.id} className={css.reviewItem}>
          <p className={css.author}>Author: {review.author}</p>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

