# smart-drive

## Introduction

A responsive, mobile-first app that acts as a support for the optimization of the user's driving style in terms of polluting emissions, safety, comfort by applying gamification principles and an infrastrcture for processing of the data acquired from the vehicle control unit by means of OBD-II standard.

## Features
Features provided by the web app are:

- user signup
- vehicles registration
- user' driving Style scoring
- real-time acoustic driving assistant 
- trips tracking
- progress tracking
- trips statistics generation
- real-time dashboard (telemetry)
- custom, eco-driving badges assignment
- community leaderboard
- real-time notification system

## How to deploy

### Prerequisites

- Git
- Docker
- browser

### Steps

Steps to deploy and use smart-drive web application are:

1. clone the repo into the desired folder:

```bash
    git clone https://github.com/danielegiulianini/smart-drive
```

2.	move inside the downloaded project root folder:
```bash
    cd smart-drive
```

3.	build, create and start service containers (possibly with the --build option to recompoile Docker images):
```bash
    docker-compose -f docker-compose.prod.yml up --build
```

4.	connect with a browser to the address "http://localhost:8000" by typing it into to the search bar

5.	when you want to stop containers execution, deleting them together with allocated resources, type:
```bash
    docker-compose down
```
