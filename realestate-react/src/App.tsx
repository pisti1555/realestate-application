import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './services/api';

import { UserInterface_Get } from './interface/UserInterface';

import NavBar from './components/navbar/Navbar';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Logout from './components/pages/logout/Logout';

import Index from './pages/Index';
import UserPage from './pages/User';
import ProfilePage from './pages/Profile';

import PropertyIndex from './pages/properties/PropertyIndex';
import PropertyShow from './pages/properties/PropertyShow';
import PropertyCreate from './pages/properties/PropertyCreate';
import PropertyEdit from './pages/properties/PropertyEdit';
import PropertySearch from './pages/properties/PropertySearch';

import MessagePage from './pages/messages/Messages';

import Loading from './components/pages/loading/Loading';


function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface_Get>({
    id: -1,
    image: undefined,
    name: undefined,
    email: undefined,
    phone: undefined,
    joined: undefined,
    role: undefined,
    description: undefined,
    birth_date: undefined,
    tax_number: undefined,
    sex: undefined,
    country: undefined,
    city: undefined,
    postal_code: undefined,
    new_msg_count: 0
  });

  useEffect(() => {
    const init = async () => {
      if (!localStorage.getItem('token')) return;
      
      setLoading(true);
      api.get('/user').then((response) => {
        if (response.status === 200) {
          setUser(response.data.data);
        } else {
          setUser({
            id: -1,
            image: undefined,
            name: undefined,
            email: undefined,
            phone: undefined,
            joined: undefined,
            role: undefined,
            description: undefined,
            birth_date: undefined,
            tax_number: undefined,
            sex: undefined,
            country: undefined,
            city: undefined,
            postal_code: undefined,
            new_msg_count: 0
          });
        }
      }).catch((error:any) => {
        setUser({
          id: -1,
          image: undefined,
          name: undefined,
          email: undefined,
          phone: undefined,
          joined: undefined,
          role: undefined,
          description: undefined,
          birth_date: undefined,
          tax_number: undefined,
          sex: undefined,
          country: undefined,
          city: undefined,
          postal_code: undefined,
          new_msg_count: 0
        });
      }).finally(() => {
        setLoading(false);
      });;
    };

    init();
  }, []);

  if (loading) {
    return(
      <Loading />
    );
  }


  return (
    <Router>
      <NavBar user={user} />

      <Routes>

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/logout" element={<Logout setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route path="/" element={<Index user={user} />} />
        <Route path="/user" element={<UserPage user={user} />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        <Route path="/properties" element={<PropertyIndex />} />
        <Route path="/properties/:id" element={<PropertyShow user={user} />} />
        <Route path="/properties/create" element={<PropertyCreate user={user} />} />
        <Route path="/properties/edit/:id" element={<PropertyEdit />} />
        <Route path="/search" element={<PropertySearch />} />
        <Route path="/search/:params" element={<PropertySearch />} />

        <Route path="/messages" element={<MessagePage user={user} />} />

      </Routes>
    </Router>
  );
}

export default App;
