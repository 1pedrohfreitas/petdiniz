#!/bin/bash
echo "Parando os serviços"
docker stop install-petdiniz_front-1
#docker stop install-petdiniz_back-1

echo "Removendo os containers"
docker rm install-petdiniz_front-1
docker rm install-petdiniz_back-1

echo "Removendo as imagens"
docker rmi pedrohfreitas/petdiniz_front:1.0
docker rmi pedrohfreitas/petdiniz_back:1.0

echo "Construindo a imagem do servidor de cameras"
cd rmtp && docker build -t pedrohfreitas/petdiniz_rmtp:1.0 .

echo "Construindo a imagem do front"
cd .. && cd front && docker build -t pedrohfreitas/petdiniz_front:1.0 .

echo "Construindo a imagem do back"
cd .. && cd back && docker build -t pedrohfreitas/petdiniz_back:1.0 .

echo "Subindo a stack de serviços"
cd .. && docker compose up -d