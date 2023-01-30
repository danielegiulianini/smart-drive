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

1. clonare il progetto nella cartella di interesse

```bash
	git clone https://github.com/danielegiulianini/smart-drive
```

2.	spostarsi dentro la radice del progetto
```bash
    cd smart-drive
```

3.	costruire, creare ed avviare i container per i servizi (eventualmente utilizzando l’opzione –build se è necessario ricompilare le immagini):
```bash
    docker-compose -f docker-compose.prod.yml up --build
```

4.	collegarsi con un browser all’indirizzo "localhost://8000" digitandolo nella barra di ricerca,

5.	quando si intende terminare l’esecuzione dei container, rimuovendoli insieme alle risorse allocate, digitare:
```bash
    docker-compose down
```
