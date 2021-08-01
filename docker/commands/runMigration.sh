#!/usr/bin/bash
docker exec api_v1 /bin/ash -c "yarn typeorm migration:run"