import { Message_Post } from "../interface/MessagesInterface";

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


const validateReceiver = (receiver:number) => {
  return receiver > 0;
}

const validateTitle = (title:string) => {
  return (title.length > 0 && title.length <= 30);
}

const validateMessage = (message:string) => {
  return (message.length > 20 && message.length <= 500);
}