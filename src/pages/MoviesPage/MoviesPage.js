import { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

import { fetchMovies } from '../../services/tmdb-api';
import Status from '../../services/Status';
import StyledPagination from '../../services/styledPagination';
import ErrorText from '../../components/ErrorText';
import Searchbar from '../../components/Searchbar';
import MoviesList from '../../components/MoviesList';
import Preloader from '../../components/Preloader';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const classesPagination = StyledPagination();

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newQuery = new URLSearchParams(location.search).get('query');
    setQuery(newQuery, page);
  }, [location.search, page]);

  useEffect(() => {
    if (!query) return;
    const fetchQueryMovies = async () => {
      setStatus(Status.PENDING);
      try {
        const { results, total_pages } = await fetchMovies(query, page);
        if (results.length === 0) {
          setError(`Nothing was found for your query "${query}"`);
          setStatus(Status.REJECTED);
          return;
        }
        setMovies(results);
        setTotalPages(total_pages);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
      }
    };
    fetchQueryMovies();
  }, [query, page]);

  const searchHandler = newQuery => {
    if (query === newQuery) return;
    setQuery(newQuery);
    setMovies(null);
    setError(null);
    setStatus(Status.IDLE);
    history.push({ ...location, search: `query=${newQuery}&page=1` });
  };

  const pageHandler = (event, page) => {
    history.push({ ...location, search: `query=${query}&page=${page}` });
  };

  return (
    <>
      <Searchbar onSubmit={searchHandler} />
      {status === Status.PENDING && <Preloader />}

      {status === Status.RESOLVED && (
        <>
          <MoviesList movies={movies} url={url} location={location} />
          {totalPages > 1 && (
            <Pagination
              className={classesPagination.root}
              count={totalPages}
              onChange={pageHandler}
              page={Number(page)}
            />
          )}
        </>
      )}

      {status === Status.REJECTED && error && <ErrorText text={error} />}
    </>
  );
}

export default MoviesPage;
