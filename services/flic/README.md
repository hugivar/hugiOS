# Flic Server

## Running Flic server locally
```sh
docker run -d \
--name flic \
-p 3001:3001 \
-e TZ="America/New_York" \
flic
```