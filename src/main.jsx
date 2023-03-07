import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './index.css'
import { store } from "./store/index"
import { Provider } from 'react-redux';

import './assets/fonts/Mulish-Bold.ttf';
import './assets/fonts/Mulish-Light.ttf';
import './assets/fonts/Mulish-Regular.ttf';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
