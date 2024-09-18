import api from "./api";
import { Message_Post, Message_Post_by_Email } from "../interface/MessagesInterface";

export const getReceivedMessages = async () => {
  try {
    const response = await api.get('/messages');
    return response;
  } catch (e:any) {
    console.error(e);
    return e.response;
  }
}

export const getSentMessages = async () => {
  try {
    const response = await api.get('/messages/sent');
    return response;
  } catch (e:any) {
    console.error(e);
    return e.response;
  }
}

export const sendMessage = async (form:Message_Post) => {
  try {
    const response = await api.post('/messages/send', form);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}

export const sendMessage_byEmail = async (form:Message_Post_by_Email) => {
  try {
    const response = await api.post('/messages/send-email', form);
    return response.data;
  } catch (error:any) {
    console.log(error);
    return error.response.data;
  }
}

export const openMessage = async (message:number) => {
  try {
    const response = await api.get('/messages/' + message);
    return response.data.data;
  } catch (e:any) {
    console.error(e);
    return e.response;
  }
}