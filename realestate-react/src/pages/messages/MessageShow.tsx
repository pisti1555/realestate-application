import React, { useState, useEffect }from "react";
import { Link, useParams } from "react-router-dom";

import { Message_Get } from "../../interface/MessagesInterface";

import ErrorPage from "../../components/pages/error/Error";
import Loading from "../../components/pages/loading/Loading";

import api from "../../services/api";

import '../../css/messages/MessageShow.css';

import { Reply } from "@mui/icons-material";
import { UserInterface_Get } from "../../interface/user/UserInterface";

const MessageShow = ({ user } : { user:UserInterface_Get | null }) => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<Message_Get | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get('/messages/' + id).then(
      (response) => {
        setMessage(response.data.data);
      }
    ).catch(
      (e) => {
        console.log('log errors:', e);
        return (
          <ErrorPage errors={e} />
        );
      }
    ).finally(
      () => {
        setLoading(false);
      }
    );
  }, [id]);



  if (loading) {
    return (
      <Loading />
    );
  }

  if (!user) {
    return (
      <ErrorPage errors={'You are not logged in'} />
    );
  }

  if (!message) {
    return (
      <ErrorPage errors={"Something went wrong"} />
    );
  }

  return (
    <div id="message-show-container">
      <div className="message">
        {message.sender.id !== (user.id) && (
          <div className="button-container">
            <Link to={'/messages/send/' + message.sender.id}>
              <Reply />
              <p>Reply</p>
            </Link>
          </div>
        )}
        <div className="header">
          <div className="image-container">
            <img src={message.sender.image} alt={message.sender.name} />
          </div>
          <div className="msg-info">
            <h1 id="sender">{message.sender.name}</h1>
            <div className="time">
              <h3 id="date">{new Date(message.time).toDateString()}</h3>
              <h3 id="time">{new Date(message.time).toTimeString()}</h3>
            </div>
          </div>
        </div>
        <div id="message-content">
          <h1>{message.title}</h1>
          <p>{message.message}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageShow;