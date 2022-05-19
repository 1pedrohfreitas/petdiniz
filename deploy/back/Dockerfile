FROM golang:1.18.2-alpine3.15

LABEL AUTHOR="Pedro Henrique Freitas"

RUN mkdir /app
ADD . /app
WORKDIR /app
#RUN go build -o main .
EXPOSE 5000
CMD ["/app/main"]