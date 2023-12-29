import { Link } from "react-router-dom";

import styles from "./navbar.module.css";

const NavBar = () => {
  return (
    <div>
      <div className={styles.navBackground}></div>
      <div className={styles.divContainer}>
        <Link to="/home">HOME</Link>
        <Link to="/create">CREATE</Link>
      </div>
    </div>
  );
};

export default NavBar;
