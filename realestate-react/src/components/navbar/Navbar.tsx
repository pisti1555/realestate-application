import React from "react";
import { UserInterface_Get } from "../../interface/user/UserInterface";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../navbar/Navbar.css';
import { Menu, Home, Person, Search, Login, Logout } from "@mui/icons-material";

const NavBar = ({ user }: { user:UserInterface_Get | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={isOpen ? "navbar" : "navbar-closed"}>
      <button className="menu-button" onClick={() => {setIsOpen(!isOpen)}}>
        <Menu />
      </button>
      <Link to='/' className="option" onClick={() => { setIsOpen(false) }}>
        <Home />
        <p>Home</p>
      </Link>
      <Link to='/search' className="option" onClick={() => { setIsOpen(false) }}>
        <Search />
        <p>Search</p>
      </Link>
      {
        user ? (
            <>
                <Link to='/user' className="option" onClick={() => { setIsOpen(false) }}>
                  <Person />
                  <p>View profile</p>
                </Link>
                <Link to='/logout' className="option" onClick={() => { setIsOpen(false) }}>
                  <Logout />
                  <p>Logout</p>
                </Link>
            </>
        ) : (
            <>
                <Link to='/login' className="option" onClick={() => { setIsOpen(false) }}>
                  <Login />
                  <p>Login</p>
                </Link>
            </>
        )
      } 
    </div>
  );
};

export default NavBar;