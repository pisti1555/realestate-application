import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/auth';
import { registerAgent } from '../../services/auth';
import RegisterUserInterface from '../../components/interface/auth/registerUserInterface';
import RegisterAgentInterface from '../../components/interface/auth/registerAgentInterface';
import '../../css/auth/Registration.css';

const Register = ({ setUser }: { setUser: (user: any) => void }) => {
  const [type, setType] = useState<number>(0);

  const [userForm, setUserForm] = useState<RegisterUserInterface>({
    name: '',
    email: '',
    password: ''    
  });

  const [agentForm, setAgentForm] = useState<RegisterAgentInterface>({
    name: '',
    email: '',
    password: '',
    image: null,
    phone: ''  
  });

  const [errors, setErrors] = useState<string>('');

  const navigate = useNavigate();

  const handleImage = (e:any) => {
    if (e.target.files && e.target.files.length > 0) {
      setAgentForm({...agentForm, image: e.target.files[0]});
    }
  };

  const submitAgent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await registerAgent(agentForm);
        if (response.status === true) {
          setErrors('');
          setUser(response.user);
          navigate('/welcome?registration-success');
        } else {
          setErrors(response.message);
        }
    } catch (error:any) {
      setErrors(error.message);
    }
  };

  const submitUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await registerUser(userForm);
        if (response.status === true) {
          setErrors('');
          setUser(response.user);
          navigate('/welcome?registration-success');
        } else {
          setErrors(response.message);
        }
    } catch (error:any) {
      setErrors(error.message);
    }
  };


  
  
  if (type == 0) {
    return (
      <>
        <button onClick={() => {setType(1)}}>Register as User</button>
        <button onClick={() => {setType(2)}}>Register as Agent</button>
      </>
    );
  }

  if (type == 1) {
    return (
      <div className="container">
        <button onClick={() => {setType(0)}}>Back</button>
        <h2>Register</h2>
        <form onSubmit={submitUser} className="register-form">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userForm.name}
              onChange={(e) => setUserForm({...userForm, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userForm.email}
              onChange={(e) => setUserForm({...userForm, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userForm.password}
              onChange={(e) => setUserForm({...userForm, password: e.target.value})}
              required
            />
          </div>
          {errors && <p>{errors}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
  
    );
  }
  
  if (type == 2) {
    return (
      <div className="container">
        <button onClick={() => {setType(0)}}>Back</button>
        <h2>Register</h2>
        <form onSubmit={submitAgent} className="register-form">
        <div>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={agentForm.name}
              onChange={(e) => setAgentForm({...agentForm, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={agentForm.email}
              onChange={(e) => setAgentForm({...agentForm, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={agentForm.phone}
              onChange={(e) => setAgentForm({...agentForm, phone: e.target.value})}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={agentForm.password}
              onChange={(e) => setAgentForm({...agentForm, password: e.target.value})}
              required
            />
          </div>
          {errors && <p>{errors}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
  
    );
  }

  return (
    <>
      <h1>Error while loading page</h1>
    </>
  );
};

export default Register;