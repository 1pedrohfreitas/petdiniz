#!/bin/bash
#echo "Parando os serviços"
docker stop servidor_1-petdiniz_back-1

#echo "Removendo os containers"
docker rm servidor_1-petdiniz_back-1 -f

#echo "Removendo as imagens"
docker rmi pedrohfreitas/petdiniz_back:1.0 -f

#echo "Subindo a stack de serviços"
docker compose up -d

#Criando a pasta DB caso não exista
#mkdir -p /root/db