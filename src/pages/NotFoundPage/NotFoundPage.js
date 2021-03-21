import Img404 from '../../images/404.jpg';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <>
      <h2 className={styles.title}> 404 Page not found :( </h2>
      <img className={styles.img} src={Img404} alt="404" width="500" />
    </>
  );
}

export default NotFoundPage;
