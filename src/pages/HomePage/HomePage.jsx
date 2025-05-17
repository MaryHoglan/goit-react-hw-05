import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchTrendingMovies } from "../../services/tmdbApi";
  
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
    <div>
        <h1>Trending today</h1>
        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                        {movie.title}</Link>
                </li>
            ))}
        </ul>
    </div>
  );
}

