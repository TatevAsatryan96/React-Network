import React, {useContext} from 'react';

import fbService from 'api/fbService';
import { AppContext } from 'Context/AppContext';
import {actionTypes} from 'Context/actionTypes';
import { useHistory } from 'react-router-dom';

import './Profile.scss';

const Profile = () => {
    const history = useHistory();
    const context = useContext(AppContext)

    const logoutHandler = async ()=>{
       await fbService.logout()
       localStorage.removeItem('user')
       context.dispatch({type:actionTypes.REMOVE_USER})
       history.push("/auth")
    }
    
    return (
        <div className = "app-profile">
           <button onClick = {logoutHandler}>Logout</button>
        </div>
    )
}

export default Profile;
