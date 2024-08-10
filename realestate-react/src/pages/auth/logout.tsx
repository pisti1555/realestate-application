import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';

const Logout = ({ setUser }: { setUser: (user: any) => void }) => {
    const [errors, setErrors] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const logOut = async () => {
            try {
                await logout();
                setUser(null);
                navigate('/login');
            } catch (error:any) {
                setErrors(error.message);
            }
        };

        logOut();
    }, [navigate]);

    if (errors) {
        return (
            <div>
                <p>{errors}</p>
            </div>
        );
    }

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;
