import { UserInterface_Get } from "./UserInterface"

export interface Message_Get {
  id: number,
  sender: UserInterface_Get,
  receiver: UserInterface_Get,
  title: string,
  message: string,
  time: string
  seen: boolean
}

export interface Message_Post_by_Email {
  receiver: string,
  title: string,
  message: string,
} 

export interface Message_Post {
  receiver: number,
  title: string,
  message: string,
} 