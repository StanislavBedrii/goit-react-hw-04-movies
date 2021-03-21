import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchMovieCredits } from '../../../services/tmdb-api';
import Status from '../../../services/Status';
import Preloader from '../../../components/Preloader';

import styles from './Cast.module.css';
import defaultProfileImg from '../../../images/defaultProfile.jpg';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const { cast } = await fetchMovieCredits(movieId);
        if (cast.length === 0) {
          toast.warning('Sorry, no cast for this film was found');
          setStatus(Status.IDLE);
          return;
        }
        setCast(cast);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setCast([]);
        setStatus(Status.REJECTED);
      }
    };
    fetchActors();
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Preloader />}

      {status === Status.RESOLVED && (
        <ul className={styles.list}>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id} className={styles.item}>
              <img
                className={styles.profileImg}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : defaultProfileImg
                }
                alt="actor"
                height="200"
              />
              <p className={styles.name}>{name}</p>
              <p className={styles.character}>...{character || 'Unknown'}</p>
            </li>
          ))}
        </ul>
      )}

      {status === Status.REJECTED && error && (
        <p>Sorry, that something went wrong :(</p>
      )}
    </>
  );
};

export default Cast;
