export default interface RegisterAgentInterface {
  name: string,
  email:string,
  password: string,
  image: File|null,
  phone: string
}