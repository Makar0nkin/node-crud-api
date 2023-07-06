import {uuidRegExp} from "./uuidUtil";

export enum Endpoints {
  API = `/api`,
  USERS = `${Endpoints.API}/users`,
}

export const isEndpointExists = (url: string): boolean => {
  return url.startsWith(Endpoints.USERS);
}

export const isUsersEndpoint = (url: string): boolean => {
  return !!url.match(new RegExp(Endpoints.USERS + '$'))
}

export const isUserEndpoint = (url: string): boolean => {
  return !!url.match(new RegExp(Endpoints.USERS + '/'))
}

