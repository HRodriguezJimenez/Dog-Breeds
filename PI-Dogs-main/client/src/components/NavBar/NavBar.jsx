import { Link } from "react-router-dom";

import style from "./navbar.module.css";

const NavBar = () => {
  return (
    <div className={style.divContainer}>
      <Link to="/home">HOME</Link>
      <Link to="/create">CREATE</Link>
    </div>
  );
};

export default NavBar;
