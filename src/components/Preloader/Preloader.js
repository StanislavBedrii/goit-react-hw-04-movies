import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Preloader.module.css';

function Preloader() {
  return (
    <div className={styles.loaderContainer}>
      <Loader type="Puff" color="red" height={100} width={100} timeout={3000} />
    </div>
  );
}

export default Preloader;
