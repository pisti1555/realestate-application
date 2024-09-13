import React from "react";
import { UserInterface_Get } from "../../interface/user/UserInterface";
import { useState } from "react";
import { Link } from "react-router-dom";
import navbar from '../../components/navbar/Navbar.module.css';
import { Menu, Home, Person, Message, Search, Login, Logout } from "@mui/icons-material";

const NavBar = ({ user }: { user:UserInterface_Get | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={isOpen ? navbar.navbar : navbar.navbar_closed}>
      <button className={navbar.menu_button} onClick={() => {setIsOpen(!isOpen)}}>
        <Menu />
      </button>
      <Link to='/' className={navbar.option} onClick={() => { setIsOpen(false) }}>
        <Home />
        <p>Home</p>
      </Link>
      <Link to='/search' className={navbar.option} onClick={() => { setIsOpen(false) }}>
        <Search />
        <p>Search</p>
      </Link>
      {
        user ? (
            <>
                <Link to='/user' className={navbar.option} onClick={() => { setIsOpen(false) }}>
                  <Person />
                  <p>View profile</p>
                </Link>
                <Link to='/messages' className={navbar.option} onClick={() => { setIsOpen(false) }}>
                  <Message />
                  {user.new_msg_count > 0 && (
                    <span className={navbar.msg_count}>{user.new_msg_count}</span>
                  )}
                  <p>Messages</p>
                </Link>
                <Link to='/logout' className={navbar.option} onClick={() => { setIsOpen(false) }}>
                  <Logout />
                  <p>Logout</p>
                </Link>
            </>
        ) : (
            <>
                <Link to='/login' className={navbar.option} onClick={() => { setIsOpen(false) }}>
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