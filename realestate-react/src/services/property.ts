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

export const searchProperties = async (form:any) => {
  const params = new URLSearchParams();

  if (form.query) {
    params.append('query', form.query);
  }
  if (form.minPrice) {
    params.append('minPrice', form.minPrice);
  }
  if (form.maxPrice) {
    params.append('maxPrice', form.maxPrice);
  }
  if (form.minRating) {
    params.append('minRating', form.minRating);
  }
  if (form.maxRating) {
    params.append('maxRating', form.maxRating);
  }
  if (form.orderby) {
    params.append('orderby', form.orderby);
  }

  const response = await api.get('/search?' + params.toString());
  return response.data;
}