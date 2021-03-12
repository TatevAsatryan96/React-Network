import React from 'react';
import {Route, Switch} from "react-router-dom";

import Homepage from "containers/HomePage/HomePage";
import Posts from "containers/Posts/Posts";
import PostDetails from 'containers/PostDetails/PostDetalis';
import Todos from "containers/PostDetails/PostDetalis";
import Auth from 'containers/Auth/Auth';

const AppRoutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path = "/" component = {Homepage} />
                <Route exact path = "/posts" component = {Posts} />
                <Route exact path = "/posts/:postId" component = {PostDetails} />
                <Route exact path = "/todos" component = {Todos} />
                <Route exact path = "/auth" component = {Auth} />
   
            </Switch> 
        </div>
    )
}

export default AppRoutes;
