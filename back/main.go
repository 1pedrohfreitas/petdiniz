package main

import (
	"github.com/1pedrohfreitas/pcams_back_go/database"
	"github.com/1pedrohfreitas/pcams_back_go/server"
	"github.com/gin-gonic/gin"
)

func main() {
	database.StartDB()
	gin.SetMode(gin.ReleaseMode)
	server := server.NewServer()

	server.Run()
}
