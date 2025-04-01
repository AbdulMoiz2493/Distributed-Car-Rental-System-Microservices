# Distributed Car Rental System (Microservices)

## Overview

The **Distributed Car Rental System** is a microservices-based architecture designed for efficient car rental management. It enables users to browse available vehicles, make reservations, and handle rental transactions seamlessly. The system is built using modern technologies to ensure scalability, reliability, and maintainability.

## Features

- **User Authentication**: Secure user registration and login.
- **Car Management**: Add, update, and remove cars from the system.
- **Reservation System**: Users can book and manage car rentals.
- **Microservices Architecture**: Independently scalable services for better performance.
- **API Gateway**: Centralized API management and routing.
- **Database Management**: Efficient data storage and retrieval using MongoDB.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Microservices**: Docker, Kubernetes
- **Authentication**: JWT (JSON Web Tokens)
- **API Gateway**: Express-HTTP-Proxy
- **Containerization**: Docker
- **Orchestration**: Kubernetes

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js & npm
- Docker & Docker Compose
- Kubernetes (Minikube or any other setup)
- MongoDB

### Steps

1. **Clone the Repository**

   ```sh
   git clone https://github.com/AbdulMoiz2493/Distributed-Car-Rental-System-Microservices.git
   cd Distributed-Car-Rental-System-Microservices
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Setup Environment Variables** Create a `.env` file in the root directory and configure the necessary environment variables.

4. **Run Services using Docker Compose**

   ```sh
   docker-compose up --build
   ```

5. **Access the Application** Open your browser and visit `http://localhost:3000` (or the configured port).

## Microservices Structure

- **User Service**: Handles customer profiles and booking limits.
- **Car Service**: Manages car availability and details.
- **Booking Service**: Facilitates booking operations and ensures cars are available during the requested timeframe.
- **API Gateway**: Serves as a single entry point for clients.

## Business Logic

- Each user has a limit of 3 active bookings at a time.
- Cars can only be booked if they are available during the specified dates.
- When a booking is made:
  - The car is marked as unavailable.
  - The user’s active booking count is updated.
- Users can cancel bookings, which restores the car’s availability and decrements their active bookings.

## API Endpoints

### User Service
- `POST /users` - Register a new user.
- `GET /users/:userId` - Retrieve a user’s details.
- `PUT /users/:userId` - Update a user’s active bookings count (inter-service communication from Booking Service).

#### Database Structure:
```json
{
  "userId": "string",
  "name": "string",
  "email": "string",
  "maxBookings": 3,
  "activeBookings": 0
}
```

### Car Service
- `POST /cars` - Add a new car to the system.
- `GET /cars/:carId` - Retrieve a car’s details.
- `PUT /cars/:carId` - Update a car’s availability status (inter-service communication from Booking Service).

#### Database Structure:
```json
{
  "carId": "string",
  "model": "string",
  "location": "string",
  "isAvailable": true
}
```

### Booking Service
- `POST /bookings` - Create a booking (communicates with User and Car services to check constraints and update states).
- `GET /bookings/:userId` - Retrieve all bookings for a user.
- `DELETE /bookings/:bookingId` - Cancel a booking (communicates with User and Car services to restore states).

#### Database Structure:
```json
{
  "bookingId": "string",
  "userId": "string",
  "carId": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "active | canceled"
}
```

## Inter-Service Communication

Uses HTTP REST APIs for inter-service communication.

### Booking Service → User Service:
- Before creating a booking:
  - `GET /users/:userId` to check if the user has reached their booking limit.
- After a booking:
  - `PUT /users/:userId` to increment the active bookings count.
- When canceling a booking:
  - `PUT /users/:userId` to decrement the active bookings count.

### Booking Service → Car Service:
- Before creating a booking:
  - `GET /cars/:carId` to check if the car is available.
- After a booking:
  - `PUT /cars/:carId` to mark the car as unavailable.
- When canceling a booking:
  - `PUT /cars/:carId` to mark the car as available.

## API Gateway

The API Gateway serves as a single entry point for clients to interact with all the microservices. It simplifies routing, hides service details, and forwards requests to the appropriate service. The **express-http-proxy** library is used to forward client requests to the appropriate microservice.

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to your branch: `git push origin feature-branch`
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any queries, reach out to [**Abdul Moiz**](https://github.com/AbdulMoiz2493).
Email: abdulmoiz8895@gmail.com

