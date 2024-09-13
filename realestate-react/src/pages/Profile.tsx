import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import css from '../css/Profile.module.css';
import Loading from "../components/pages/loading/Loading";
import ErrorPage from "../components/pages/error/Error";
import { Phone, Email } from "@mui/icons-material";
import person from '../images/person.svg';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
    
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

  if (error) {
    return (
      <ErrorPage errors={error} />
    );
  }

  if (user.id === -1) {
    return (
      <ErrorPage errors={"No user found on this link"} />
    );
  }

  if (user.role === 1) {
    return (
      <div className={css.profile_container}>
        <div className={css.button_container}>
          <Link to={'/messages/send/' + id} className={css.profile_button}>Send a message</Link>
        </div>
        <div className={css.header}>
          <div className={css.image_container}>
            {user.image === '' ? (
              <img src={person} alt={user.name} />
            ) : (
              <img src={user.image} alt={user.name} />
            )}
          </div>
          <div className={css.info}>
              <h1>{user.name.toUpperCase()}</h1>
              <div className={css.info_row}>
                <div className={css.svg_container}>
                  <Email />
                </div>
                <p>{user.email}</p>
              </div>
              {user.phone !== '' && (
                <div className={css.info_row}>
                  <div className={css.svg_container}>
                    <Phone />
                  </div>
                  <p>{user.phone}</p>
                </div>
              )}
            </div>
        </div>
      </div>
    );
  } else {
    return (
      <ErrorPage errors={"Cannot see this profile"} />
    );
  }


}

export default ProfilePage;