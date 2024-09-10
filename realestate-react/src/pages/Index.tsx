import React from "react";
import { useSearchParams, Link } from 'react-router-dom';
import css from '../css/Index.module.css';


const Index = ({ user } : { user:any }) => {
  const [searchParams] = useSearchParams();
  const registered = searchParams.has('registration-success');
  const loggedIn = searchParams.has('login-success');


    return (
        <div className={css.page_scroll_container}>
            <section className={css.welcome_section}>
                <div className={css.welcome_grid_container}>
                    <div className={css.welcome_big_container}>
                        <h1>Welcome!</h1>
                        {registered && (
                            <p>You have successfully registered!</p>
                        )}
                        {loggedIn && (
                            <p>You have successfully logged in!</p>
                        )}
                    </div>
                    <div className={css.welcome_text_container}>
                        <h1>Welcome to Real_X_Estate_Super</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolores voluptate est assumenda vel? Atque asperiores deleniti blanditiis ab aut corporis magni aperiam, totam facere eaque, voluptate ad quaerat incidunt.</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio eaque doloremque distinctio iure eius illo repudiandae vel amet voluptate, ad ex autem consectetur quos provident quam! Beatae ipsam tempore velit.</p>
                    </div>
                    <div className={css.explore_container}>
                        <h2>Discover a Wide Range of Exclusive Properties</h2>
                        <div className={css.welcome_btn_container}>
                            <Link to='/properties' className={css.welcome_button}>Explore</Link>
                        </div>
                    </div>
                    {user ? (
                        <></>
                    ) : (
                        <div className={css.auth_container}>
                            <h2>Log in or Register to Access Exclusive Property Listings</h2>
                            <div className={css.welcome_btn_container}>
                                <Link to='/login' className={css.welcome_button}>Log in</Link>
                                <Link to='/register' className={css.welcome_button}>Register</Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className={css.introduce_section}>
                <h1>Introduce section</h1>
            </section>
        </div>
    );
}

export default Index;