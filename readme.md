docker exec -it pgvector-db-new psql -U postgres

docker run -d --name pgvector-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 pgvector/pgvector:pg16

docker compose down

docker compose build --no-cache

docker compose up

docker compose build

docker compose down

docker compose up
docker compose up --build

postgres=# \dt
                  List of relations
 Schema |          Name           | Type  |  Owner
--------+-------------------------+-------+----------
 public | employees               | table | postgres
 public | langchain_pg_collection | table | postgres
 public | langchain_pg_embedding  | table | postgres


 postgres=# select * from langchain_pg_collection limit 5;
                 uuid                 |    name     | cmetadata 
--------------------------------------+-------------+-----------
 eb9f3f0c-1c60-4cc1-bc70-7088516b8e09 | chat_memory | null
(1 row)