import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Logout from './pages/auth/logout';

import Home from './pages/home';
import Profile from './pages/profile';
import Welcome from './pages/welcome';

import Property_Index from './pages/properties/property_index';
import Property_Show from './pages/properties/property_show';
import Property_Create from './pages/properties/property_create';
import Property_Edit from './pages/properties/property_edit';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

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
