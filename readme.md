

# Application documentation

## Overview
Hello, this is web application built in nodeJS, typescript with database mysql, using PrismaORM, and containerized. This API project was created as one of the company's recruitment processes (LOGIQUE / KAZOKU).

## Author 
*Efendi Salim*

## How to Run 
- Install Docker
If you don't have Docker installed, you can download and install it from the official Docker website: [Download Docker](https://docs.docker.com/get-docker/)

- Clone the Project Clone the repository to your local machine using the following command:
 ```bash 
 git clone <repository-url>
 ```
 - Build and Start the Application
 ```bash
 cd <project-directory> 
 docker compose up --build
 ```

## Specs

### 1. TypeScript
- **Usage:** The entire project is implemented in TypeScript, including type definitions for data and API parameters.
- **Files:** 
  - `src/index.ts` - Main application entry point.
  - `src/controllers/Book.controller.ts` - Controller for book CRUD operations.
  - `src/routes/Book.routes.ts` - Routing for book-related API endpoints.
  - `src/utils/response.mapper.ts` - Utility for standardizing API responses.
  - `src/tests/book.test.ts` - Unit tests for book-related endpoints.

### 2. Error Handling
- **Implemented:** Comprehensive error handling for various cases:
  - **Data Not Found:** Returns a 404 status with a message indicating that the resource was not found.
  - **Input Validation:** Validates request data using `express-validator` and returns a 400 status with details on validation errors.
  - **Server Errors:** Catches and logs server errors, returning a 500 status with a generic error message.

### 3. Unit Tests
- **Testing Framework:** Jest is used for unit testing.
- **Tests Included:**
  - **Create Book:** Tests creation of a new book.
  - **Get Book by ID:** Tests retrieval of a book by its ID.
  - **Get All Books with Pagination:** Tests fetching of all books with pagination.
  - **Update Book:** Tests updating an existing book.
  - **Delete Book:** Tests deletion of a book.

### 4. Documentation
- **API Documentation:** Detailed API documentation is available at [Postman Documentation](https://documenter.getpostman.com/view/2252484/2sA3s6GW24). This includes information on each endpoint, example requests, and responses.

### 5. Security
- **Rate Limiting:** Implemented using `express-rate-limit` to prevent abuse of the API.
- **Input Sanitization:** Ensured by using validation libraries like `express-validator`.

### 6. Performance
- **Optimizations:**
  - **Database Queries:** Optimized queries to ensure efficient data retrieval and manipulation.
  - **Middleware Usage:** Properly managed middleware to reduce performance overhead.

### 7. Containerization
- **Docker Configuration:**
  - **Dockerfile:** Defines the environment for the application.
  - **docker-compose.yml:** Manages multi-container Docker applications, including the app and MySQL database.
  