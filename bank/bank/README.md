# Get started

## Prerequisites

Before running the application locally, make sure you have:

- Java 17 or newer installed
- Maven or use the included Maven wrapper (`mvnw`)
- MongoDB (optional — required only if you want persisted data)
- An API client like Postman/cURL (optional)

## Example cURL command

Create an account (example):
```bash
curl -X POST "http://localhost:8080/account/create" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","initialDeposit":1000}'


This short guide shows how to get the application running locally:

1) Open PowerShell and go to the bank module folder:

2) Start MongoDB locally if you want to use the bundled configuration. If you don't have Mongo, you can still run the app but some features that persist data will not work.

3) Build and run the app using the Maven wrapper:

```powershell
.\mvnw.cmd clean package
.\mvnw.cmd spring-boot:run
```

4) Open a browser or API client and visit:

- http://localhost:8080

Useful endpoints:

- Create account: POST /account/create
- Get account: GET /account/{accountNumber}
- Deposit: PUT /account/deposit/{accountNumber}/{amount}

Notes
- Default MongoDB connection is set in `src/main/resources/application.properties`.
- Run the `spring-boot:run` step and you should see the application start on port 8080.