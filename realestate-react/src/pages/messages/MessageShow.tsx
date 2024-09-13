import React, { useState, useEffect }from "react";
import { Link, useParams } from "react-router-dom";

import { Message_Get } from "../../interface/MessagesInterface";

import ErrorPage from "../../components/pages/error/Error";
import Loading from "../../components/pages/loading/Loading";

import api from "../../services/api";

import css from '../../css/messages/MessageShow.module.css';

import { Reply, Person } from "@mui/icons-material";
import { UserInterface_Get } from "../../interface/UserInterface";

import person from '../../images/person.svg';

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
    <div className={css.message_show_container}>
      <div className={css.message}>
        {message.sender.id !== (user.id) && (
          <div className={css.button_container}>
            <Link to={'/profile/' + message.sender.id}>
              <Person />
              <p>View profile</p>
            </Link>
            <Link to={'/messages/send/' + message.sender.id}>
              <Reply />
              <p>Reply</p>
            </Link>
          </div>
        )}
        <div className={css.header}>
          <div className={css.image_container}>
            {message.sender.image === '' ? (
              <img src={person} alt={message.sender.name} />
            ) : (
              <img src={message.sender.image} alt={message.sender.name} />
            )}
          </div>
          <div className={css.msg_info}>
            <h1 className={css.sender}>{message.sender.name}</h1>
            <div className={css.time_container}>
              <h3 className={css.date}>{new Date(message.time).toDateString()}</h3>
              <h3 className={css.time}>{new Date(message.time).toTimeString()}</h3>
            </div>
          </div>
        </div>
        <div className={css.message_content}>
          <h1>{message.title}</h1>
          <p>{message.message}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageShow;