import users from '../data/users.json' assert { type: 'json' }

export const getAllUsers = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    resolve(users)
  })
}