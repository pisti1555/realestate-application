export interface PropertyInterface_Get {
  image: string,
  title: string,
  price: number,
  city: string,
  postal_code: string,
  address: string,
  description: string
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