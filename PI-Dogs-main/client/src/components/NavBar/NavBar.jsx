import { Link } from "react-router-dom";

import styles from "./navbar.module.css";

const NavBar = () => {
  return (
    <div>
      <div className={styles.divContainer}>
        <Link to="/home">INICIO</Link>
        <Link to="/create">CREAR</Link>
      </div>
    </div>
  );
};

export default NavBar;
