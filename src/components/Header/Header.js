import React , {useContext} from "react";
import {withRouter} from "react-router-dom";

import Link from "components/Link/Link";
import { AppContext } from "Context/AppContext";

import "./Header.scss";

const headerLinks = [
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
  },
  {
    title:"Auth",
    to:"/auth"
  }
]



const Header = ()=>{
  const context = useContext(AppContext);

  return (
    <div className="app-header">
        <nav>
          <ul className = "app-header__ul">
            {
              headerLinks.map(el => {
                return(
                  <li key = {el.title}><Link to = {el.to}>{el.title}</Link></li>
                )
              })
            }
          
          </ul>
        </nav>
      </div>
  )
}

export default  withRouter (Header);


