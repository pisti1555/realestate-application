import { UserInterface_Get } from "./UserInterface"

export interface Message_Get {
  id: string,
  sender: UserInterface_Get,
  receiver: UserInterface_Get,
  title: string,
  message: string,
  time: string
  seen: boolean
} 

export interface Message_Post {
  receiver: number,
  title: string,
  message: string,
} 