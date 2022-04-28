import React from 'react'

const Header = () => {
    return (
        <header>
            <Menu />
        </header>
    )
}

const Menu = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <a href='/' className="navbar-brand">Home</a>
          </div>
        </nav>
    )
}

export default Header