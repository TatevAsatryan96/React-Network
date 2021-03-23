import React from 'react';
import {Route, Switch} from "react-router-dom";

import Homepage from "containers/HomePage/HomePage";
import Posts from "containers/Posts/Posts";
import PostDetails from 'containers/PostDetails/PostDetalis';
import Todos from "containers/Todo/Todo";
import Auth from 'containers/Auth/Auth';
import Profile from 'containers/Profile/Profile';
import Error from 'components/Errors/Error';

const AppRoutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path = "/" component = {Homepage} />
                <Route exact path = "/posts" component = {Posts} />
                <Route exact path = "/posts/:postId" component = {PostDetails} />
                <Route exact path = "/todos" component = {Todos} />
                <Route exact path = "/auth" component = {Auth} />
                <Route exact path = "/profile" component = {Profile} />
                <Route path = "*" component = {Error} />
            </Switch> 
        </div>
    )
}

export default AppRoutes;
