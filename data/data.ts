import { v4 as uuidv4 } from 'uuid';

export interface User {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}
export const users: User[] = [];

export const addUser = ({username, age, hobbies}: User) => {
  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  }

  users.push(newUser)
  return newUser
}

export const changeUser = (newUserData: object, id: string) => {
  const index: number = users.findIndex((user) => user.id === id)
  if (index === -1) {
    return null
  }

  const {username, age, hobbies} = <User>newUserData

  users[index] = {
    id,
    username: username || users[index].username,
    age: age || users[index].age,
    hobbies: hobbies || users[index].hobbies,
  }


  return users[index]
};

export const deleteUser = (userId: string): User | null => {
  const index = users.findIndex((user) => user.id === userId);
  const userToDelete = users[index]

  if (index === -1) {
    console.log(`DELETE USER ${index}`, userToDelete)
    return null;
  }

  users.splice(index, 1);
  return userToDelete;
};