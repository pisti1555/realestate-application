import React, { useState, useEffect, FormEvent } from "react";

import { Message_Get, Message_Post_by_Email } from "../../interface/MessagesInterface";
import {
  getReceivedMessages,
  getSentMessages,
  openMessage,
} from "../../services/message";

import ErrorPage from "../../components/pages/error/Error";

import { UserInterface_Get } from "../../interface/UserInterface";
import { Message_Post } from "../../interface/MessagesInterface";
import { validateMessageSendForm, validateEmailMessageSendForm } from "../../services/validateMessage";
import { sendMessage, sendMessage_byEmail } from "../../services/message";

import messagelist from "../../css/messages/MessageIndex.module.css";
import messageshow from "../../css/messages/MessageShow.module.css";
import messagesend from "../../css/messages/MessageSend.module.css";

import { Mail, Send, Close, Add, Reply, Refresh } from "@mui/icons-material";
import Loading from "../../components/pages/loading/Loading";
import person from "../../images/person.svg";

const MessagePage = ({ user }: { user: UserInterface_Get }) => {
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  const [receivedMessages, setReceivedMessages] = useState<Message_Get[]>([]);
  const [sentMessages, setSentMessages] = useState<Message_Get[]>([]);
  const [received_sent_switch, setReceived_sent_switch] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message_Get | null>(null);
  const [reply, setReply] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [newMsg, setNewMsg] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({
    receiver: "",
    title: "",
    message: "",
  });
  const [form, setForm] = useState<Message_Post>({
    receiver: -1,
    title: "",
    message: "",
  });
  const [newMsgForm, setNewMsgForm] = useState<Message_Post_by_Email>({
    receiver: "",
    title: "",
    message: "",
  });

  const getMessages = async () => {
    try {
      const received_msg_response = await getReceivedMessages();
      const sent_msg_response = await getSentMessages();

      if (received_msg_response && received_msg_response.status === 200) {
        setReceivedMessages(received_msg_response.data.data);
      } else {
        setReceivedMessages([]);
      }

      if (sent_msg_response && sent_msg_response.status === 200) {
        setSentMessages(sent_msg_response.data.data);
      } else {
        setSentMessages([]);
      }
    } catch (error) {
      setReceivedMessages([]);
      setSentMessages([]);
      console.log(error);
    } finally {
      setLoading(false);
      setReload(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [message]);

  if (user.id === -1) {
    return <ErrorPage errors={"Please log in"} />;
  }
  if (loading) {
    return <Loading />;
  }

  const refresh = () => {
    setReload(true);
    getMessages();
  };

  const openMsg = (message: Message_Get) => {
    setForm({
      receiver: -1,
      title: '',
      message: ''
    });
    setErrors({
      receiver: '',
      title: '',
      message: ''
    });
    setSubmitError('');
    setReply(false);
    openMessage(message.id);
    setMessage(message);
  };

  const sendNewMsg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validated = validateEmailMessageSendForm(newMsgForm);
    setErrors(validated);
    if (validated.receiver || validated.title || validated.message) {
      return;
    }
    sendMessage_byEmail(newMsgForm)
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

    refresh();
  };

  const replyToMsg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validated = validateMessageSendForm(form);
    setErrors(validated);
    console.log(form);
    
    if (validated.receiver || validated.title || validated.message) {
      return;
    }

    sendMessage(form)
      .then((response) => {
        if (response.status === 200) {
          setReply(false);
          setSendSuccess(true);
        } else {
          setSubmitError(response.message);
        }
      })
      .catch((error) => {
        setSubmitError(error.message);
      });

      refresh();
  };

  return (
    <div className={messagelist.message_index_container}>
      {newMsg && (
        <div className={messagesend.create_message_container}>
          <button
            className={messagesend.button_close}
            onClick={() => setNewMsg(false)}
          >
            <Close />
          </button>
          <form onSubmit={sendNewMsg} className={messagesend.create_message_form}>
            <div className={messagesend.group_vertical}>
              <label htmlFor="receiver-input">E-mail:</label>
              <input type="text" id="receiver-input" onChange={(e) => setNewMsgForm({...newMsgForm, receiver: e.target.value})} />
            </div>
            <div className={messagesend.group_vertical}>
              <label htmlFor="title-input">Title:</label>
              <input type="text" id="title-input" onChange={(e) => setNewMsgForm({...newMsgForm, title: e.target.value})} />
            </div>
            <div className={messagesend.group_vertical}>
              <label htmlFor="message-content-input">Message content:</label>
              <textarea
                name="message-content-input"
                id="message-content-input"
                onChange={(e) => setNewMsgForm({...newMsgForm, message: e.target.value})} 
              />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      )}

      <div className={messagelist.message_nav}>
        <button
          className={messagelist.refresh}
          onClick={() => {
            refresh();
          }}
        >
          <Refresh />
          <p>Reload</p>
        </button>
        <button
          className={messagelist.new_message}
          onClick={() => {
            setNewMsg(true);
          }}
        >
          <Add />
          <p>New</p>
        </button>
        <button
          className={messagelist.received_messages}
          onClick={() => {
            setReceived_sent_switch(true);
          }}
        >
          <Mail />
          <p>Received</p>
        </button>
        <button
          className={messagelist.sent_messages}
          onClick={() => {
            setReceived_sent_switch(false);
          }}
        >
          <Send />
          <p>Sent</p>
        </button>
      </div>

      {sendSuccess && (
        <div className={messagelist.msg_send_success_box}>
          <h3 className={messagelist.msg_send_success_box_success_msg}>
            Message has been sent successfully
          </h3>
          <button
            className={messagelist.msg_send_success_box_close_btn}
            onClick={() => {
              setSendSuccess(false);
            }}
          >
            <Close />
          </button>
        </div>
      )}
      {reload && (
        <div className={messagelist.reload}>
          <p>loading...</p>
        </div>
      )}
      <div
        className={
          message
            ? messagelist.main_container_msg_open
            : messagelist.main_container
        }
      >
        {received_sent_switch ? (
          <div
            className={
              message
                ? messagelist.messages_list_shrink
                : messagelist.messages_list
            }
          >
            {receivedMessages.length > 0 ? (
              receivedMessages.map((message) => (
                <div
                  key={message.id}
                  className={messagelist.message_row}
                  onClick={() => openMsg(message)}
                >
                  <div className={messagelist.image_container}>
                    {!message.sender.image ? (
                      <img src={person} alt={message.sender.name} />
                    ) : (
                      <img
                        src={message.sender.image}
                        alt={message.sender.name}
                      />
                    )}
                  </div>
                  {message.seen ? (
                    <div className={messagelist.title_container}>
                      <h3 className={messagelist.sender_seen}>
                        {message.sender.name}
                      </h3>
                      <h3 className={messagelist.title_seen}>
                        {message.title}
                      </h3>
                    </div>
                  ) : (
                    <div className={messagelist.title_container}>
                      <h3 className={messagelist.sender}>
                        {message.sender.name}
                      </h3>
                      <h3 className={messagelist.title}>{message.title}</h3>
                    </div>
                  )}
                  {message.seen ? (
                    <div className={messagelist.time_container_seen}>
                      <h3 className={messagelist.date_seen}>
                        {new Date(message.time).toDateString()}
                      </h3>
                      <h3 className={messagelist.time_seen}>
                        {new Date(message.time).toTimeString()}
                      </h3>
                    </div>
                  ) : (
                    <div className={messagelist.time_container}>
                      <h3 className={messagelist.date}>
                        {new Date(message.time).toDateString()}
                      </h3>
                      <h3 className={messagelist.time}>
                        {new Date(message.time).toTimeString()}
                      </h3>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={messagelist.no_messages}>
                <h1>Your inbox is empty</h1>
              </div>
            )}
          </div>
        ) : (
          <div
            className={
              message
                ? messagelist.messages_list_shrink
                : messagelist.messages_list
            }
          >
            {sentMessages.length > 0 ? (
              sentMessages.map((message) => (
                <div
                  onClick={() => setMessage(message)}
                  key={message.id}
                  className={messagelist.message_row}
                >
                  <div className={messagelist.image_container}>
                    {!message.receiver.image ? (
                      <img src={person} alt={message.receiver.name} />
                    ) : (
                      <img
                        src={message.receiver.image}
                        alt={message.receiver.name}
                      />
                    )}
                  </div>
                  <div className={messagelist.title_container}>
                    <h3 className={messagelist.sender_seen}>
                      {message.receiver.name}
                    </h3>
                    <h3 className={messagelist.title_seen}>{message.title}</h3>
                  </div>
                  <div className={messagelist.time_container_seen}>
                    <h3 className={messagelist.date_seen}>
                      {new Date(message.time).toDateString()}
                    </h3>
                    <h3 className={messagelist.time_seen}>
                      {new Date(message.time).toTimeString()}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div className={messagelist.no_messages}>
                <h1>You have not sent any messages yet</h1>
              </div>
            )}
          </div>
        )}
        {message && (
          <div className={messageshow.message_show_container}>
            <div className={messageshow.button_container}>
              <button
                onClick={() => setMessage(null)}
                className={messageshow.button_close}
              >
                <Close />
              </button>
            </div>
            <div className={messageshow.header}>
              <div className={messageshow.image_container}>
                {message.sender.id === user.id ? (
                  !message.receiver.image ? (
                    <img src={person} alt={message.receiver.name} />
                  ) : (
                    <img src={message.receiver.image} alt={message.receiver.name} />
                  )
                ) : (
                  !message.sender.image ? (
                    <img src={person} alt={message.sender.name} />
                  ) : (
                    <img src={message.sender.image} alt={message.sender.name} />
                  )
                )}
              </div>
              <div className={messageshow.msg_info}>
                {message.sender.id === user.id ? (
                  <h1 className={messageshow.sender}>{message.receiver.name}</h1>
                ) : (
                  <h1 className={messageshow.sender}>{message.sender.name}</h1>
                )}
                <div className={messageshow.time_container}>
                  <h3 className={messageshow.date}>
                    {new Date(message.time).toDateString()}
                  </h3>
                  <h3 className={messageshow.time}>
                    {new Date(message.time).toTimeString()}
                  </h3>
                </div>
              </div>
            </div>
            <div className={messageshow.message_content}>
              <h1>{message.title}</h1>
              <p>{message.message}</p>
            </div>
            {!reply && message.sender.id !== user.id && (
              <div className={messageshow.button_container}>
                <button
                  onClick={() => {
                    setReply(true);
                    setForm({ ...form, receiver: message.sender.id, title: ('Re: ' + message.title) });
                  }}
                  className={messageshow.button}
                >
                  <Reply />
                  <p>Reply</p>
                </button>
              </div>
            )}
            {reply && (
              <div className={messagesend.reply_container}>
                <form
                  onSubmit={replyToMsg}
                  className={messagesend.message_send_form}
                >
                  <input
                    disabled
                    hidden
                    type="text"
                    value={message.sender.id}
                  />
                  <div className={messagesend.vertical_group}>
                    <label htmlFor="title-input">Title:</label>
                    <input
                      type="text"
                      className={messagesend.title_input}
                      id="title-input"
                      name="title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({...form, title: e.target.value })
                      }
                    />
                    {errors.title && (
                      <p className={messagesend.error_text}>{errors.title}</p>
                    )}
                  </div>
                  <div className={messagesend.vertical_group}>
                    <label htmlFor="message-input">Message content:</label>
                    <textarea
                      className={messagesend.message_input}
                      id="message-input"
                      name="message"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                    />
                    {errors.message && (
                      <p className={messagesend.error_text}>{errors.message}</p>
                    )}
                  </div>
                  {submitError && (
                    <p className={messagesend.error_text}>{submitError}</p>
                  )}
                  <div className={messagesend.button_container}>
                    <button onClick={() => setReply(false)}>Cancel</button>
                    <button type="submit">Send</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
