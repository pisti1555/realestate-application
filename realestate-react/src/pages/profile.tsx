import React, { useState, useEffect } from "react";
import api from "../services/api";

const Profile = () => {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (error) {
                setError("Failed to load user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>No user data</div>;
    }
    

    return (
        <>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </>
    );
}

export default Profile;