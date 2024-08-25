import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './services/api';
import NavBar from './components/navbar/Navbar';

import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Logout from './pages/auth/logout';

import Home from './pages/home';
import Welcome from './pages/welcome';
import Profile from './pages/profile';

import Property_Index from './pages/properties/property_index';
import Property_Show from './pages/properties/property_show';
import Property_Create from './pages/properties/property_create';
import Property_Edit from './pages/properties/property_edit';
import Property_Search from './pages/properties/search_property';


function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!localStorage.getItem('token')) return;
      try {
        const response = await api.get('/user');
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error: any) {
        setUser(null);
      }
    };

    getUser();
  }, []);


  return (
    <Router>
      <NavBar user={user} />

      <Routes>

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/logout" element={<Logout setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route path="/" element={<Home user={user} />} />
        <Route path="/user" element={<Profile />} />

        <Route path="/properties" element={<Property_Index />} />
        <Route path="/properties/:id" element={<Property_Show />} />
        <Route path="/properties/create" element={<Property_Create />} />
        <Route path="/properties/edit/:id" element={<Property_Edit />} />
        <Route path="/search" element={<Property_Search />} />
        <Route path="/search/:params" element={<Property_Search />} />

      </Routes>
    </Router>
  );
}

export default App;
