# Full Stack 2nd Assignment
 Intigrating advanced Node.js pronciples using Experss framework and MongoDB while trying to apply the best practices of API development, data handling and testing.


## Damage Reports API

The repository contains an Express.js application for managing reports. It provides endpoints to perform CRUD operations on reports stored in a MongoDB database.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

### Features

Create: Add a new damage report to the system.
Read: Retrieve all damage reports or a specific report by ID.
Update: Modify an existing damage report.
Delete: Remove a damage report from the system.
Logging: Requests and system logs are recorded for tracking and debugging purposes.

### Endpoints

The API provides the following endpoints:

GET /reports: Retrieve all damage reports.
GET /reports/{id}: Retrieve a specific damage report by ID.
POST /reports: Create a new damage report.
PUT /reports/{id}: Update an existing damage report.
DELETE /reports/{id}: Delete a damage report by ID.

###  Usage

To interact with the API, you can use any HTTP client (e.g., Postman).

#### Examples:

GET All Reports:
GET http://localhost:8080/reports


GET Specific Report:
GET http://localhost:8080/reports/65c0c795c54499e0ac89cc18


POST New Report:
POST http://localhost:8080/reports

Body:
{
    "user_id": 6,
    "damage_type": "car",
    "damage_cause": "fire",
    "location": {
        "city": "Cfar Gaza",
        "street": "P",
        "building_number": 1
    },
    "damage_desc": "car was set on fire"
}

PUT Update Report:
PUT http://localhost:8080/reports/65c668cac54499e0ac3191f7

Body:
{
    "user_id": 6,
    "damage_type": "car",
    "damage_cause": "fire",
    "location": {
        "city": "Ashdod",
        "street": "C",
        "building_number": 1
    },
    "damage_desc": "car was set on fire"
}

DELETE Report:
DELETE http://localhost:8080/reports/65c392aba5313289286379fd

### Postman Documentation
https://documenter.getpostman.com/view/32170224/2s9Yyzddn3

## Testing
Unit tests are provided using Jest and Supertest. To run the tests, use the following command: npm test
