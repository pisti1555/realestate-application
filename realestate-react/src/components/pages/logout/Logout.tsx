import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth';
import './Logout.css';

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
    <div className="logout-screen">
      <div className="loader">
        <span className="loader-text">Logging out</span>
        <span className="load"></span>
      </div>
    </div>
  );
}

export default Logout;