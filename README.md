# REST API
## _NOMASHOP, Node js Express js Postgresql_

## Features

Nomashop is currently extended with the following features.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| es9 | latest ECMAScript features |
| database | postgresql |
| Authentication and authorization | bcrypt |
| Security | jsonwebtoken |
| Environment variables | dotenv |
| CORS | cors |
| Linting | ESLint and Prettier |

## Tech

Nomashop api uses a number of open source projects to work properly:

- [babel-polyfill] - Babel includes a polyfill that includes a custom regenerator runtime and core-js.
- [bcrypt] - A library to help you hash passwords.
- [body-parser] - middleware to handle post body request.
- [cors] - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [dotenv] - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
- [Express] - node.js framework
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens.
- [make-runnable](https://github.com/super-cache-money/make-runnable) - Run Exported Functions Directly From The Command Line
- [multer](https://github.com/expressjs/multer) - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
- [node-gyp](https://github.com/nodejs/node-gyp) - node-gyp is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js. 
- [node-postgres](https://github.com/brianc/node-postgres) - Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.
- [npm-run-all](https://github.com/mysticatea/npm-run-all) - A CLI tool to run multiple npm-scripts in parallel or sequential.
- [pg](https://github.com/brianc/node-postgres) - node-postgres is a collection of node.js modules for interfacing with your PostgreSQL database.

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

 ## Installation

Nomashop requires last stable [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.


clone project git repository
```sh
git clone git@gitlab.com:brahmiaminee/nomashop_api_nodejs_express_postgresql.git
```
browse into project directory
```sh
cd nomashop_api_nodejs_express_postgresql
```

install project dependencies
```sh
npm install
```

run project
```sh
npm start
```

run project setup to create database table
```sh
npm run setup
```

> Note: `nomashop` is database name and is required for connecting to postresql, don't forgot to add it.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
localhost:5000
```

## Environment Variables

The environment variables can be found and modified in the .env file. They come with these default values:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASS=rtfgcv
PG_DB=nomashop
PG_PORT=5432
APP_PORT=5000
```
## Project Structure

```bash
src\
 |--config\                # Database configuration
   |--api
      |--v1      
        |--routes\         # Routes
        |--controllers\    # Route controllers (controller layer)
        |--services\       # Business logic (service layer)
 |--middleware\            # Custom express middlewares
 |--utils\                 # Utility classes and functions
 |--auth\                  # Token validation
 |--server.js              # App entry point
```

## API Documentation
# API Endpoints

List of available routes:


`/** POST - Create new user */` : <https://localhost:5000/api/v1/users/register>

`/** POST - Authenticate user */` : <https://localhost:5000/api/v1/users/login>

`/** GET  - Get list of users */` : <https://localhost:5000/api/v1/users>

`/** PATCH  - Update user info */` : <https://localhost:5000/api/v1/users>

`/** GET  - Get user by id */` : <https://localhost:5000/api/v1/users/:id>

`/** PATCH  - Update user password */` : <https://localhost:5000/api/v1/users/updatepass>

## License
[MIT](https://choosealicense.com/licenses/mit/)


[body-parser]: <https://github.com/expressjs/body-parser>
[bcrypt]: <https://github.com/kelektiv/node.bcrypt.js/>
[dotenv]: <https://github.com/motdotla/dotenv>
[cors]: <https://github.com/expressjs/cors>
[express]: <https://github.com/expressjs/express>
[babel-polyfill]: <https://github.com/babel/babel/tree/master/packages/babel-polyfill>
