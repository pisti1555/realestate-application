import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './services/api';
import user from './components/User';

import NavBar from './components/navbar/Navbar';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Logout from './pages/auth/Logout';

import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';

import Property_Index from './pages/properties/property_index';
import Property_Show from './pages/properties/property_show';
import Property_Create from './pages/properties/property_create';
import Property_Edit from './pages/properties/property_edit';

function App() {
  const [name, setName] = useState<string>('Guest');
  const [user, setUser] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
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

        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/user" element={<Profile />} />

        <Route path="/properties" element={<Property_Index />} />
        <Route path="/properties/:id" element={<Property_Show />} />
        <Route path="/properties/create" element={<Property_Create />} />
        <Route path="/properties/edit/:id" element={<Property_Edit />} />

      </Routes>
    </Router>
  );
}

export default App;
