// @ts-ignore
import http from 'node:http'

export const server = http.createServer((req, res) => {
  const { method, url } = req
  console.log(`method=${method}, url=${url}`)

  const usersEndpoint = '/api/users';
})

