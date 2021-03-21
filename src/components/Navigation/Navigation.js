import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import HomeIcon from '@material-ui/icons/Home';
import VideocamIcon from '@material-ui/icons/Videocam';

const Navigation = () => (
  <nav className={styles.nav}>
    <NavLink
      exact
      to="/"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      <span className={styles.icon}>
        <HomeIcon />
      </span>
      Home
    </NavLink>

    <NavLink
      to="/movies"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      <span className={styles.icon}>
        <VideocamIcon />
      </span>
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
