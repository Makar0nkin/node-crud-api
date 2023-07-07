import {IncomingMessage} from "node:http";
import {users, User} from "./data";


export const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    resolve(users)
  })
}

export const getUser = (id: string): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    resolve(users.find(u => u.id === id))
  })
}

export const getPostData = (req: IncomingMessage): Promise<object> => {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        let res = JSON.parse(body)
        resolve(res)
      } catch (e) {
        console.log("ERRRRR")
        reject(e)
      }
    })
  })
}