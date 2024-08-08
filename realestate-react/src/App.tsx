import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Logout from './pages/auth/logout';
import Home from './pages/home';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        

        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;
