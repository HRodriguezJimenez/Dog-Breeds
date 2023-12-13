import {Route, useLocation} from "react-router-dom";
import {Detail, Form, Home, LandingPage} from "./views/index";
import NavBar from "./components/NavBar/NavBar";

import './App.css';


function App() {

  const location = useLocation(); // Nos permite acceder al objeto de la unbicación que contiene información sobre la URL actual.

  return (
    <div className="App">
        {location.pathname !== "/" && <NavBar />}           
        <Route exact path="/" component={ LandingPage } />
        <Route exact path="/home" component={ Home } />
        <Route path="/home/:id" component={ Detail } />
        <Route path="/create" component={ Form } />
      
    </div>
  );
}

export default App;
