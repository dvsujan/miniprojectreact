import React from 'react'
import './navbar.css'

const NavBar = () => {
  return (
    // Navbar
    <nav>
        {/* navbar logo */}
        <h1 className='nav-logo'>
            TicTacToe
        </h1>
        {/* navbar links */}
        <div className='nav-links'>
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/2pgame'>PVP</a></li>
                <li><a href='/aigame'>Player vs AI</a></li>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar