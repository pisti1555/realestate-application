import api from './api';
import LoginInterface from '../interface/auth/LoginInterface';
import RegistrationInterface from '../interface/auth/RegisterInterface';

export const register = async (form:RegistrationInterface) => {
    try {
        const response = await api.post('/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        const token = response.data.token;

        if (response.data.status === true) {
            localStorage.setItem('token', token);
        }
        
        return response.data;
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Registration failed');
        }
    }
}


export async function login(form:LoginInterface) {
    try {
        const response = await api.post('/login', form);
        const token = response.data.token;
        if (response.data.status === true) {
            localStorage.setItem('token', token);
        }
        return response.data;
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Login failed');
        }
    }
};

export async function logout() {
    try {
        await api.post('/logout');
        localStorage.removeItem('token');
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Logout failed');
        }
        
    }
}

