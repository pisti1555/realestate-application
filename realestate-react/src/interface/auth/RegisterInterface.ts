export default interface RegistrationInterface {
  name: string,
  email:string,
  password: string,
  password_confirm: string,
  image: File|null,
  phone: string
}