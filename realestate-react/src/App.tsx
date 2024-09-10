import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './services/api';

import { UserInterface_Get } from './interface/user/UserInterface';

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

import MessageShow from './pages/messages/MessageShow';
import MessageIndex from './pages/messages/MessageIndex';
import MessageSend from './pages/messages/MessageSend';

import Loading from './components/pages/loading/Loading';
import { Message_Get } from './interface/MessagesInterface';


function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface_Get | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<Message_Get[]>([]);
  const [sentMessages, setSentMessages] = useState<Message_Get[]>([]);

  useEffect(() => {
    const init = async () => {
      if (!localStorage.getItem('token')) return;
      
      setLoading(true);
      api.get('/user').then((response) => {
        if (response.status === 200) {
          setUser(response.data.data);
          console.log(response.data.data);
          
        } else {
          setUser(null);
        }
      }).catch((error:any) => {
        setUser(null);
      });

      api.get('/messages').then((response) => {
        if (response.status === 200) {
          setReceivedMessages(response.data.data);
        } else {
          setReceivedMessages([]);
        }
      }).catch((error) => {
        console.log(error);
      });

      api.get('/messages/sent').then((response) => {
        if (response.status === 200) {
          setSentMessages(response.data.data);
        } else {
          setSentMessages([]);
        }
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoading(false);
      });
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
        <Route path="/properties/:id" element={<PropertyShow />} />
        <Route path="/properties/create" element={<PropertyCreate />} />
        <Route path="/properties/edit/:id" element={<PropertyEdit />} />
        <Route path="/search" element={<PropertySearch />} />
        <Route path="/search/:params" element={<PropertySearch />} />

        <Route path="/messages" element={<MessageIndex user={user} receivedMessages={receivedMessages} sentMessages={sentMessages} />} />
        <Route path="/messages/:id" element={<MessageShow user={user} />} />
        <Route path="/messages/send/:id" element={<MessageSend user={user} />} />

      </Routes>
    </Router>
  );
}

export default App;
