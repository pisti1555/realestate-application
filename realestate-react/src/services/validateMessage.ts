import { Message_Post, Message_Post_by_Email } from "../interface/MessagesInterface";

export const validateMessageSendForm = (form:Message_Post) => {
  let receiverValid = false;
  let titleValid = false;
  let messageValid = false;

  let errors = {
    receiver: '',
    title: '',
    message: ''
  }

  receiverValid = validateReceiver(form.receiver);
  titleValid = validateTitle(form.title);
  messageValid = validateMessage(form.message);

  receiverValid? errors.receiver = '' : errors.receiver = 'Incorrect receiver input';
  titleValid? errors.title = '' : errors.title = 'Title must be at least 1 and maximum 30 characters long';
  messageValid? errors.message = '' : errors.message = 'Message must be at least 20 and maximum 500 characters long';

  return errors;
}

export const validateEmailMessageSendForm = (form:Message_Post_by_Email) => {
  let errors = {
    receiver: '',
    title: '',
    message: ''
  }
  
  validateEmail(form.receiver)? errors.receiver = '' : errors.receiver = 'Incorrect receiver input';
  validateTitle(form.title)? errors.title = '' : errors.title = 'Title must be at least 1 and maximum 30 characters long';
  validateMessage(form.message)? errors.message = '' : errors.message = 'Message must be at least 20 and maximum 500 characters long';

  return errors;
}

const validateEmail = (email:string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const validateReceiver = (receiver:number) => {
  return receiver > 0;
}

const validateTitle = (title:string) => {
  return (title.length > 0 && title.length <= 30);
}

const validateMessage = (message:string) => {
  return (message.length > 20 && message.length <= 500);
}