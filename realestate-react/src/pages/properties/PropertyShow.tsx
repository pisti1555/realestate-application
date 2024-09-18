import React, { useEffect, useState, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { PropertyInterface_Get } from "../../interface/property/PropertyInterface";
import { validateMessageSendForm } from "../../services/validateMessage";
import { sendMessage } from "../../services/message";
import { Message_Post } from "../../interface/MessagesInterface";
import ErrorPage from "../../components/pages/error/Error";
import Loading from "../../components/pages/loading/Loading";
import api from "../../services/api";
import css from "../../css/property/PropertyShow.module.css";
import messagesend from "../../css/messages/MessageSend.module.css";
import messageindex from "../../css/messages/MessageIndex.module.css";
import { ArrowBack, Email, Phone, Close } from "@mui/icons-material";
import person from "../../images/person.svg";
import { UserInterface_Get } from "../../interface/UserInterface";

const PropertyShow = ({ user }: { user: UserInterface_Get }) => {
  const [property, setProperty] = useState<PropertyInterface_Get | null>(null);
  const [permission, setPermission] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<boolean>(false);
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [msg_errors, setMsgErrors] = useState<any>({
    receiver: "",
    title: "",
    message: "",
  });
  const [form, setForm] = useState<Message_Post>({
    receiver: -1,
    title: "",
    message: "",
  });

  useEffect(() => {
    api
      .get("/is-own-property/" + id)
      .then((response) => {
        if (response.status === 200) {
          setPermission(true);
        }
      })
      .catch((error) => {
        setPermission(false);
      });

    api
      .get("/properties/" + id)
      .then((response) => {
        setProperty(response.data.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrors(error.response.data.message);
          return;
        }
        if (error.message) {
          setErrors(error.message);
          return;
        }
        setErrors("Unexpected error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const sendMsg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validated = validateMessageSendForm(form);
    console.log(validated);

    setMsgErrors(validated);
    if (validated.receiver || validated.title || validated.message) {
      return;
    }

    sendMessage(form)
      .then((response) => {
        if (response.status === 200) {
          setMessage(false);
          setSendSuccess(true);
        } else {
          setSubmitError(response.message);
        }
      })
      .catch((error) => {
        setSubmitError(error.message);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (!property || errors) {
    return <ErrorPage errors={errors} />;
  }

  return (
    <div className={css.property_show_page}>
      <Link to="/properties" className={css.button_container}>
        <ArrowBack />
        <p>Back</p>
      </Link>

      <div className={css.img_container}>
        <img src={property.image} alt={property.title} />
      </div>

      {permission ? (
        <Link
          to={"/properties/edit/" + property.id}
          className={css.edit_button}
        >
          Edit
        </Link>
      ) : null}

      <section className={css.title_section}>
        <h1>{property.title}</h1>
        <h2>{property.price}$</h2>
      </section>

      <section className={css.location_section}>
        <p>{property.city}</p>
        <p>{property.postal_code}</p>
        <p>{property.address}</p>
      </section>

      <section className={css.description_section}>
        <p>{property.description}</p>
      </section>

      {sendSuccess && (
        <div className={messageindex.msg_send_success_box}>
          <h3 className={messageindex.msg_send_success_box_success_msg}>
            Message has been sent successfully
          </h3>
          <button
            className={messageindex.msg_send_success_box_close_btn}
            onClick={() => {
              setSendSuccess(false);
            }}
          >
            <Close />
          </button>
        </div>
      )}

      <section
        className={messagesend.message_send_section}
        style={message ? { maxHeight: "800px" } : { maxHeight: "0px" }}
      >
        {user.id === -1 ? (
          <div className={messagesend.unath_container}>
            <div className={messagesend.button_container}>
              <button onClick={() => setMessage(false)}>
                <Close />
              </button>
            </div>
            <h1>Please log in to send a message</h1>
            <Link to="/login">Log in</Link>
          </div>
        ) : (
          <form onSubmit={sendMsg} className={messagesend.message_send_form}>
            <input disabled hidden type="text" value={property.user.id} />
            <div className={messagesend.vertical_group}>
              <label htmlFor="title-input">Title:</label>
              <input
                type="text"
                className={messagesend.title_input}
                id="title-input"
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {msg_errors.title && (
                <p className={messagesend.error_text}>{msg_errors.title}</p>
              )}
            </div>
            <div className={messagesend.vertical_group}>
              <label htmlFor="message-input">Message content:</label>
              <textarea
                className={messagesend.message_input}
                id="message-input"
                name="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {msg_errors.message && (
                <p className={messagesend.error_text}>{msg_errors.message}</p>
              )}
            </div>
            {submitError && (
              <p className={messagesend.error_text}>{submitError}</p>
            )}
            <div className={messagesend.button_container}>
              <button type="button" onClick={() => setMessage(false)}>Cancel</button>
              <button type="submit">Send</button>
            </div>
          </form>
        )}
      </section>

      <section
        className={css.advertiser_section}
        style={message ? { maxHeight: "0px" } : { maxHeight: "800px" }}
      >
        <div className={css.contact}>
            <h1>Contact the advertiser</h1>
            <Link to={"/profile/" + property.user.id}>View profile</Link>
            <button onClick={() => { setMessage(true) }}>
              Send a direct message
            </button>
        </div>
        <div className={css.content}>
          <div className={css.image_container}>
            {!property.user.image ? (
              <img src={person} alt={property.user.name} />
            ) : (
              <img src={property.user.image} alt={property.user.name} />
            )}
          </div>
          <div className={css.info}>
            <h1>{property.user.name}</h1>
            <div className={css.info_row}>
              <div className={css.svg_container}>
                <Email />
              </div>
              <p>{property.user.email}</p>
            </div>
            {property.user.phone && (
              <div className={css.info_row}>
                <div className={css.svg_container}>
                  <Phone />
                </div>
                <p>{property.user.phone}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyShow;
