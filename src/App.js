import React, { Component } from "react";
import {BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {Provider} from 'react-redux';

import AppContextProvider from "Context/AppContextProvider";
import AppRoutes from "Routes/AppRoutes";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";

import 'react-toastify/dist/ReactToastify.css';
import {store} from "reducers/store";


export class App extends Component {
  
  render() {
    return (
      <div>
        <Provider store = {store}>
        <AppContextProvider >
          <BrowserRouter>
            <Header />
            <Layout>
              <AppRoutes/>
            </Layout>
          </BrowserRouter>
        </AppContextProvider>
        </Provider>
        <ToastContainer 
          position = "top-right"
          className = "app-toast"
        />
      </div>
    );
  }
}
export default App;