#!/bin/bash

# Build frontend and backend, then start Docker container for backend

npm run build
docker compose up -d --build
