import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import '../css/Profile.css';
import Loading from "../components/pages/loading/Loading";
import ErrorPage from "../components/pages/error/Error";
import { Phone, Email } from "@mui/icons-material";

const Profile = () => {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (error) {
                setError("Failed to load user");
            } finally {
                setLoading(false);
            }
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

    if (user.role === 'agent') {
        return (
            <div className="profile-container">
                <div className="button-container">
                    <Link to='/user/edit' className="profile-button">Edit profile</Link>
                    <Link to='/properties/create' className="profile-button">Create a property</Link>
                </div>
                <div className="header">
                    <div className="image-container">
                        <img src={user.image} alt="" />
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
    }
    
    return (
        <div className="profile-container">
            <div className="button-container">
                    <Link to='/user/edit' className="profile-button">Edit profile</Link>
            </div>
            <div className="header">
                <div className="info">
                    <h1>{user.name}</h1>
                </div>
            </div>
        </div>
    );
}

export default Profile;
