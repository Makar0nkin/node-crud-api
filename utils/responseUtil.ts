import { ServerResponse } from 'node:http';

export interface ErrorResponseData {
  res: ServerResponse,
  statusCode: number,
  message: string
}

export interface SuccessResponseData{
  res: ServerResponse,
  statusCode: number,
  headers?: object,
  data: object
}

export const sendErrorResponse = ({res, statusCode, message}: ErrorResponseData): void => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ statusCode, message }))
}

export const sendSuccessfulResponse = ({
     res,
     statusCode,
     headers = { 'Content-Type': 'application/json' },
     data
  }: SuccessResponseData): void => {
  res.writeHead(statusCode, {...headers})
  res.end(JSON.stringify(data))
}