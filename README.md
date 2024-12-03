# Book Shop 

## Overview
Book Shop is a RESTful API built with **Express.js**, **TypeScript**, and **MongoDB** using Mongoose for schema and Zod for data validation. This API manages a book store's inventory and orders, ensuring data integrity and providing robust CRUD operations.

## Features

### Product Management
- Create, retrieve, update, and delete books.

### Order Management
- Place orders and update inventory dynamically.
- Prevent orders if inventory is insufficient.

### Revenue Calculation
- Calculate total revenue from all orders.

### Error Handling
- Provides generic error responses for validation errors, missing resources, and server issues.

### Clean Code & Scalability
- Modular structure for better code management and scalability.

## Technologies Used
- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Environment Variables**: dotenv

## API Endpoints

### Product Endpoints
| Method | Endpoint           | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/api/products`     | Create a new book.              |
| GET    | `/api/products`     | Retrieve all books.             |
| GET    | `/api/products/:id` | Retrieve a specific book by ID. |
| PUT    | `/api/products/:id` | Update details of a book.       |
| DELETE | `/api/products/:id` | Delete a specific book.         |

### Order Endpoints
| Method | Endpoint             | Description                       |
|--------|-----------------------|-----------------------------------|
| POST   | `/api/orders`         | Place an order for a book.        |
| GET    | `/api/orders/revenue` | Calculate total revenue.          |

## Error Handling

### Validation Errors:
- Returns detailed error messages for invalid input with clear explanations.

### Not Found Errors:
- Returns 404 errors if a book or order does not exist.

### Inventory Errors:
- Prevents orders if the inventory is insufficient, with clear error messaging.

## Setup Instructions

### Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```
### Install Dependencies
```bash
npm install
```
### Set Up Environment Variables
##### Create a `.env `file in the root directory and add:
```bash
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookshop
```
### Start the Server
```bash
npm run start:dev
```
##### The server will run on `http://localhost:5000 `
## Project Structure
```plaintext
src/
├──app/
|    ├── modules/
|    |       ├── product/   
│    |       │   ├── product.controller.ts
│    |       │   ├── product.service.ts
│    |       │   ├── product.model.ts
│    |       │   ├── product.routes.ts
│    |       │   ├── product.validation.ts
│    |       ├── order/
│    |       |   ├── order.controller.ts
│    |       |   ├── order.service.ts
│    |       |   ├── order.model.ts
│    |       |   ├── order.routes.ts
│    |       |   ├── order.validation.ts
│    |       ├── index.ts
├── app.ts
├── server.ts
```
## Testing
Use tools like **Postman** or **cURL** to test the API endpoints.

## Video Explanation
Provide a link to a video explaining the API design and functionality:  
[Video Link](#)

## Live Link
Provide the link to the live deployed application:  
[Live Link](#)


