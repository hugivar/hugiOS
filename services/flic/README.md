# Flic Server

## Building docker image
```sh
docker build . -t flic
```

## Running Flic server locally
```sh
docker run -d \
--name flic \
-p 3001:3001 \
-e TZ="America/New_York" \
flic
```