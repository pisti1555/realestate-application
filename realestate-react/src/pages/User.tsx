import React from "react";
import { Link } from "react-router-dom";
import '../css/Profile.css';
import ErrorPage from "../components/pages/error/Error";
import { Phone, Email } from "@mui/icons-material";
import { UserInterface_Get } from "../interface/user/UserInterface";

const UserPage = ( {user} : {user:UserInterface_Get | null} ) => {
    if (!user) {
        return (
            <ErrorPage errors={'Please log in to view this page'} />
        );
    }

    return (
        <div className="profile-container">
            <div className="button-container">
                <Link to='/user/edit' className="profile-button">Edit profile</Link>
                {user.role === 1 && (
                    <Link to='/properties/create' className="profile-button">Create a property</Link>
                )}
            </div>
            <div className="header">
                {user.image && (
                    <div className="image-container">
                        <img src={user.image} alt={user.name} />
                    </div>
                )}
                <div className="info">
                    <h1>{user.name}</h1>
                    <div className="info-row">
                        <div className="svg-container">
                            <Email />
                        </div>
                        <p>{user.email}</p>
                    </div>
                    {user.phone && (
                        <div className="info-row">
                            <div className="svg-container">
                                <Phone />
                            </div>
                            <p>{user.phone}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserPage;
