import React,{useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import { AppContext } from 'Context/AppContext';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import fbService from 'api/fbService';
import signin from'assets/signin.png'
import "./SignIn.scss";

const SignIn = () => {

    const context =useContext(AppContext);
    const history = useHistory();

    const [credentials,setCredentials] = useState({
        email:"",
        password:"",
    })

    const changeHandler = (name,value)=>{
        setCredentials({
            ...credentials,
            [name]:value,
        })
    }

    const handleSignin = async ()=>{
      const user =  await fbService.signIn(credentials);
      context.dispatch({type:'SET_USER',payload:{user}});
      localStorage.setItem("user",JSON.stringify(user));
      history.push('/profile');
    }

    return (
        <div className = "app-signIn">
        
            <div className = "app-signIn__form">
              <div className='app-signin__img ' ><img scr={signin}></img></div>
                <h1>  Sign in</h1>
                <Input
                    value = {credentials.email}
                    onChange ={(e)=>changeHandler("email",e.target.value)}
                    placeholder = "Email Address"
                    className = "app-signIn__input"
                />
                <Input
                    value = {credentials.password}
                    onChange ={(e)=>changeHandler("password",e.target.value)}
                    placeholder = "Password"
                    type = "password"
                    className = "app-signIn__input"
                />
                <Button onClick = {handleSignin}>Submit</Button>
            </div>
        </div>
    )
}

export default SignIn;
