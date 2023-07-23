# AirBnbClone

![HomePage](https://res.cloudinary.com/dkgoet9em/image/upload/v1690086153/TiffinManagment/AirBnbClone_hyb0no.png)

AirBnbClone is a basic Clone Application that is build using the MERN Stack stands for MongoDB, ExpressJS, ReactJS, NodeJS.

## Live Website

- [AirBnbClone](https://air-bnb-client.vercel.app/)

# Features

- Sign Up
- Sign In
- Serching For Accomodation
- Booking Accomodation
- Adding Your Own Accomodations


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**Deployment:** Vercel(Frontend), Backend(Cyclic)

## Installation Guide

To Run AirBnbClone project on local system follow the simple steps:

### Step-1

clone this project on your local system

```bash
  git clone https://github.com/AMS006/AirBnb-Clone
```

### Step-2 Installing Dependency

Installing Dependency for client and Server both

```bash
  cd AirBnb-Clone
```

Installing Dependency for client

```bash
  cd client
  npm i
```

Installing Dependency for server

```bash
  cd server
  npm i
```

### Step-3 Adding Environment Variables. If you want to create your own database you need to change Following link

(https://shy-lime-bull-tux.cyclic.app/) -> (http://localhost:4000) in all files of client folder

## Else you can use my database without changing the above link and  without adding below Environment variables

To run this project, you will need to add the following environment variables to your .env file in server folder


### Environment Variables for Server


`MONGO_URI` : For this you need to create a database on MONGO CLOUD 

`JWT_SECRET` : It will be a random combinations of characters and digits

`CLOUDINARY_CLOUD_NAME` : From Cloudinary

`CLOUDINARY_API_KEY` : From Cloudinary

`CLOUDINARY_API_SECRET` : From Cloudinary


### Step-4 Start the Application on local machine

#### To Start Frontend Server(or client):

Move into client Directory by

```bash
  cd client
```

start the Frontend server by

```bash
  npm start
```

after ruunning this command, It will start after some time.

#### To Start Backend Server(or server):

Move into server Directory by

```bash
  cd server
```

start the Backend server by

```bash
  npm start
```

after starting the both Frontend and Backend server you can access application on the browser by visiting (http://localhost:3000)
