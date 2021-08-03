import React from 'react'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer } from 'react-toastify';
import './index.css'
import { Provider } from "react-redux";
import store from './store';
import AppRouter from './AppRouter';
export const hashHistory = createBrowserHistory();



function App() {
  //jsx----------------------------
  return (
    <>
      <Provider store={store}>
        <Router history={hashHistory}> 
          <AppRouter />
          <ToastContainer />
        </Router>
      </Provider>
    </>
  )
}

export default App

