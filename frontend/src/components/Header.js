import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <Menu />
        </header>
    )
}

const Menu = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <div className="container">
            <Link to='/' className='navbar-brand'>Home</Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to='/' className='nav-link'>Users</Link>
                    <Link to='/projects' className='nav-link'>Projects</Link>
                    <Link to='/todo' className='nav-link'>Todo</Link>
                    <Link to='/login' className='nav-link'>Login</Link>
                </div>
            </div>
          </div>
        </nav>
    )
}

export default Header