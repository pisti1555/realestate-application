import api from "./api";
import { PropertyInterface_Store } from "../interface/property/propertyInterface";

export async function createProperty(form:PropertyInterface_Store) {
  try {
    const response = await api.post('/properties', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.data;
  } catch (error:any) {
    throw new Error(error);
  }
}


export async function editProperty(
  id:string,
  form:{
    image:File|null,
    title:string, 
    price:number, 
    city:string, 
    postal_code:string, 
    address:string, 
    description:string
  }
) {
  try {
    const response = await api.post('/properties/' + id, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error:any) {
    console.log(error);
    
    throw new Error(error.response.data.message);
  }
}