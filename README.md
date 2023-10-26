# smart-drive

## Introduction

A responsive, mobile-first app that acts as a support for the optimization of the user's driving style in terms of polluting emissions, safety, comfort by applying gamification principles, and an infrastructure for processing the data acquired from the vehicle control unit by means of OBD-II standard and a low-cost NodeMCU board.

## Features
Features provided by the web app are:

- user signup and authentication through password as a requirement for accessing app features.
- vehicles registration by which to track all data acquired and see related statistics.
- user's driving style scoring leveraging a cumulative, multidimensional schema that consider its driving story, cumulatively.
- real-time acoustic driving assistant, giving feedbacks during driving.
- users levels system based XP points gathered by driving.
- trips tracking, measurements will be gathered into spatio-temporal units called trips, enriched with driving scores and statistics.
- progress tracking, as a mean to encourage app usage.
- trips statistics generation, to monitor every drive. 
- real-time dashboard (telemetry) while driving, as a counterpart of vehicle's dashboard.
- custom, eco-driving badges assignment, rewarding partial goals concerning app use and consideration, as well as good practice in terms of eco-driving.
- community leaderboard, by which the user can compare his behaviour against other users and see where he needs to improve most.
- real-time notification system to inform the user of the main app events.

## How to deploy

### Running with emulated ECU

#### Global prerequisites
- Git
- Docker
- web browser with support for socket.io
- NodeMCU board
- Arduino IDE
- Arduino UNO board

#### Backend & Frontend

Steps to deploy and use smart-drive web application are the following:

1. clone the repo into the desired folder:

```bash
    git clone https://github.com/danielegiulianini/smart-drive
```

2.	move inside the downloaded project root folder:
```bash
    cd smart-drive
```

3.	build, create and start service containers (possibly with the --build option to recompile Docker images):
```bash
    docker-compose -f docker-compose.prod.yml up --build
```

4.	connect with a browser to the address "http://localhost:8000" by typing it into to the search bar

5.	when you want to stop containers execution, deleting them together with allocated resources, type:
```bash
    docker-compose down
```
