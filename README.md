# Transaction API

This project is a Node.js-based RESTful API for managing financial transactions.

## Features

- **Get Transactions**: Fetch paginated transaction data with filtering options (date range, transaction type, and status).
- **Get Transaction by ID**: Retrieve details for a specific transaction using its ID.
- **Get Summary**: Provides aggregated metrics such as total transaction volume, average transaction amounts, and success/failure counts.
- **Recent Transactions**: Fetch the latest transactions in real-time.
- **JWT Authentication**: Secure access to the API with token-based authentication.
- **Rate Limiting**: Prevent abuse and maintain system performance.
- **Error Logging**: Integrated error logging for troubleshooting.

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   npm install

2. **.env  configuration**:
    PORT=<port_number>
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>

3. **start the server**:
    npm start