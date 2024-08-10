import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/auth';
import '../../css/auth/Registration.css';

const Register = ({ setUser }: { setUser: (user: any) => void }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await register(name, email, password);
        if (response.status === true) { 
          setErrors('');
          console.log(response);
          
          setUser(response.user);
          navigate('/welcome?registration-success');
        } else {
          setErrors(response.message);
        }
    } catch (error:any) {
      setErrors(error.message);
    }
  };
  

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors && <p>{errors}</p>}
        <button type="submit">Register</button>
      </form>
    </div>

  );
};

export default Register;