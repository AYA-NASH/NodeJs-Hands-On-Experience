# NodeJs-Hands-On-Experience

This repository contains multiple projects developed as part of the "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)" course on Udemy. The projects demonstrate various web development techniques and technologies using Node.js.

## Projects

### [Online Shop](https://github.com/AYA-NASH/NodeJs-Hands-On-Experience/tree/main/Online-Shop)
An online shop application with checkout and payment functionalities.

#### Features
- MVC Architecture
- Express.js for routing and server-side logic
- SQL (MySQL) and NoSQL (MongoDB) databases with Sequelize and Mongoose
- User authentication and authorization
- Payment processing with Stripe.js

#### How to Run
1. Navigate to the project directory:
 ```sh
  cd online-shop
```
2. Install dependencies:
  ```
  npm install
  ```
3. Run the application:
 ```
  npm start
  ```

### [Blog Post Project](https://github.com/AYA-NASH/NodeJs-Hands-On-Experience/tree/main/Blog-Project)
This project focuses on building the backend service for a Blog-Post application using Node.js, Express, and MongoDB. The frontend is a pre-prepared React module, and our work centers on backend development and integration.

#### Features
- Set up routes for posts and resolved CORS errors for frontend-backend communication.
- Created Post and User models using Mongoose.
- Implemented CRUD operations for posts, handling both JSON and FormData requests.
- Developed user authentication and authorization with JWT.
- Linked users to their posts and managed authorization for post operations.

#### How to Run

#### 1. Frontend Module:
Install dependencies and Run the application:
```
npm install
npm start
```
**Note**\

In case of react legacy problem with node appeared, run the following:

```
export NODE_OPTIONS=--openssl-legacy-provider
```
#### 2. Backend Module:

Install dependencies and Run the application:

```
npm install
nodemon app.js
```
