import React , {useContext} from "react";
import {withRouter} from "react-router-dom";

import Link from "components/Link/Link";
import { AppContext } from "Context/AppContext";

import "./Header.scss";

const headerNavLinks = [
  {
    title:"Homepage",
    to:"/"
  },
  {
    title:"Posts",
    to:"/posts"
  },
  {
    title:"Todos",
    to:"/todos"
  }
]



const Header = ()=>{
  const context = useContext(AppContext);

  return (
    <div className="app-header">
        <nav>
          <ul className = "app-header__ul">
            {
              headerNavLinks.map(el => {
                return(
                  <li key = {el.title}><Link to = {el.to}>{el.title}</Link></li>
                )
              })
            }
            {
              !context.user ? (
                <li key = 'auth'><Link to = '/auth'>Authentication</Link></li>
              ) : (
                <li key = 'profile'><Link to = '/profile'>Profile</Link></li>
              )
            }
          </ul>
        </nav>
      </div>
  )
}

export default  withRouter (Header);


