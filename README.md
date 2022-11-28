# IsoWatch Front-end

[![Status badge](https://img.shields.io/badge/status-completed-blue.svg)](https://shields.io/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c6eb1cc5-7c90-4407-b043-5f42f2d8b4be/deploy-status)](https://app.netlify.com/sites/isowatch/deploys?branch=main)

This is the client-side repository for Capstone Project: IsoWatch.

See **[deployed site](https://isowatch.netlify.app/)**.

This project is not yet 100% complete. Our targets can be found on the **[issues](https://github.com/aditydcp/isowatch-frontend/issues)**.

*Note*

Some things might change or not work due to Heroku new policy effective per Nov 28, 2022.

*Last deployed: Nov 25, 2022*

## About the Project

This project is a Capstone Project for our final year assignment. This is a simulation of IoT project using a wearable thing (in this case, WearOS wearables) to collect data, transmit it to server and have the data be presented on the client web app.

Tools used in this project:
* **Client-side Web App**
  * React.js
    * Rechart: for displaying graphs
    * React Hook Form: for making forms
    * Axios: for making API calls
    * Universal Cookie: for cookie management
  * Pusher: for listening on events of database change
* **Server-side Web App**
  * Node.js & Express.js
    * Mongoose: for creating collection schema and MongoDB connection, and also watching for database change
    * Body parser: for parsing JSON request bodies
    * Jsonwebtoken: for creating token of authorization
    * bcrypt: for encrypting password
  * MongoDB: for storing data
  * Pusher: for publishing events of database change
* **WearOS App**
  * Kotlin language
    * Android Wear dependencies: for enabling Wear-specific input, layout and materials
    * Retrofit: for sending HTTP requests
    * Moshi: for parsing JSON into and from Kotlin objects
    * OkHTTP: for dealing with backward compatibilities
    * Samsung Privileged SDK: for accessing sensors

**[Server-side repository]** can be found [here](https://github.com/aditydcp/isowatch-backend).

**[WearOS App repository]** can be found [here](https://github.com/aditydcp/isowatch-app).

As this project is not yet 100% complete. The targets for each repository can be found on their corresponding **issues** page.

For more information about the project, please **[contact me](https://github.com/aditydcp)**.

Departemen Teknik Elektro dan Teknologi Informasi

Universitas Gadjah Mada

2022

## How To

Some things you need to have installed:

- node
- npm

To start, clone this repository and go to the project directory in your terminal.

Install all the dependencies

    npm install

Start the app

    npm start

Open your browser and go to http://localhost:3000/ 

## Changelog

v0.2.1: Real-time data updates

v0.2.0: Full Dashboard view

v0.1.0: init project. Login function and Pasien List view

## Learn More about the Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
