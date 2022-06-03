#!/bin/bash
echo "Parando os serviços"
docker stop petdiniz-petdiniz_front-1
docker stop petdiniz-petdiniz_rmtp-1

echo "Removendo os containers"
docker rm petdiniz-petdiniz_front-1
docker rm petdiniz-petdiniz_rmtp-1

echo "Removendo as imagens"
docker rmi pedrohfreitas/petdiniz_front:1.0
docker rmi pedrohfreitas/petdiniz_rmtp:1.0

echo "Construindo a imagem do front"
cd front && docker build -t pedrohfreitas/petdiniz_front:1.0 .

echo "Construindo a imagem do rmtp"
cd .. && cd back && docker build -t pedrohfreitas/petdiniz_rmtp:1.0 .

echo "Subindo a stack de serviços"
cd .. && docker compose up -d