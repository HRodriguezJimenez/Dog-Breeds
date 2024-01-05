import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import imageLandingPage from "../../images/imageLandingPage.jpg";

const LandingPage = () => {
  return (
    <div className={styles.divLanding}>
      <h1 className={styles.h1}>Bienvenido a la aplicación Perros Peludos.</h1>
      <img className={styles.img} src={imageLandingPage} alt="dogs" />
      <p className={styles.p}>
        ¡Descubre un mundo de perros adorables! Busque razas, explore sus
        detalles e incluso crea tu propia raza de perro personalizada. Si eres
        un amante de los perros o si buscas un amigo peludo específico, la
        aplicación Perros Peludos lo tiene todo.
      </p>
      <div className={styles.divLink}>
        <Link to="/home">Explora ahora</Link>
      </div>
    </div>
  );
};

export default LandingPage;
