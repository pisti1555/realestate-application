import React, { useState, FormEvent, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { sendMessage } from "../../services/message";
import { Message_Post } from "../../interface/MessagesInterface";
import { validateMessageSendForm } from "../../services/validateMessage";
import { UserInterface_Get } from "../../interface/user/UserInterface";
import ErrorPage from "../../components/pages/error/Error";
import '../../css/messages/MessageSend.css';

const MessageSend = ({ user } : { user:UserInterface_Get | null }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [valid, setValid] = useState<boolean>(true);
  const [submitError, setSubmitError] = useState<string>('');
  const [errors, setErrors] = useState<any>({
    receiver: '',
    title: '',
    message: '',
  });

  const [form, setForm] = useState<Message_Post>({
    receiver: Number(id) || 0,
    title: '',
    message: '',
  });

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validated = validateMessageSendForm(form);
    setErrors(validated);
    if (validated.receiver || validated.title || validated.message) {
      setValid(false);
      return;
    }

    sendMessage(form).then(
      (response) => {
        if (response.status === 200) { 
          setValid(true);
          navigate('/messages?send-success');
        } else {
          setValid(false);
          setSubmitError(response.message);
        }
      }
    ).catch((error) => {
      setValid(false);
      setSubmitError(error.message);
    });
  }

  if (!user) {
    return (
      <ErrorPage errors={'You are not logged in'} />
    );
  }

  return (
    <div className="message-send-page">
      <h1>Send a direct messsage</h1>
      {errors.receiver && <p className="error-text">errors.receiver</p>}
      <form action="#" onSubmit={handleSubmit} id="message-send-form">
        <div className="vertical-group">
          <label htmlFor="title-input">Title:</label>
          <input type="text" id='title-input' name="title" value={form.title} onChange={(e) => setForm({...form, title:e.target.value})} />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>
        <div className="vertical-group">
          <label htmlFor="message-input">Message content:</label>
          <textarea id='message-input' name="message" value={form.message} onChange={(e) => setForm({...form, message:e.target.value})}/>
          {errors.message && <p className="error-text">{errors.message}</p>}
        </div>
        {submitError && <p className='error-text'>{submitError}</p>}
        <div className="button-container">
          <Link to='/messages'>Cancel</Link>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default MessageSend;