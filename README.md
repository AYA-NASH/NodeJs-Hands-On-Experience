# NodeJs-Hands-On-Experience

This repository contains a collection of projects developed as part of the "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)" course on Udemy. Each project showcases different aspects of web development using Node.js, ranging from server-side rendering and RESTful APIs to GraphQL and TypeScript integrations. This hands-on experience provides practical insights into building robust and scalable web applications with Node.js.

## Projects

### [Online Shop](https://github.com/AYA-NASH/NodeJs-Hands-On-Experience/tree/main/Online-Shop)
An online shop application that demonstrates a complete e-commerce solution with server-side rendered views. This app includes features like product listings, user authentication, shopping cart, and checkout with payment processing.


#### Features
- MVC Architecture for clean and maintainable code.
- Server-side rendered views using EJS templates.
- Express.js for routing and server-side logic.
- SQL (MySQL) and NoSQL (MongoDB) databases with Sequelize and Mongoose.
- User authentication and authorization.
- Payment processing with Stripe.js.

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
- Added a GraphQL API version available in the `Blog-Posts-GraphQL` branch.
- Included unit tests for the REST API version using Mocha, Chai, and Sinon.

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

To Switch to GraphQL version:
```
git checkout Blog-Posts-GraphQL
```

Install dependencies and Run the application:

```
npm install
nodemon app.js
```

Running Tests (REST API):

Install dependencies and run the tests:

```
npm test
```

### [TypeScript TODO App](https://github.com/AYA-NASH/NodeJs-Hands-On-Experience/tree/main/TypeScript-TODO)
This part aims to introduce TypeScript basics and how it works with REST API routes in the form of building a simple TODO app.

#### Features
- Performing CRUD operations on TODO items with REST routes.

#### How to Run
1. Initialize TypeScript:
```sh
tsc --init
```
2. Initialize npm:
```
npm init
```
3. Compile TypeScript files:
```
tsc
```
4. Run the server:
```
node dist/app.js
```
