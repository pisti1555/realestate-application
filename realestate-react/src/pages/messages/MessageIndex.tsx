import React, { useState }from "react";
  import { Link, useSearchParams } from "react-router-dom";
  
  import { Message_Get } from "../../interface/MessagesInterface";
  
  import ErrorPage from "../../components/pages/error/Error";

  import { UserInterface_Get } from "../../interface/user/UserInterface";
  
  import css from '../../css/messages/MessageIndex.module.css';

  import { Mail, Send, Close } from "@mui/icons-material";
  
  const MessageIndex = ({ user, receivedMessages, sentMessages } : { user:UserInterface_Get | null, receivedMessages:Message_Get[], sentMessages:Message_Get[] }) => {
    const [searchParams] = useSearchParams();
    const [isSuccessBoxVisible, setIsSuccessBoxVisible] = useState<boolean>(searchParams.has('send-success'));
    const [received_sent_switch, setReceived_sent_switch] = useState<boolean>(true);
  
    if (!user) {
      return <ErrorPage errors={'Please log in'} />
    }
  
    return (
      <div className={css.message_index_container}>
        <div className={css.message_nav}>
          <button className={css.received_messages} onClick={() => {setReceived_sent_switch(true)}}>
            <Mail />
            <p>Received</p>
          </button>
          <button className={css.sent_messages} onClick={() => {setReceived_sent_switch(false)}}>
            <Send />
            <p>Sent</p>
          </button>
        </div>
        
        {isSuccessBoxVisible && 
        <div className={css.msg_send_success_box}>
          <h3 className={css.msg_send_success_box_success_msg}>Message has been sent successfully</h3>
          <button className={css.msg_send_success_box_close_btn} onClick={() => {setIsSuccessBoxVisible(false)}}><Close /></button>
        </div>}
        {received_sent_switch ? (
          <div className={css.messages_list}>
          {receivedMessages.length > 0 ? (
            receivedMessages.map((message) => (
              <Link to={'/messages/' + message.id} key={message.id} className={css.message_row}>
                <div className={css.sender_container}>
                  {message.seen? (
                    <h3 className={css.sender_seen}>{message.sender.name}</h3>
                  ) : (
                    <h3 className={css.sender}>{message.sender.name}</h3>
                  )}
                </div>
                <div className={css.title_container}>
                  {message.seen? (
                    <h3 className={css.title_seen}>{message.title}</h3>
                  ) : (
                    <h3 className={css.title}>{message.title}</h3>
                  )}
                </div>
                {message.seen? (
                  <div className={css.time_container_seen}>
                    <h3 className={css.date_seen}>{new Date(message.time).toDateString()}</h3>
                    <h3 className={css.time_seen}>{new Date(message.time).toTimeString()}</h3>
                  </div>
                ) : (
                  <div className={css.time_container}>
                    <h3 className={css.date}>{new Date(message.time).toDateString()}</h3>
                    <h3 className={css.time}>{new Date(message.time).toTimeString()}</h3>
                  </div>
                )}

              </Link>
            ))
          ) : (
            <div className={css.no_messages}>
              <h1>Your inbox is empty</h1>
            </div>
          )}
          </div>
        ) : (
          <div className={css.messages_list}>
            {sentMessages.length > 0 ? (
              sentMessages.map((message) => (
                <Link to={'/messages/' + message.id} key={message.id} className={css.message_row}>
                  <div className={css.sender_container}>
                    <h3 className={css.receiver_seen}>{message.receiver.name}</h3>
                  </div>
                  <div className={css.title_container}>
                    <h1 className={css.title_seen}>{message.title}</h1>
                  </div>
                  <div className={css.time_container_seen}>
                    <h3 className={css.date_seen}>{new Date(message.time).toDateString()}</h3>
                    <h3 className={css.time_seen}>{new Date(message.time).toTimeString()}</h3>
                  </div>
                </Link>
              )
            )) : (
              <div className={css.no_messages}>
                <h1>You have not sent any messages yet</h1>
              </div>
            )}
          </div>
        )}
        
      </div>
    );
  }
  
export default MessageIndex;