import axios from 'axios'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import store from './redux/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.withCredentials = true;
root.render(
  <Provider store = {store}>
    {/* <React.StrictMode> */}
        <App />
    {/* </React.StrictMode> */}
  </Provider>
);

