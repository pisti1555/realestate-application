import axios from "axios";
import api from './api';
import NavBar from "../components/navbar/Navbar";


export async function register(name:string, email:string, password:string) {
    let authenticated = true;
    try {
        const currentUser = await api.get('/user');
        if (currentUser) {
            return Promise.reject(new Error('Already logged in'));
        }
    } catch (error) {
        authenticated = false;
    }

    try {
        if (authenticated) return;
        const response = await api.post('/register', {
                name,
                email,
                password
            });

        const token= response.data.token;

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


export async function login(email:string, password:string) {
    let authenticated = true;
    try {
        const currentUser = await api.get('/user');
        if (currentUser) {
            return Promise.reject(new Error('Already logged in'));
        }
    } catch (error) {
        authenticated = false;
    }

    try {
        if (authenticated) return;
        const response = await api.post('/login', { email, password });
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
        if (!localStorage.getItem('token')) return Promise.reject(new Error('Already logged out'));
        const currentUser = await api.get('/user');
        if (currentUser) {
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

