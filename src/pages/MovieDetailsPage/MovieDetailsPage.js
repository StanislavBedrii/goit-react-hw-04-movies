import { useEffect, useState, lazy, Suspense } from 'react';
import {
  useParams,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Button } from '@material-ui/core';

import { fetchMovieDetails } from '../../services/tmdb-api';
import Status from '../../services/Status';
import Preloader from '../../components/Preloader';
import MovieDetails from '../../components/MovieDetails';
import ErrorText from '../../components/ErrorText';

import styles from './MovieDetailsPage.module.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "cast"*/));

const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews"*/),
);

function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const movieId = slug.match(/[a-z0-9]+$/)[0];

  useEffect(() => {
    const fetchMoviesID = async () => {
      try {
        const result = await fetchMovieDetails(movieId);
        setMovie(result);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    };

    fetchMoviesID();
  }, [movieId]);

  const comeBackHandler = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {status === Status.PENDING && <Preloader />}

      {status === Status.RESOLVED && (
        <div>
          <Button
            onClick={comeBackHandler}
            color="primary"
            className={styles.btn}
            style={{
              backgroundColor: 'red',
              color: 'white',
              margin: '20px',
              display: 'flex',
              outline: 'none',
            }}
          >
            <ArrowBackIcon style={{ marginRight: '5px' }} />
            Сome back
          </Button>

          <MovieDetails movie={movie} url={url} location={location} />

          <Suspense fallback={<Preloader />}>
            <Route path={`${path}/cast`}>
              {status === Status.RESOLVED && <Cast />}
            </Route>

            <Route path={`${path}/reviews`}>
              {status === Status.RESOLVED && <Reviews />}
            </Route>
          </Suspense>
        </div>
      )}

      {status === Status.REJECTED && error && (
        <>
          <ErrorText text={error} />
          <p>Sorry, something went wrong :(</p>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
