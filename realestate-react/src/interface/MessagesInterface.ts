import { UserInterface_Get } from "./user/UserInterface"

export interface Message_Get {
  id: string,
  sender: UserInterface_Get,
  receiver: UserInterface_Get,
  title: string,
  message: string,
  time: string
} 

export interface Message_Post {
  receiver: number,
  title: string,
  message: string,
} 