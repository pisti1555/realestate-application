import axios from "axios";
import api from './api';


export async function register(name:string, email:string, password:string) {
    await api.post('/register', 
        {
            name,
            email,
            password
        });
}

export async function login(email:string, password:string) {
    try {
        const response = await api.post('/login', { email, password });
        const { token, user } = response.data;

        return { token, user };
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
        if (localStorage.getItem('token')) {
            await api.post('/logout');
            localStorage.removeItem('token');
        }
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Logout failed');
        }
        
    }
}

