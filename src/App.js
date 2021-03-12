import React, { Component } from "react";
import {BrowserRouter} from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';

import AppContextProvider from "Context/AppContextProvider";
import AppRoutes from "Routes/AppRoutes";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";

// import 'react-toastify/dist/ReactToastify.css';


export class App extends Component {
  
  render() {
    return (
      <div>
        <AppContextProvider >
          <BrowserRouter>
            <Header />
            <Layout>
              <AppRoutes/>
            </Layout>
          </BrowserRouter>
        </AppContextProvider>
        {/* <ToastContainer 
          position = "top-right"
          className = "app-toast"
        /> */}
      </div>
    );
  }
}

export default App;