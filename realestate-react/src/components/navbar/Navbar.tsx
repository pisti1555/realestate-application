import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../navbar/Navbar.css';
import { Menu, Home, Person, Search, Login, Logout } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const NavBar = ({ user }: { user:any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={isOpen ? "navbar" : "navbar-closed"}>
      <button className="menu-button" onClick={() => {setIsOpen(!isOpen)}}>
        <Menu sx={{ color: grey[300] }}></Menu>
      </button>
      <Link to='/' className="option" onClick={() => { setIsOpen(false) }}>
        <Home sx={{ color: grey[300] }}></Home>
        <p>Home</p>
      </Link>
      <Link to='/search' className="option" onClick={() => { setIsOpen(false) }}>
        <Search sx={{ color: grey[300] }}></Search>
        <p>Search</p>
      </Link>
      {
        user ? (
            <>
                <Link to='/user' className="option" onClick={() => { setIsOpen(false) }}>
                  <Person sx={{ color: grey[300] }}></Person>
                  <p>View profile</p>
                </Link>
                <Link to='/logout' className="option" onClick={() => { setIsOpen(false) }}>
                  <Logout sx={{ color: grey[300] }}></Logout>
                  <p>Logout</p>
                </Link>
            </>
        ) : (
            <>
                <Link to='/login' className="option" onClick={() => { setIsOpen(false) }}>
                  <Login sx={{ color: grey[300] }}></Login>
                  <p>Login</p>
                </Link>
            </>
        )
      } 
    </div>
  );
};

export default NavBar;