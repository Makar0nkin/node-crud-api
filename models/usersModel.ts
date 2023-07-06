// import fs from 'node:fs'
import { IncomingMessage } from "node:http";
import {users, addUser, User} from "../data/data";
import {sendErrorResponse} from "../utils/responseUtil";



export const getAllUsers = (): Promise<User[]> => {
  // return new Promise((resolve, reject) => {
  //   fs.promises.readFile('./data/users.json', { encoding: 'utf8' })
  //     .then(d => resolve(JSON.parse(d.toString())))
  // })
  return new Promise((resolve, reject) => {
    resolve(users)
  })
}

export const getUser = (id: string): Promise<User | undefined> => {
  // return new Promise((resolve, reject) => {
  //   fs.promises.readFile('./data/users.json', { encoding: 'utf8' })
  //     .then(d => resolve(JSON.parse(d.toString())))
  // })
  return new Promise((resolve, reject) => {
    // console.log(users.find(u => u.id === id))
    resolve(users.find(u => u.id === id))
  })
}

export const getPostData = (req: IncomingMessage): Promise<object> => {
  return new Promise((resolve, reject) => {
    try{
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })
      req.on('end', () => {
        resolve(JSON.parse(body))
      })
    }
    catch (e) {
      reject(e)
    }
  })
}