import React, { useState, useEffect,  FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/auth';
import LoginInterface from '../../interface/auth/login';
import '../../css/Auth.css';
import { Lock, Mail } from '@mui/icons-material';
import { validateLoginForm } from '../../services/validate';

const Login = ({ setUser }: { setUser: (user: any) => void }) => {
  const [form, setForm] = useState<LoginInterface>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<LoginInterface>({
    email: '',
    password: ''
  });
  const [valid, setValid] = useState<boolean>(true);
  const [submitError, setSubmitError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate('/');
  }, [success, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validated = validateLoginForm(form);
    setErrors(validated);

    if (validated.email || validated.password) {
      setValid(false);
      return;
    }

    try {
      const response = await login(form);
      if (response.status === true) { 
        setValid(true);
        setUser(response.user);
        setSuccess(true);
      } else {
        setValid(false);
        setSubmitError(response.message);
      }
    } catch (err:any) {
      setValid(false);
      setSubmitError(err.message);
    }
  };

  return (
    <>
      <div className="auth-main-container">
        <div className="welcome">
          <h1>Welcome to realestate</h1>
          <h3>Your journey to finding the perfect property starts here.</h3>
          <p className='welcome-text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A perspiciatis odio tempore eos optio veritatis odit voluptatem rem modi inventore? Debitis inventore molestias recusandae, repellendus impedit animi id ullam nemo!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Login to you account</h1>
          <div className="group-container">
            <div className={!valid?"invalid":"group"}>
              <label htmlFor="email_input" className='auth-label'>
                <Mail />
              </label>
              <input 
                type="email" 
                onChange={(e) => setForm({...form, email: e.target.value})} 
                id="email_input" 
                value={form.email}
                placeholder="Email address"
                className='auth-input'
              />
            </div>
            {errors.email && <p className='error-text'>{errors.email}</p>}
          </div>
          
          <div className="group-container">
            <div className={!valid?"invalid":"group"}>
              <label htmlFor="password_input" className='auth-label'>
                <Lock />
              </label>
              <input 
                type="password" 
                onChange={(e) => setForm({...form, password: e.target.value})}
                id="password_input" 
                value={form.password}
                placeholder="Password"
                className='auth-input'
              />
            </div>
            {errors.password && <p className='error-text'>{errors.password}</p>}
          </div>
          
          <button type="submit" className="auth-button">Login</button>
          {submitError && <p className='error-text'>{submitError}</p>}
          <p>or if you do not have an account, <Link to="/register">register here</Link></p>
        </form>
      </div>
    </>
  );
};

export default Login;
