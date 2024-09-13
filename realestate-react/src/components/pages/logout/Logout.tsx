import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth';
import logout_page from './Logout.module.css';

const Logout = ({ setUser }: { setUser: (user: any) => void }) => {
  const navigate = useNavigate();

  useEffect(() => {
      const logOut = async () => {
          try {
              await logout();
              setUser(null);
              navigate('/login');
          } catch (error:any) {
              navigate('/login');
          }
      };

      logOut();
  });

  return (
    /* From Uiverse.io by alexruix */ 
    <div className={logout_page.logout_screen}>
      <div className={logout_page.loader}>
        <span className={logout_page.loader_text}>Logging out</span>
        <span className={logout_page.load}></span>
      </div>
    </div>
  );
}

export default Logout;