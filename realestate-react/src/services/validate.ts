import LoginInterface from "../interface/auth/LoginInterface";
import RegistrationInterface from "../interface/auth/RegisterInterface";

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

export const validateRegistrationForm = (form:RegistrationInterface, type:number) => {
  let errors = {
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
  }

  if (type === 2) {
    validatePhone(form.phone)? errors.phone='' : errors.phone='Phone number contains only numbers and 10-15 characters long';
    if (form.image) {
      validateImage(form.image)? errors.image='' : errors.image='Accepted image types are .jpg and .jpeg';
    } else {
      errors.image='You have to set an image to your profile';
    }
    validateTaxNumber(form.tax_number)? errors.tax_number= '' : errors.tax_number= 'Invalid tax number';
    validateCountry(form.country)? errors.country= '' : errors.country= 'Invalid country';
    validateCity(form.city)? errors.city= '' : errors.city= 'Invalid city';
    validatePostalCode(form.postal_code)? errors.postal_code= '' : errors.postal_code= 'Invalid postal code';
    validateAgency(form.agency)? errors.agency= '' : errors.agency= 'Invalid Agency input';
    validateDescription(form.description)? errors.description= '' : errors.description= 'Invalid Agency input';
  }

  validateName(form.name)? errors.name='' : errors.name='Name can only contain the letters of english ABC and the hungarian special characters';
  validateEmail(form.email)? errors.email='' : errors.email='Invalid e-mail format';
  validatePassword(form.password)? errors.password='' : errors.password='Password must be at least 6 characters long and contain at least 1 number';
  confirmPassword(form.password, form.password_confirm)? errors.password_confirm='' : errors.password_confirm='Passwords dont match';
  validateBirthDate(form.birth_date)?  errors.birth_date='' : errors.birth_date='Invalid birth date';
  validateSex(form.sex)?  errors.sex='' : errors.sex='Sex can only be Male, Female or Other';
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

const validateDescription = (description: string) => {
  return description.length >= 20 && description.length <= 1000;
}

// Sex can only be Male, Female or Other
const validateSex = (sex: string) => {
  return ['Male', 'Female', 'Other'].includes(sex);
}

const validateAgency = (agency: string) => {
  return agency.length >= 1 && agency.length <= 50;
}

const validateTaxNumber = (taxNumber: string) => {
  const regex = /^\d{8,15}$/;
  return taxNumber === '' || regex.test(taxNumber);
}

const validateCountry = (country: string) => {
  return country === '' || country.length <= 50;
}

const validateCity = (city: string) => {
  return city === '' || city.length <= 50;
}

const validatePostalCode = (postal_code: string) => {
  const regex = /^[A-Za-z0-9\s\-]+$/;
  return postal_code === '' || regex.test(postal_code);
}

const validateBirthDate = (date: string) => {
  const today = new Date();
  const birthDate = new Date(date);

  if (isNaN(birthDate.getTime())) {
    return false;
  }

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date) && birthDate <= today;
};
