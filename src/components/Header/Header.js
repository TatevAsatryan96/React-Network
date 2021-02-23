import React from 'react'
import{Link} from 'react-router-dom';

import './Header.scss';

const Header = () => {
    return (
        <div className="app-header">
            <nav>
                <ul>
                    <li><Link to="/">Hompage</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/todos">Todos</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header