import React from 'react'
import { Link } from 'react-router-dom'
import '../stylesheet.css'

const Header = () => {
  return (
    <>
    <nav className="navbar nav">
        <div className='container-fluid'>
            <Link className="navbar-brand nav-title" to="/">
                <img src=".\logo192.png"
                width="20" height="20" className="d-inline-block mr-1" alt="img"/>
                Connect World
            </Link>
            <div className="nav-details">
                <ul className='nav-details'>
                    <li>
                        <Link className="nav-details" to="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className='nav-details' to="/contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Header

