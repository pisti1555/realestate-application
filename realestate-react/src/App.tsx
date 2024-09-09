import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './services/api';

import { UserInterface_Get } from './interface/user/UserInterface';

import NavBar from './components/navbar/Navbar';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Logout from './components/pages/logout/Logout';

import Home from './pages/Home';
import UserPage from './pages/User';
import ProfilePage from './pages/Profile';

import Property_Index from './pages/properties/PropertyIndex';
import Property_Show from './pages/properties/PropertyShow';
import Property_Create from './pages/properties/PropertyCreate';
import Property_Edit from './pages/properties/PropertyEdit';
import Property_Search from './pages/properties/PropertySearch';

import MessageShow from './pages/messages/MessageShow';
import MessageIndex from './pages/messages/MessageIndex';
import MessageSend from './pages/messages/MessageSend';


function App() {
  const [user, setUser] = useState<UserInterface_Get | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!localStorage.getItem('token')) return;
      try {
        const response = await api.get('/user');
        if (response.status === 200) {
          setUser(response.data.data);
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
        <Route path="/user" element={<UserPage user={user} />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        <Route path="/properties" element={<Property_Index />} />
        <Route path="/properties/:id" element={<Property_Show />} />
        <Route path="/properties/create" element={<Property_Create />} />
        <Route path="/properties/edit/:id" element={<Property_Edit />} />
        <Route path="/search" element={<Property_Search />} />
        <Route path="/search/:params" element={<Property_Search />} />

        <Route path="/messages" element={<MessageIndex />} />
        <Route path="/messages/:id" element={<MessageShow />} />
        <Route path="/messages/send/:id" element={<MessageSend />} />

      </Routes>
    </Router>
  );
}

export default App;
