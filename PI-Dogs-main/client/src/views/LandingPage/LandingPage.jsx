import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import imageLandingPage from "../../images/imageLandingPage.jpg";

const LandingPage = () => {
  return (
    <div className={styles.divLanding}>
      <h1 className={styles.h1}>Welcome to the Furry Dogs application.</h1>
      <img className={styles.img} src={imageLandingPage} alt="dogs" />
      <p className={styles.p}>
        Discover a world of adorable dogs! Search breeds, explore their Details
        and even create your own custom dog breed. Whether you're a dog lover or
        looking for a specific furry friend, the Furry Dogs app has it all.
      </p>
      <div className={styles.divLink}>
        <Link to="/home">Explore Now</Link>
      </div>
    </div>
  );
};

export default LandingPage;
