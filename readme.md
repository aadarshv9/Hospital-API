# HOSPITAL API
 
OVERIEW :-

- An API designed for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients

NPM PACKAGE :-

- express for running server and creating routes
- mongoose ODM for interacting with mongoDB
- dotenv to configure .env file(used for storing sensitive information)
- passport for authentication
- passport-jwt-strategy for authenticating and autherization using JWT
- nodemailer for sending mail
- cookie-parser for parsing cookies
- generate-passwords for creating random passwords
- jsonwebtoken for creating token

API ENDPOINTS DETAIL :-

--> localhost:8000/api/v1/doctors/register
    -- This endpoint is used to register the doctor.
    -- Pass email, password, name in the body of request.

--> localhost:8000/api/v1/doctors/login
    -- This endpoint is used to login a doctor generate token for autherization.
    -- Pass email, password in the body of request.

--> localhost:8000/api/v1/patients/register
    -- This endpoint is used by a doctor to register a patient using doctor's token generated from "localhost:8000/api/v1/doctors/login".
    -- Pass name, contact, password of patient in the body of request and Pass doctor's token in header of the request.

--> localhost:8000/api/v1/patients/:id/create_report
    -- This endpoint is used by a doctor to create report of patient.
    -- Pass status, comments in the body of request and Pass patient_id in request as a parameters and Pass token in header part of the request(header --> authorization --> bearer token_generated).

--> localhost:8000/api/v1/patients/:id/all_reports
    -- This endpoint is used by a patient to view their all reports.
    -- Pass 'patient-id' in request as a parameter and Pass 'patient_password' in body of the request.

--> localhost:8000/api/v1/reports/:status
    -- This endpoint is used by a doctor to check all their generated reports till date according to the status.
    -- Pass status in request as a parameter and token in header part of the request(header --> authorization --> bearer token_generated).

--> localhost:8000/api/v1/patients
    -- This endpoint is used by a doctor retrieve a list of all their patients.
    -- Pass token in header part of the request(header --> authorization --> bearer token_generated).

FOLDER STRUCTURE :-

    |__HOSPITAL API
        |__config
        |   |__ mongoose.js
        |   |__ nodemailer.js
        |   |__ passport-jwt-strategy.js
        |__controllers
        |   |__api
        |       |__v1
        |           |__ doctors_api.js
        |           |__ patients_api.js
        |           |__ reports_api.js
        |__ mailers
            |__ password_mailer.js
        |__models
        |   |__ doctor.js
        |   |__ patient.js
        |   |__ report.js
        |__routes
        |   |__ api
        |        |__v1
        |           |__ doctor.js
        |           |__ index.js
        |           |__ patient.js
        |           |__ report.js
        |        |__ index.js
        |   |__ index.js
        |
        |__ .gitignore
        |__ index.js
        |__ package-lock.json
        |__ package.json
        |__ ReadMe.md
        
Run Project :-

- npm install  --> to install dependencies
- npm start     --> to run the server on localhost:8000
