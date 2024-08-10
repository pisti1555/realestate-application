import api from "./api";

export async function createProperty(
  form:{
    title:string, 
    price:number, 
    city:string, 
    postal_code:string, 
    address:string, 
    description:string
  }
) {
  try {
    const response = await api.post('/properties', form);
    return response.data;
  } catch (error:any) {
    throw new Error(error);
  }
}


export async function editProperty(
  id:string,
  form:{
    title:string, 
    price:number, 
    city:string, 
    postal_code:string, 
    address:string, 
    description:string
  }
) {
  try {
    const response = await api.patch('/properties/' + id, form);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response.data.message);
  }
}