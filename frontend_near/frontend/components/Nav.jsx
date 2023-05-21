import React from 'react'
import "/Nav.css"

export const Nav = () => {
    return (
        <nav className="navbar">
          <div className="navbar-container">
            <h1 className="navbar-logo">Your App</h1>
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="#" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Services</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Contact</a>
              </li>
            </ul>
          </div>
        </nav>
      );
}
