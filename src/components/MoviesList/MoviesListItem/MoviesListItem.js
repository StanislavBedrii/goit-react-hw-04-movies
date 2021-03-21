import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import styles from './MoviesListItem.module.css';
import defaultPosterImg from '../../../images/defaultPoster.jpg';

const makeSlug = string => slugify(string, { lower: true });

const MoviesListItem = ({ id, poster_path, title, url, vote_average }) => (
  <li className={styles.listItem}>
    <Link
      to={{ pathname: `${url}/${makeSlug(`${title}-${id}`)}` }}
      className={styles.link}
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : defaultPosterImg
        }
        alt={title}
        className={styles.poster}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.vote}>{vote_average}</p>
    </Link>
  </li>
);

MoviesListItem.propTypes = {
  id: PropTypes.number.isRequired,
  poster: PropTypes.string,
  title: PropTypes.string,
  vote_average: PropTypes.number,
};

export default MoviesListItem;
