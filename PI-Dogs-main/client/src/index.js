import React from 'react';
import ReactDOM from 'react-dom'; // Este modulo nos proporciona métodos para interactuar con el DOM.
import {BrowserRouter} from "react-router-dom"; // Nos ayuda con el enrutamiento de la navegación en una SPA.
import { Provider } from "react-redux"; // Permite que todos los componentes tengan acceso al state de redux.
import './index.css';
import App from './App';
import store from "./redux/store"
import reportWebVitals from './reportWebVitals'; // Esta función se utiliza para medir y registrar el rendimiento de la aplicación.

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // Iniciamos la medición del rendimiento de la app.
