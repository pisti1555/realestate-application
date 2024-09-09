import api from "./api";
import { Message_Post } from "../interface/MessagesInterface";

export const sendMessage = async (form:Message_Post) => {
  try {
    const response = await api.post('/messages/send', form);
    return response.data;
  } catch (error:any) {
    console.log(error);
    
    return error.response.data;
  }
}