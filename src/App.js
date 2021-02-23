  
import React, { Component } from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';

import Header from 'components/Header/Header';
import Layout from 'components/Layout/Layout';
import Posts from 'containers/Posts/Posts';
import HomePage from 'containers/HomePage/HomePage';
import Todos from 'containers/Todo/Todo';
export class App extends Component {
  render() {
    return (
      <div>  
        <BrowserRouter>
            <Header />
            <Layout>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/posts" component={Posts}/>
              <Route exact path="/todos" component={Todos}/>
               
              {/*  <Route exact path="/posts">  
                     <Posts />
               </Route>
               < Route exact path="/todos">
                    <Todos />
                </Route>  
                <Route exact path="/">
                  <HomePage /> 
                </Route>*/}
                 
              
                
              </Layout>  
          </BrowserRouter>
      </div>
    )
  }
}

export default App;