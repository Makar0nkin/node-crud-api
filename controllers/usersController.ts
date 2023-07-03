import { ServerResponse } from 'node:http';
import {getAllUsers} from "../models/usersModel";
import {sendSuccessfulResponse} from "../utils/responseUtil";

export const sendAllUsers = async (res: ServerResponse) => {
  const users = await getAllUsers();
  sendSuccessfulResponse({
    res: res,
    statusCode: 200,
    data: users
  })
  // return new Promise((resolve, reject) => {
  //   resolve(users)
  // })
}