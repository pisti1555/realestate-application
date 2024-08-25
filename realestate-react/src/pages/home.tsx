import React from "react";
import { useSearchParams, Link } from 'react-router-dom';
import '../css/Home.css';


const Home = ({ user } : { user:any }) => {
  const [searchParams] = useSearchParams();
  const registered = searchParams.has('registration-success');
  const loggedIn = searchParams.has('login-success');


    return (
        <>
            <section className="welcome-section">
                <div className="welcome-grid-container">
                    <div className="welcome-big-container">
                        <h1>Welcome!</h1>
                        {registered && (
                            <p>You have successfully registered!</p>
                        )}
                        {loggedIn && (
                            <p>You have successfully logged in!</p>
                        )}
                    </div>
                    <div className="welcome-text-container">
                        <h1>Welcome to Real-X-Estate-Super</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolores voluptate est assumenda vel? Atque asperiores deleniti blanditiis ab aut corporis magni aperiam, totam facere eaque, voluptate ad quaerat incidunt.</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio eaque doloremque distinctio iure eius illo repudiandae vel amet voluptate, ad ex autem consectetur quos provident quam! Beatae ipsam tempore velit.</p>
                    </div>
                    <div className="explore-container">
                        <h2>Discover a Wide Range of Exclusive Properties</h2>
                        <div className="welcome-btn-container">
                            <Link to='/properties' className="welcome-button">Explore</Link>
                        </div>
                    </div>
                    {user ? (
                        <></>
                    ) : (
                        <div className="auth-container">
                            <h2>Log in or Register to Access Exclusive Property Listings</h2>
                            <div className="welcome-btn-container">
                                <Link to='/login' className="welcome-button">Log in</Link>
                                <Link to='/register' className="welcome-button">Register</Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Home;