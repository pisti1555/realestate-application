import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateRegistrationForm } from '../../services/validate';
import { register } from '../../services/auth';
import { Image, Person, Mail, Call, Lock } from '@mui/icons-material';
import '../../css/Auth.css';
import { AuthButton } from '../../components/buttons/Buttons';
import RegistrationInterface from '../../interface/auth/registerInterface';

const Register = ({ setUser }: { setUser: (user: any) => void }) => {
  const [type, setType] = useState<number>(1);
  const [form, setForm] = useState<RegistrationInterface>({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    image: null,
    phone: ''
  });
  const [errors, setErrors] = useState<any>({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    image: '',
    phone: ''
  });
  const [submitError, setSubmitError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate('/welcome?registration-success');
  }, [success, navigate]);

  const reset = (num:number) => {
    setForm({
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      image: null,
      phone: ''
    });

    if (num === 2) setType(2); else setType(1);
  }


  // --------- Handling form-submit ---------

  const handleImage = (e:any) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm({...form, image: e.target.files[0]});
    }
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validated = validateRegistrationForm(form);
    let valid = true;
    setErrors(validated);

    if (form.image || form.phone) {
      if (
        validated.name || 
        validated.email || 
        validated.password || 
        validated.password_confirm || 
        validated.phone || 
        validated.image
      ) valid = false;
    } else {
      if (
        validated.name || 
        validated.email || 
        validated.password || 
        validated.password_confirm
      ) valid = false;
    }

    if (!valid) return;

    try {
        const response = await register(form);
        if (response.status === true) {
          setUser(response.user);
          setSuccess(true);
        } else {
          setSubmitError(response.message);
        }
    } catch (error:any) {
      setSubmitError(error.message);
    }
  };

  return (
    <div className="auth-main-container">
      <div className="welcome">
        <h1>Your Home Awaits</h1>
        <p className='welcome-text'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsa? Excepturi blanditiis porro veritatis a temporibus aliquam sunt quae magnam voluptates dignissimos! Amet mollitia id in! Earum voluptatem ipsam voluptates?
        </p>
      </div>

      <form onSubmit={submitForm}>
        {type === 1? (
          <h1>Register a new user account</h1>
        ) : (
          <h1>Register a new real-estate agent account</h1>
        )}

        {type === 2 && (
          <div className="group-container">
            <div  className={errors.image?"invalid":"group"}>
              <label htmlFor="image_input">
                <Image />
              </label>
              <input 
                type="file" 
                id="image_input" 
                onChange={handleImage} 
              />
            </div>
            {errors.image && <p className='error-text'>{errors.image}</p>}
          </div>
        )}

        <div className="group-container">
          <div className={errors.name?"invalid":"group"}>
            <label htmlFor="name_input">
              <Person />
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              required
            />
          </div>
          {errors.name && <p className='error-text'>{errors.name}</p>}
        </div>

        <div className="group-container">
          <div className={errors.email?"invalid":"group"}>
            <label htmlFor="email_input">
              <Mail />
            </label>
            <input
              type="email"
              id="email_input"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
            />
          </div>
          {errors.email && <p className='error-text'>{errors.email}</p>}
        </div>
        
        {type === 2 && (
          <div className="group-container">
            <div className={errors.phone?"invalid":"group"}>
              <label htmlFor="phone_input">
                <Call />
              </label>
              <input
                type="text"
                id="phone_input"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                required
              />
            </div>
            {errors.phone && <p className='error-text'>{errors.phone}</p>}
          </div>
        )}

        <div className="group-container">
          <div className={errors.password?"invalid":"group"}>
            <label htmlFor="password_input">
              <Lock />
            </label>
            <input
              type="password"
              id="password_input"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
            />
          </div>
          {errors.password && <p className='error-text'>{errors.password}</p>}
        </div>

        <div className="group-container">
            <div className={errors.password_confirm?"invalid":"group"}>
              <label htmlFor="password_confirm_input">
                <Lock />
              </label>
              <input 
                type="password" 
                onChange={(e) => setForm({...form, password_confirm: e.target.value})}
                id="password_confirm_input" 
                value={form.password_confirm}
                placeholder="Confirm password"
              />
            </div>
            {errors.password_confirm && <p className='error-text'>{errors.password_confirm}</p>}
          </div>
        
          <AuthButton text="Register" />

        {submitError && <p>{submitError}</p>}

        {type === 1 ? (
          <p>If you would like to register as an agent <span className='redirect' onClick={() => {reset(2)}}>click here</span></p>
        ) : (
          <p>If you would like to register as a user <span className='redirect' onClick={() => {reset(1)}}>click here</span></p>
        )}
        
        <p>If you already have an account <Link to='/login'>login here</Link></p>
      </form>
    </div>
  );
};

export default Register;