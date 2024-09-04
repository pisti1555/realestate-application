import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import '../css/Profile.css';
import Loading from "../components/pages/loading/Loading";
import ErrorPage from "../components/pages/error/Error";
import { Phone, Email } from "@mui/icons-material";

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
  }, []);

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

  if (!user) {
    return (
      <ErrorPage errors={"No user found on this link"} />
    );
  }

  if (user.role === 1) {
    return (
      <div className="profile-container">
        <div className="button-container">
          <Link to={'/message/' + id} className="profile-button">Send a message</Link>
        </div>
        <div className="header">
          <div className="image-container">
            <img src={user.image} alt={user.name} />
          </div>
          <div className="info">
              <h1>{user.name}</h1>
              <div className="info-row">
                <div className="svg-container">
                  <Email />
                </div>
                <p>{user.email}</p>
              </div>
              <div className="info-row">
                <div className="svg-container">
                  <Phone />
                </div>
                <p>{user.phone}</p>
              </div>
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