# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/AlekseyKrupsky/nodejs2022Q2-service
```

## Create .env

Create .env file from .env.example

## Run app in docker
```
docker-compose build
```
```
docker-compose up
```

Use -d flag to run as daemon `docker-compose up -d`

## Run migrations

Connect to container (example for linux)

Run `docker ps` to show containers running on you machine

Find nodejs containerId

Run `docker exec -it {containerId} sh`

Run `npm run migration:run`

When this command execution is completed you can run tests or use the app with Postman

## Testing inside the container

Connect to container

Use `docker ps` to find nodejs containerId

Run `docker exec -it {containerId} sh`

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
