import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <Link to='/welcome'>Welcome page</Link>
            <Link to='/user'>User page</Link>
            <Link to='/properties'>Properties page</Link>
        </>
    );
}

export default Home;