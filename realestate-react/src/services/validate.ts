import LoginInterface from "../components/interface/auth/login";
import RegistrationInterface from "../components/interface/auth/registerInterface";

export const validateLoginForm = (form:LoginInterface) => {
  let emailValid = false;
  let passwordValid = false;

  let errors = {
    email: '',
    password: '',
  }

  emailValid = validateEmail(form.email);
  passwordValid = validatePassword(form.password);

  emailValid? errors.email='' : errors.email='Invalid e-mail format';
  passwordValid? errors.password='' : errors.password='Invalid password';

  return errors;
}

export const validateRegistrationForm = (form:RegistrationInterface) => {
  let nameValid = false;
  let emailValid = false;
  let passwordValid = false;
  let password_confirmValid = false;
  let imageValid = false;
  let phoneValid = false;

  let errors = {
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    image: '',
    phone: ''
  }

  nameValid = validateName(form.name);
  emailValid = validateEmail(form.email);
  passwordValid = validatePassword(form.password);
  password_confirmValid = confirmPassword(form.password, form.password_confirm);

  if (form.phone) {
    phoneValid = validatePhone(form.phone);
  }
  if (form.image) {
    imageValid = validateImage(form.image);
  }


  nameValid? errors.name='' : errors.name='Name can only contain the letters of english ABC and the hungarian special characters';
  emailValid? errors.email='' : errors.email='Invalid e-mail format';
  passwordValid? errors.password='' : errors.password='Password must be at least 6 characters long and contain at least 1 number';
  password_confirmValid? errors.password_confirm='' : errors.password_confirm='Passwords dont match';
  phoneValid? errors.phone='' : errors.phone='Phone number contains only numbers and 10-15 characters long';
  imageValid? errors.image='' : errors.image='Accepted image types are .jpg and .jpeg';

  return errors;
};

// Name can only contain the letters of english ABC and the hungarian special characters
const validateName = (name:string) => {
  const nameRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/;
    return nameRegex.test(name);
}

// Basic e-mail format
const validateEmail = (email:string)  => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Image type is .jpg or .jpeg
const validateImage = (image:File) => {
  if (image.type === 'image/jpg' || image.type === 'image/jpeg') {
    return true;
  } else return false;
}

// Phone number contains only numbers and 10-15 characters long
const validatePhone = (phone:string) => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}

// Password must be at least 6 characters long and contain at least 1 number
const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
}

// Confirm password
const confirmPassword = (password1:string, password2: string) => {
  return password1 === password2;
}
