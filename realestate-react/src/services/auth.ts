import api from './api';
import RegisterUserInterface from '../components/interface/auth/registerUserInterface';
import RegisterAgentInterface from '../components/interface/auth/registerAgentInterface';
import LoginInterface from '../components/interface/auth/login';
import RegistrationInterface from '../components/interface/auth/registerInterface';

export async function registerUser(form:RegisterUserInterface) {
    try {
        const response = await api.post('/register', form);

        const token= response.data.token;

        if (response.data.status === true) {
            localStorage.setItem('token', token);
        }

        return response.data;
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw error.response.data.message;
        } else {
            throw new Error('Registration failed');
        }
    }
}

export async function registerAgent(form:RegisterAgentInterface) {
    try {
        const response = await api.post('/register-agent', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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
        console.log(error);
        
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

