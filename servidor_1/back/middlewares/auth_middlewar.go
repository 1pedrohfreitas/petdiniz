package middlewares

import (
	"github.com/1pedrohfreitas/pcams_back_go/services"
	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		const Bearer_schema = "Bearer "
		header := c.GetHeader("Authorization")

		if header == "" {
			c.AbortWithStatus(401)
		}

		token := header[len(Bearer_schema):]

		if services.NewJWTService().ValidateToken(token) == 0 {
			c.AbortWithStatus(401)
		}

	}
}
