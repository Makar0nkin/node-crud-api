import { ServerResponse, IncomingMessage } from 'node:http';
import {getAllUsers, getPostData, getUser} from "../models/usersModel";
import {sendErrorResponse, sendSuccessfulResponse} from "../utils/responseUtil";
import {addUser, changeUser, deleteUser, User} from "../models/data";
import {isValidUuid} from "../utils/uuidUtil";

export const sendAllUsers = async (res: ServerResponse) => {
  const users = await getAllUsers()
  sendSuccessfulResponse({
    res,
    statusCode: 200,
    data: users
  })
}

export const sendUser = async (res: ServerResponse, id: string) => {
  if (!isValidUuid(id)){
    sendErrorResponse({
      res,
      statusCode: 400,
      message: 'Error: Incorrect uuid!'
    })
    return
  }

  const user = await getUser(id)
  if (!user) {
    sendErrorResponse({
      res,
      statusCode: 404,
      message: 'Error: User not found!'
    })
    return
  }

  sendSuccessfulResponse({
    res,
    statusCode: 200,
    data: user!
  })
}

export const createNewUser = async (req:IncomingMessage, res: ServerResponse) => {
  try{
    const user: object = await getPostData(req)

    if (!(
      user.hasOwnProperty('username') &&
      user.hasOwnProperty('age') &&
      user.hasOwnProperty('hobbies')
    )) {
      sendErrorResponse({
        res,
        statusCode: 400,
        message: 'Error: Invalid user data!'
      })
      return
    }
    addUser(<User>user)
    sendSuccessfulResponse({
      res: res,
      statusCode: 200,
      data: { message: 'User created successfully' }
    })
  } catch (e) {
    sendErrorResponse({
      res,
      statusCode: 500,
      message: 'Error: Server handled error!'
    })
  }
}

export const updateUser = async (req:IncomingMessage, res: ServerResponse, id: string)=> {
  if (!isValidUuid(id)){
    sendErrorResponse({
      res,
      statusCode: 400,
      message: 'Error: Incorrect uuid!'
    })
    return
  }
  try{
    const user: object = await getPostData(req);
    if (!(
      user.hasOwnProperty('username') ||
      user.hasOwnProperty('age') ||
      user.hasOwnProperty('hobbies')
    ) || !user) {
      sendErrorResponse({
        res,
        statusCode: 400,
        message: 'Error: Invalid user data!'
      })
      return
    }
    if (changeUser(user, id) === null) {
      sendErrorResponse({
        res,
        statusCode: 404,
        message: 'Error: User doesnt exist!'
      })
      return
    }
    sendSuccessfulResponse({
      res: res,
      statusCode: 200,
      data: { message: 'User updated successfully' }
    })
  } catch (e) {
    sendErrorResponse({
      res,
      statusCode: 500,
      message: 'Error: Server handled error!'
    })
  }

}

export const removeUser = (res: ServerResponse, id: string) => {
  if (!isValidUuid(id)){
    sendErrorResponse({
      res,
      statusCode: 400,
      message: 'Error: Incorrect uuid!'
    })
    return
  }
  if (deleteUser(id) === null) {
    sendErrorResponse({
      res,
      statusCode: 404,
      message: 'Error: User doesnt exist!'
    })
    return
  }
  sendSuccessfulResponse({
    res: res,
    statusCode: 204,
    data: { message: 'User deleted successfully' },
  })
}