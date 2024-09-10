import { UserInterface_Get } from "../user/UserInterface"

export interface PropertyInterface_Get {
  id: string,
  image: string,
  title: string,
  price: number,
  city: string,
  postal_code: string,
  address: string,
  description: string,
  user: UserInterface_Get
}

export interface PropertyInterface_Store {
  image: File|null,
  title: string,
  price: number,
  city: string,
  postal_code: string,
  address: string,
  description: string
}

export interface PropertyInterface_Search {
  query: string,
  minPrice: number,
  maxPrice: number,
  minRating: number,
  maxRating: number,
  orderby: string
}