#!/bin/sh

docker-compose down -v
# Start the database service
# The -d option runs the container in detached mode (in the background)
docker-compose up -d postgres

# Wait until the database is ready
echo "Waiting for the database to be ready..."
# The until loop checks the readiness of the database
# docker-compose exec runs a command in a running container
# pg_isready is a PostgreSQL utility to check if the database server is accepting connections
until docker-compose exec postgres pg_isready -U finances -d financials; do
  # If the database is not ready, it prints a message and waits for 5 seconds before retrying
  echo "Database is not ready, retrying in 5 seconds..."
  sleep 5
done

# Start the application service
# This command starts the app service defined in the docker-compose.yml file
docker-compose up client --build -d

docker exec personal-finances-client-1 npx prisma migrate dev --name init