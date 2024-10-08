import { UserInterface_Get } from "../interface/UserInterface";
import api from "./api";

export const getUser = async () : Promise<UserInterface_Get | undefined> => {
  if (!localStorage.getItem('token')) return;
  
  api.get('/user').then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return null;
    }
  }).catch((error:any) => {
    return null;
  });
};