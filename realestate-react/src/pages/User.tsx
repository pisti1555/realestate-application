import React from "react";
import { Link } from "react-router-dom";
import css from '../css/Profile.module.css';
import ErrorPage from "../components/pages/error/Error";
import { Phone, Email } from "@mui/icons-material";
import { UserInterface_Get } from "../interface/UserInterface";
import person from '../images/person.svg';

const UserPage = ( {user} : {user:UserInterface_Get} ) => {
    if (user.id === -1) {
        return (
            <ErrorPage errors={'Please log in to view this page'} />
        );
    }

    return (
        <div className={css.profile_container}>
            <div className={css.button_container}>
                <Link to='/user/edit' className={css.profile_button}>Edit profile</Link>
                {user.role === 1 && (
                    <Link to='/properties/create' className={css.profile_button}>Create a property</Link>
                )}
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
}

export default UserPage;
