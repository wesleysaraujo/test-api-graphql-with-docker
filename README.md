# Subir ambientes
docker-compose up -d

# Popular Banco de Dados
docker exec -i mysql-api-descomplica mysql -uroot -ppssS76TiD5 < api/db/script.sql
