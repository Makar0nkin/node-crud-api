# Installation
1. Install dependencies
~~~ 
npm install
~~~

2. Create a .env file in the root directory and specify the `PORT` value or create env variable in your system.
For example:
~~~
PORT=4000
~~~



# Running
- __Dev mode__
~~~
npm run start:dev
~~~
At this case app automatically restart after any of files was changed

- __Production mode__
~~~
npm run start:prod
~~~
At this case the project build will be made by `webpack` and start after that


# Using
- **GET** `api/users` is used to get all persons
    - Server answer with `status code` **200** and all users records
- **GET** `api/users/{userId}`
    - Server answer with `status code` **200** and record with `id === userId` if it exists
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
    - Server answer with `status code` **201** and newly created record
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
- **PUT** `api/users/{userId}` is used to update existing user
    - Server answer with` status code` **200** and updated record
    - Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **DELETE** `api/users/{userId}` is used to delete existing user from database
    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- If app handle an error then the server will answer with `status code` **500** and some message
- Request to non-existing endpoints are handled (server answer with `status code` **404**) 