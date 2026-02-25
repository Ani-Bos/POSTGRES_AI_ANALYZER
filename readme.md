###docker exec -it pgvector-db psql -U postgres

docker run -d --name pgvector-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 pgvector/pgvector:pg16

docker compose down -v

docker compose build --no-cache

docker compose up

docker compose build
docker compose up
docker compose up --build
