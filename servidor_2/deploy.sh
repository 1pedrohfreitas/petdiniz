#!/bin/bash
echo "Parando os serviços"
docker stop servidor_2-petsdiniz_front-1
#docker stop petdiniz-petdiniz_rmtp-1

echo "Removendo os containers"
docker rm servidor_2-petsdiniz_front-1 -f
#docker rm petdiniz-petdiniz_rmtp-1

echo "Removendo as imagens"
docker rmi pedrohfreitas/petdiniz_front:1.0
#docker rmi pedrohfreitas/petdiniz_rmtp:1.0

echo "Subindo a stack de serviços"
docker compose up -d