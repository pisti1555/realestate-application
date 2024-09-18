export interface UserInterface_Get {
  id: number,
  image: string | undefined,
  name: string | undefined,
  email: string | undefined,
  phone: string | undefined,
  joined: string | undefined,
  role: number | undefined,
  description: string | undefined,
  birth_date: string | undefined,
  tax_number: string | undefined,
  sex: string | undefined,
  country: string | undefined,
  city: string | undefined,
  postal_code: string | undefined,
  new_msg_count: number | 0
}