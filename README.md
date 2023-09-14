# User Address Management API

This project provides an API for managing users and their delivery addresses. It includes two entities:

1. Address (id, userId, country, state, city, zipCode, address)
2. User (id, firstName, lastName, phoneNumber, birthday, image)

The project implements CRUD operations for both addresses and users and stores all data in a MySQL database.

## Technologies Used

- Node.js with Express.js
- Sequelize ORM for database operations
- MySQL database for data storage
- fs.promises for file handling
- Swagger for API documentation

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

https://github.com/mstrilec/SapientPro-testTask

2. Install dependencies:

npm install

3. Configure the database:
   - Create a MySQL database.
   - Update the database configuration in the `config/config.json` file.

4. Run the migrations:

npx sequelize db:migrate

5. Run the server

npm start

6. Access the API documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) using Swagger.

## API Endpoints

- `GET /users`: Get all users.
- `GET /users/{userId}`: Get a user by ID.
- `POST /users`: Create a new user.
- `PUT /users/{userId}`: Update a user by ID.
- `DELETE /users/{userId}`: Delete a user by ID.

- `GET /addresses`: Get all addresses.
- `GET /addresses/{addressId}`: Get an address by ID.
- `POST /addresses`: Create a new address.
- `PUT /addresses/{addressId}`: Update an address by ID.
- `DELETE /addresses/{addressId}`: Delete an address by ID.

## Validation Rules

Validation rules for entities:

### Address:

- id: number (required)
- userId: number (required)
- country: string (required)
- state: string (optional)
- city: string (required)
- zipCode: number (5 digits, required)
- address: string (required)

### User:

- id: number (required)
- firstName: string (required)
- lastName: string (required)
- phoneNumber: string (required)
- birthday: date (optional)
- image: required

