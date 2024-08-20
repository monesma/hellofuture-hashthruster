import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store";
import { HashConnectClient } from "./components/hashconnect/hashconnect-client";
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashConnectClient />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
