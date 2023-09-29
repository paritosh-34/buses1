# Public Bus Location Tracking POC - Node.js

## Overview

This Node.js project is a Proof of Concept (POC) for adding location tracking to public buses, with the goal of making public transportation more accessible and efficient while reducing bus stop waiting times. It leverages technologies such as Express, MongoDB, Socket.IO, and Nunjucks to achieve this.

## Features

### Real-time Location Tracking

- Real-time bus location tracking is implemented using Socket.IO.
- The project allows buses to send their current locations to the server, which is then broadcasted to clients in real-time.

### User Authentication

- User authentication can be integrated to access specific functionalities.
- User sessions can be managed to provide personalized experiences.

### Data Storage

- MongoDB is used to store bus location data.
- The `Location` model is defined to structure the data.

### RESTful API

- The project exposes a RESTful API for various operations.
- Endpoints include `/api/locations` for posting bus locations and `/api/users` for user-related operations.

## Prerequisites

Before running this project, ensure that you have the following dependencies and setup:

- Node.js installed on your system.
- MongoDB database connection available.
- Necessary npm packages installed by running `npm install` in the project directory.

## Installation

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/your-username/public-bus-tracking.git
   cd public-bus-tracking
   ```

2. Install the required npm packages:

   ```
   npm install
   ```

3. Configure the MongoDB connection by editing the MongoDB URI in `index.js`.

4. Start the server:

   ```
   npm start
   ```

The application should now be running locally on `http://localhost:3000`.

## Usage

1. Visit `http://localhost:3000` in your web browser.
2. Explore the various functionalities of the application.

## API Documentation

### POST Bus Location

- **Endpoint**: `/api/locations`
- **Description**: Posts the current location of a bus.
- **Request Body**:
  - `name` (optional): Name of the bus.
  - `lat`: Latitude coordinate of the bus.
  - `lon`: Longitude coordinate of the bus.

### User Management

- **Endpoint**: `/api/users`
- **Description**: Perform user-related operations (e.g., authentication, registration).

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request with your changes. We welcome contributions from the community.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Author

- Your Name
- Contact: your.email@example.com

Feel free to contact the author with any questions or feedback regarding this project.
