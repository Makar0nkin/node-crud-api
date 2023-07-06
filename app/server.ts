// @ts-ignore
import http from 'node:http'
import {Endpoints, isEndpointExists, isUserEndpoint, isUsersEndpoint} from "../utils/urlUtil";
import {sendErrorResponse, sendSuccessfulResponse} from "../utils/responseUtil";
import {Methods} from "../utils/enumMethods";
import {createNewUser, removeUser, sendAllUsers, sendUser, updateUser} from "../controllers/usersController";

export const server = http.createServer((req, res): void => {
  const { method, url } = req
  console.log(`method=${method}, url=${url}`)

  if (!url || !isEndpointExists(url)){
    sendErrorResponse({
      res: res,
      statusCode: 404,
      message: 'Error: Invalid URL!'
    })
    return;
  }

  if (isUsersEndpoint(url)) {
    switch (method) {
      case Methods.GET:
        sendAllUsers(res)
        break
      case Methods.POST:
        createNewUser(req, res)
        break
      default:
        sendErrorResponse({
          res: res,
          statusCode: 404,
          message: 'Error: Invalid Method'
        })
    }
  } else if (isUserEndpoint(url)){
    const userID = url.split('/')[3]
    switch (method) {
      case Methods.GET:
        sendUser(res, userID)
        break
      case Methods.PUT:
        updateUser(req, res, userID)
        break
      case Methods.DELETE:
        removeUser(res, userID)
        break
      default:
        sendErrorResponse({
          res: res,
          statusCode: 404,
          message: 'Error: Invalid Method'
        })
    }
  } else {
    sendErrorResponse({
      res: res,
      statusCode: 404,
      message: 'Error: Invalid URL'
    })
  }

})

