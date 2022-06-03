#!/bin/bash
#echo "Parando os serviços"
#docker stop petdiniz-petdiniz_back-1

#echo "Removendo os containers"
#docker rm petdiniz-petdiniz_back-1

#echo "Removendo as imagens"
#docker rmi pedrohfreitas/petdiniz_back:1.0

#echo "Construindo a imagem do front"
#cd front && docker build -t pedrohfreitas/petdiniz_front:1.0 .

#echo "Subindo a stack de serviços"
#cd .. && docker compose up -d

#Criando a pasta DB caso não exista
mkdir -p /root/db