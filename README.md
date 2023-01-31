# smart-drive

## Introduction

A responsive, mobile-first web app for the automatic management of data and events from your vehicle's Control Unit by which to monitor your driving style and receive info for its maintainance.

## Features

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

4.	connect with a browser to the address "localhost://8000" by typing it into to the search bar

5.	when you want to stop containers execution, deleting them together with allocated resources, type:
```bash
    docker-compose down
```
