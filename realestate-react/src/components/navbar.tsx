import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';



const NavBar = () => {
    return (
        <nav className="nav-bar">
            <div className="nav-container">
                <Link to='/'>SuperMegaXRealEstateHyper</Link>
            </div>
            <div className="nav-container">
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                <Link to='/logout'>Logout</Link>
            </div>
        </nav>
    );
}

export default NavBar;