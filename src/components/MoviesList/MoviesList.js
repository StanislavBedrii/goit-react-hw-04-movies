import MoviesListItem from './MoviesListItem';
import PropTypes from 'prop-types';

import styles from './MoviesList.module.css';

const MoviesList = ({ movies, url }) => {
  return (
    <ul className={styles.list}>
      {movies.map(({ id, poster_path, title, vote_average }) => (
        <MoviesListItem
          key={id}
          poster_path={poster_path}
          title={title}
          id={id}
          url={url}
          vote_average={vote_average}
        />
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesList;
