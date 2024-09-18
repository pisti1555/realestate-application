export default interface RegistrationInterface {
  name: string,
  email:string,
  password: string,
  password_confirm: string,
  image: File | null,
  phone: string,
  description: string,
  tax_number: string,
  sex: string,
  country: string,
  city: string,
  postal_code: string,
  birth_date: string,
  agency: string
}