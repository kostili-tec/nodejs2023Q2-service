# Home Library Service

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/kostili-tec/nodejs2023Q2-service.git
   ```
2. Switch branch 
   ```
   git switch develop
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application, follow the instructions below:

1. To check the "PORT value is stored into .env file" feature, you need to create `.development.env` and `.production.env` files.
2. In each file, specify the desired port number, for example: `PORT=4000` (default).

After completing the steps above, you can start the application using either of the following commands:
- For production mode: `npm start`
- For development mode: `npm run start:dev`

The Swagger documentation is available at: `http://localhost:PORT/docs`, where the `PORT` value is taken from the `.env` files, with the default value being `4000`.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
