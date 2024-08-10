import React from "react";
import { Link } from "react-router-dom";
import '../css/Home.css';

const Home = () => {
    return (
        <div className="container">
            <h1 className="title">Home</h1>
            <div className="options">
                <Link 
                    to='/welcome' 
                    className="link"
                >
                    Welcome page
                </Link>
                <Link 
                    to='/user' 
                    className="link"
                >
                    User page
                </Link>
                <Link 
                    to='/properties' 
                    className="link"
                >
                    Properties page
                </Link>
            </div>
        </div>
    );
}

export default Home;
