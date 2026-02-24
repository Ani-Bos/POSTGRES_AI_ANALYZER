###docker exec -it pgvector-db psql -U postgres

docker run -d --name pgvector-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 pgvector/pgvector:pg16