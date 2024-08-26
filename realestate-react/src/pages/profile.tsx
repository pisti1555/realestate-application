import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import '../css/Profile.css';
import Loading from "../components/pages/loading/Loading";
import ErrorPage from "../components/pages/error/Error";

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
            <div className="container">
                <div className="right">
                    <Link to='/properties/create' className="link-button">Create a property</Link>
                </div>
                <div className="header">
                    <img src={user.image} alt="" />
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container">
                <div className="header">
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
            </div>
    );
}

export default Profile;
