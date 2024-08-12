import React, { useState, useEffect,  FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/auth';
import LoginInterface from '../../components/interface/auth/login';
import '../../css/auth/Login.css';

const Login = ({ setUser }: { setUser: (user: any) => void }) => {
  const [form, setForm] = useState<LoginInterface>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(form);
      if (response.status === true) { 
        setErrors('');
        setUser(response.user);
        navigate('/');
      } else {
        setErrors(response.message);
      }
    } catch (err:any) {
      setErrors(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
          />
        </div>
        {errors && <p>{errors}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
