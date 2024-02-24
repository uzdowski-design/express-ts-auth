# EXPRESS AUTHENTICATION API

An API to authenticate and manipulte users data in database.

### Structure

![API Structure](/assets/api_structure.png)

### Logic

- Any user can register
- Registered users can log in
- Authenticated users can list all users
- Authenticated users can modify only own user
- Authenticated users can delete only own user

### Database

API connects to MongoDB database.

### Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose

### Usage

Clone git repository

```
git clone git@github.com:uzdowski-design/express-ts-auth.git
```

Install dependencies

```
npm install
```

Provide env variables (create .env file for development) as per .env.example file

```
MONGODB_URI=
AUTH_SECRET=
```

Start development server

```
npm run start
```
