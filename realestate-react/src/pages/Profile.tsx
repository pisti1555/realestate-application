import React, { useState, useEffect, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import css from '../css/Profile.module.css';
import Loading from "../components/pages/loading/Loading";
import ErrorPage from "../components/pages/error/Error";
import { Phone, Email, Close } from "@mui/icons-material";
import person from '../images/person.svg';
import { UserInterface_Get } from "../interface/UserInterface";
import { Message_Post } from "../interface/MessagesInterface";
import { validateMessageSendForm } from "../services/validateMessage";
import { sendMessage } from "../services/message";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [newMsg, setNewMsg] = useState<boolean>(false);
  const [msgForm, setMsgForm] = useState<Message_Post>({
    receiver: -1,
    title: '',
    message: '',
  });
  const [errors, setErrors] = useState<{
    receiver: string,
    title: string,
    message: string
  }>({
    receiver: '',
    title: '',
    message: '',
  });
  const [submitError, setSubmitError] = useState<string>('');
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);

  const sendMsg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validated = validateMessageSendForm(msgForm);
    setErrors(validated);
    if (validated.receiver || validated.title || validated.message) {
      return;
    }
    sendMessage(msgForm)
    .then((response) => {
      if (response.status === 200) {
        setNewMsg(false);
        setSendSuccess(true);
      } else {
        setSubmitError(response.message);
      }
    })
    .catch((error) => {
      setSubmitError(error.message);
    });
  };
    
  useEffect(() => {
    const getUser = async () => {
      api.get('/profile/' + id).then(
        (response) => {
          setUser(response.data.data);
        }
      ).catch(
        (e) => {
          setError("Failed to load profile")
        }
      ).finally(
        () => {
          setLoading(false);
        }
      )
    };

    getUser();
  }, [id]);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (user.id === -1) {
    return (
      <ErrorPage errors={"No user found on this link"} />
    );
  }

  if (error) {
    return (
      <ErrorPage errors={error} />
    );
  }

  if (user.role === 1) {
    return (
      <div className={css.profile_container}>
        {sendSuccess && (
          <div className={css.msg_send_success_box}>
            <h3 className={css.msg_send_success_box_success_msg}>
              Message has been sent successfully
            </h3>
            <button
              className={css.msg_send_success_box_close_btn}
              onClick={() => {
                setSendSuccess(false);
              }}
            >
              <Close />
            </button>
          </div>
        )}
        {newMsg && (
          <div className={css.create_message_container}>
            <button
              className={css.button_close}
              onClick={() => setNewMsg(false)}
            >
              <Close />
            </button>
            <form onSubmit={sendMsg} className={css.create_message_form}>
              <div className={css.group_vertical}>
                <input disabled hidden type="text" id="receiver-input" value={user.id} />
              </div>
              <div className={css.group_vertical}>
                <label htmlFor="title-input">Title:</label>
                <input type="text" id="title-input" onChange={(e) => setMsgForm({...msgForm, title: e.target.value})} />
              </div>
              <div className={css.group_vertical}>
                <label htmlFor="message-content-input">Message content:</label>
                <textarea
                  name="message-content-input"
                  id="message-content-input"
                  onChange={(e) => setMsgForm({...msgForm, message: e.target.value})} 
                />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        )}

        <div className={css.button_container}>
          <Link to={'/messages/send/' + id} className={css.profile_button}>Send a message</Link>
        </div>
        <div className={css.header}>
          <div className={css.personal_data_container}>
            <div className={css.image_container}>
              {!user.image ? (
                <img src={person} alt={user.name} />
              ) : (
                <img src={user.image} alt={user.name} />
              )}
            </div>
          </div>

          <div className={css.info}>
            {user.name? (
              <h1>{user.name.toUpperCase()}</h1>
            ) : (
              <h1>Unknown user</h1>
            )}
            <div className={css.personal_data}>
              <div className={css.info_row}>
                <h3>Email:</h3>
                <p>{user.email}</p>
              </div>
              <div className={css.info_row}>
                <h3>Phone:</h3>
                <p>{user.phone}</p>
              </div>
              <div className={css.info_row}>
                <h3>Date of birth:</h3>
                <p>{user.birth_date}</p>
              </div>
              <div className={css.info_row}>
                <h3>Tax number:</h3>
                <p>{user.tax_number}</p>
              </div>
              <div className={css.info_row}>
                <h3>Location:</h3>
                <div className={css.info_address}>
                  <p>{user.postal_code},</p>
                  <p>{user.city},</p>
                  <p>{user.country}</p>
                </div>
              </div>
            </div>
            </div>
        </div>
        {user.description && (
          <div className={css.description_container}>
            <h3>About me:</h3>
            <p className={css.description}>{user.description}</p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <ErrorPage errors={"Cannot see this profile"} />
    );
  }
}

export default ProfilePage;