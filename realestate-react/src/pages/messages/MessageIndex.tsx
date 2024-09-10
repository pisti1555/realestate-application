import React, { useState, useEffect }from "react";
  import { Link, useSearchParams, useNavigate } from "react-router-dom";
  
  import { Message_Get } from "../../interface/MessagesInterface";
  
  import ErrorPage from "../../components/pages/error/Error";
  import Loading from "../../components/pages/loading/Loading";
  
  import api from "../../services/api";
  import { UserInterface_Get } from "../../interface/user/UserInterface";
  
  import '../../css/messages/MessageIndex.css';

  import { Mail, Send, Close } from "@mui/icons-material";
  
  const MessageIndex = ({ user } : { user:UserInterface_Get | null }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isSuccessBoxVisible, setIsSuccessBoxVisible] = useState<boolean>(searchParams.has('send-success'));
    const [receivedMessages, setReceivedMessages] = useState<Message_Get[]>([]);
    const [sentMessages, setSentMessages] = useState<Message_Get[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [received_sent_switch, setReceived_sent_switch] = useState<boolean>(true);
  
    useEffect(() => {
      api.get('/messages').then(
        (response) => {
          setReceivedMessages(response.data.data);
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

      api.get('/messages/sent').then(
        (response) => {
          setSentMessages(response.data.data);
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
    }, [received_sent_switch]);
  
    
  
    if (loading) {
      return (
        <Loading />
      );
    }

    if (!user) {
      navigate('/login');
      return (
        <ErrorPage errors={'You are not logged in'} />
      );
    }
  
    return (
      <div id="message-index-container">
        <div id="message-nav">
          <button id="received-messages" onClick={() => {setReceived_sent_switch(true)}}>
            <Mail />
            <p>Received</p>
          </button>
          <button id="sent-messages" onClick={() => {setReceived_sent_switch(false)}}>
            <Send />
            <p>Sent</p>
          </button>
        </div>
        
        {isSuccessBoxVisible && 
        <div id="msg-send-success-box">
          <h3 id="msg-send-success-box-success-msg">Message has been sent successfully</h3>
          <button id="msg-send-success-box-close-btn" onClick={() => {setIsSuccessBoxVisible(false)}}><Close /></button>
        </div>}
        {received_sent_switch ? (
          <div className="messages-list">
          {receivedMessages.length > 0 ? (
            receivedMessages.map((message) => (
              <Link to={'/messages/' + message.id} key={message.id} className="message-row">
                <div className="sender">
                  <h3 id="sender">{message.sender.name}</h3>
                </div>
                <div className="title">
                  <h1 id="title">{message.title}</h1>
                </div>
                <div className="time">
                  <h3 id="date">{new Date(message.time).toDateString()}</h3>
                  <h3 id="time">{new Date(message.time).toTimeString()}</h3>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-messages">
              <h1>Your inbox is empty</h1>
            </div>
          )}
          </div>
        ) : (
          <div className="messages-list">
            {sentMessages.length > 0 ? (
              sentMessages.map((message) => (
                <Link to={'/messages/' + message.id} key={message.id} className="message-row">
                  <div className="sender">
                    <p>sent to</p>
                    <h3 id="receiver">{message.receiver.name}</h3>
                  </div>
                  <div className="title">
                    <h1 id="title">{message.title}</h1>
                  </div>
                  <div className="time">
                    <h3 id="date">{new Date(message.time).toDateString()}</h3>
                    <h3 id="time">{new Date(message.time).toTimeString()}</h3>
                  </div>
                </Link>
              )
            )) : (
              <div className="no-messages">
                <h1>You have not sent any messages yet</h1>
              </div>
            )}
          </div>
        )}
        
      </div>
    );
  }
  
export default MessageIndex;