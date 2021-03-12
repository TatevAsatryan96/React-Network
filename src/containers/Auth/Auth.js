import React,{useState}  from "react";

// import { AppContext } from "Context/AppContext";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

import "./Auth.scss";

    const Auth=()=>{
        const[isSignIn,setSignIn]=useState(true);

    const toggleView=()=>{
        setSignIn(!isSignIn);
    }
    return (
        <div className = "app-auth">
        

                { 
                    isSignIn ? (
                        <SignIn />
                    ) :
                        <SignUp/>}
                       <span onClick={toggleView}>{isSignIn?'Go to Signup':'Go to SignIn'}</span>
                    </div> 
  
    )
                    }            

export default Auth;

//{isSignIn ? "SignIn" : "SignUp"}
//<h1>{isSignIn ? "SignIn" : "SignUp"}</h1>
//<button className = "app-auth-buttons__button" onClick = {toggleView}>SignUp</button>