import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateRegistrationForm } from '../../services/validate';
import { register } from '../../services/auth';
import { Image, Person, Mail, Call, Lock, Description, Male, Female, QuestionMark, CalendarMonth, ConfirmationNumber, Flag, LocationCity, Pin, Diversity3 } from '@mui/icons-material';
import css from '../../css/Auth.module.css';
import RegistrationInterface from '../../interface/auth/RegisterInterface';

const Register = ({ setUser }: { setUser: (user: any) => void }) => {
  const [type, setType] = useState<number>(1);
  const [form, setForm] = useState<RegistrationInterface>({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    image: null,
    phone: '',
    description: '',
    tax_number: '',
    sex: '',
    country: '',
    city: '',
    postal_code: '',
    birth_date: '',
    agency: ''
  });

  const [errors, setErrors] = useState<{
    name?: string,
    email?: string,
    password?: string,
    password_confirm?: string,
    image?: string,
    phone?: string,
    description?: string,
    tax_number: string,
    sex: string,
    country: string,
    city: string,
    postal_code: string,
    birth_date: string,
    agency: string
  }>({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    image: '',
    phone: '',
    description: '',
    tax_number: '',
    sex: '',
    country: '',
    city: '',
    postal_code: '',
    birth_date: '',
    agency: ''
  });
  
  const [submitError, setSubmitError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate('/?registration-success');
  }, [success, navigate]);

  const reset = (num:number) => {
    setForm({
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      image: null,
      phone: '',
      description: '',
      tax_number: '',
      sex: '',
      country: '',
      city: '',
      postal_code: '',
      birth_date: '',
      agency: ''
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
    const validated = validateRegistrationForm(form, type);
    let valid = true;
    setErrors(validated);
    console.log(form);
    

    if (type === 2) {
      if (
        validated.name || 
        validated.email || 
        validated.password || 
        validated.password_confirm || 
        validated.phone || 
        validated.image ||
        validated.description
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

    register(form).then((response) => {   
      if (response.status === true) {
        setUser(response.user);
        setSuccess(true);
      } else {
        setSubmitError('Something went wrong');
      }
    }).catch((e) => {

      if (e.image) {
        setErrors({...errors, image: e.image[0]});
      }
      if (e.name) {
        setErrors({...errors, name: e.name[0]});
      }
      if (e.email) {
        setErrors({...errors, email: e.email[0]});
      }
      if (e.password) {
        setErrors({...errors, password: e.password[0]});
      }
      if (e.password_confirm) {
        setErrors({...errors, password_confirm: e.password_confirm[0]});
      }
      if (e.phone) {
        setErrors({...errors, phone: e.phone[0]});
      }
      if (e.description) {
        setErrors({...errors, description: e.description[0]});
      }
    })
  };

  return (
    <div className={css.auth_main_container}>
      <div className={css.welcome}>
        <h1>Your Home Awaits</h1>
        <p className={css.welcome_text}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsa? Excepturi blanditiis porro veritatis a temporibus aliquam sunt quae magnam voluptates dignissimos! Amet mollitia id in! Earum voluptatem ipsam voluptates?
        </p>
      </div>

      <form onSubmit={submitForm} className={css.auth_form}>
        {type === 1 ? (
          <h1>Register a new user account</h1>
        ) : (
          <h1>Register a new real-estate agent account</h1>
        )}

        {type === 2 && (
          <div className={css.auth_group_container}>
            <div className={errors.image ? css.auth_invalid : css.auth_group}>
              <label htmlFor="image_input" className={css.auth_label}>
                <Image />
              </label>
              <input 
                type="file" 
                id="image_input" 
                onChange={handleImage}
                className={css.auth_input}
              />
            </div>
            {errors.image && <p className={css.error_text}>{errors.image}</p>}
          </div>
        )}

        <div className={css.auth_group_container}>
          <div className={errors.name ? css.auth_invalid : css.auth_group}>
            <label htmlFor="name_input" className={css.auth_label}>
              <Person />
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className={css.auth_input}
            />
          </div>
          {errors.name && <p className={css.error_text}>{errors.name}</p>}
        </div>

        <div className={css.auth_group_container}>
          <div className={errors.email ? css.auth_invalid : css.auth_group}>
            <label htmlFor="email_input" className={css.auth_label}>
              <Mail />
            </label>
            <input
              type="email"
              id="email_input"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className={css.auth_input}
            />
          </div>
          {errors.email && <p className={css.error_text}>{errors.email}</p>}
        </div>

        {type === 2 && (
          <div className={css.auth_group_container}>
            <div className={errors.agency ? css.auth_invalid : css.auth_group}>
              <label htmlFor="agency_input" className={css.auth_label}>
                <Diversity3 />
              </label>
              <input
                type="text"
                id="agency_input"
                placeholder="Agency"
                value={form.agency}
                onChange={(e) => setForm({...form, agency: e.target.value})}
                className={css.auth_input}
              />
            </div>
            {errors.phone && <p className={css.error_text}>{errors.phone}</p>}
          </div>
        )}
        
        {type === 2 && (
          <div className={css.auth_group_container}>
            <div className={errors.phone ? css.auth_invalid : css.auth_group}>
              <label htmlFor="phone_input" className={css.auth_label}>
                <Call />
              </label>
              <input
                type="text"
                id="phone_input"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                className={css.auth_input}

              />
            </div>
            {errors.phone && <p className={css.error_text}>{errors.phone}</p>}
          </div>
        )}

        <div className={css.auth_group_container}>
          <div className={errors.sex ? css.auth_invalid : css.auth_group}>
            <label htmlFor="sex_input" className={css.auth_label}>
              {form.sex === 'Male' && <Male />}
              {form.sex === 'Female' && <Female />}
              {(form.sex !== 'Male' && form.sex !== 'Female') && <QuestionMark />}
            </label>
            <select
              id="sex_input"
              value={form.sex}
              onChange={(e) => setForm({...form, sex: e.target.value})}
              className={errors.sex ? css.auth_select_invalid : css.auth_select}
            >
              <option value="" disabled>Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {errors.sex && <p className={css.error_text}>{errors.sex}</p>}
        </div>

        <div className={css.auth_group_container}>
          <div className={errors.birth_date ? css.auth_invalid : css.auth_group}>
            <label htmlFor="birthdate_input" className={css.auth_label}>
              <CalendarMonth />
            </label>
            <input
              type="date"
              id="birthdate_input"
              value={form.birth_date}
              onChange={(e) => setForm({...form, birth_date: e.target.value})}
              className={css.auth_input}
              placeholder='Date of birth'
            />
          </div>
          {errors.birth_date && <p className={css.error_text}>{errors.birth_date}</p>}
        </div>


        {type === 2 && (
          <div className={css.auth_group_container}>
            <div className={errors.tax_number ? css.auth_invalid : css.auth_group}>
              <label htmlFor="tax_input" className={css.auth_label}>
                <Pin />
              </label>
              <input
                type="text"
                id="tax_input"
                placeholder="Tax number"
                value={form.tax_number}
                onChange={(e) => setForm({...form, tax_number: e.target.value})}
                className={css.auth_input}

              />
            </div>
            {errors.tax_number && <p className={css.error_text}>{errors.tax_number}</p>}
          </div>
        )}

        {type === 2 && (
          <div className={css.auth_group_container}>
            <div className={errors.country ? css.auth_invalid : css.auth_group}>
              <label htmlFor="country_input" className={css.auth_label}>
                <Flag />
              </label>
              <input
                type="text"
                id="country_input"
                placeholder="Country"
                value={form.country}
                onChange={(e) => setForm({...form, country: e.target.value})}
                className={css.auth_input}

              />
            </div>
            {errors.country && <p className={css.error_text}>{errors.country}</p>}
          </div>
        )}

        {type === 2 && (
          <div className={css.auth_group_container}>
            <div className={errors.city ? css.auth_invalid : css.auth_group}>
              <label htmlFor="city_input" className={css.auth_label}>
                <LocationCity />
              </label>
              <input
                type="text"
                id="city_input"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({...form, city: e.target.value})}
                className={css.auth_input}

              />
            </div>
            {errors.city && <p className={css.error_text}>{errors.city}</p>}
          </div>
        )}

        {type === 2 && (
          <div className={css.auth_group_container}>
            <div className={errors.postal_code ? css.auth_invalid : css.auth_group}>
              <label htmlFor="postal_code_input" className={css.auth_label}>
                <ConfirmationNumber />
              </label>
              <input
                type="text"
                id="postal_code_input"
                placeholder="Postal code"
                value={form.postal_code}
                onChange={(e) => setForm({...form, postal_code: e.target.value})}
                className={css.auth_input}

              />
            </div>
            {errors.postal_code && <p className={css.error_text}>{errors.postal_code}</p>}
          </div>
        )}

        <div className={css.auth_group_container}>
          <div className={errors.password ? css.auth_invalid : css.auth_group}>
            <label htmlFor="password_input" className={css.auth_label}>
              <Lock />
            </label>
            <input
              type="password"
              id="password_input"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              className={css.auth_input}
            />
          </div>
          {errors.password && <p className={css.error_text}>{errors.password}</p>}
        </div>

        <div className={css.auth_group_container}>
          <div className={errors.password_confirm ? css.auth_invalid : css.auth_group}>
            <label htmlFor="password_confirm_input" className={css.auth_label}>
              <Lock />
            </label>
            <input 
              type="password" 
              onChange={(e) => setForm({...form, password_confirm: e.target.value})}
              id="password_confirm_input" 
              value={form.password_confirm}
              placeholder="Confirm password"
              className={css.auth_input}
            />
          </div>
          {errors.password_confirm && <p className={css.error_text}>{errors.password_confirm}</p>}
        </div>

        {type === 2 && (
          <div className={errors.description ? css.auth_description_invalid : css.auth_description}>
            <label htmlFor="description_input" className={css.description_label}>
              <Description />
              <p>Description</p>
            </label>
            <textarea 
              onChange={(e) => setForm({...form, description: e.target.value})}
              id="description_input" 
              value={form.description}
              placeholder="Tell us about yourself..."
              className={css.description_input}
            />
          </div>
        )}
        {type === 2 && errors.description && <p className={css.error_text}>{errors.description}</p>}

        
        <button type="submit" className={css.auth_button}>Register</button>

        {submitError && <p className={css.submit_error}>{submitError}</p>}

        {type === 1 ? (
          <p>If you would like to register as an agent <span className={css.redirect} onClick={() => {reset(2)}}>click here</span></p>
        ) : (
          <p>If you would like to register as a user <span className={css.redirect} onClick={() => {reset(1)}}>click here</span></p>
        )}
        
        <p>If you already have an account <Link to='/login'>login here</Link></p>
      </form>
    </div>

  );
};

export default Register;