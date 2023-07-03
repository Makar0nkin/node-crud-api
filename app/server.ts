// @ts-ignore
import http from 'node:http'
import {Endpoints, isEndpointExists, isUserEndpoint, isUsersEndpoint} from "../utils/urlUtil";
import {sendErrorResponse, sendSuccessfulResponse} from "../utils/responseUtil";
import { Methods } from "../utils/enumMethods";
import {sendAllUsers} from "../controllers/usersController";

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
    }
  } else if (isUserEndpoint(url)){
    const userID = Number(url.split('/')[3])

  } else {
    sendErrorResponse({
      res: res,
      statusCode: 404,
      message: 'Error: Invalid URL'
    })
  }
})

