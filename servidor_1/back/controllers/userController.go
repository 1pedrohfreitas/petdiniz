package controllers

import (
	"fmt"
	"strconv"

	"github.com/1pedrohfreitas/pcams_back_go/database"
	"github.com/1pedrohfreitas/pcams_back_go/dto"
	"github.com/1pedrohfreitas/pcams_back_go/models"
	"github.com/1pedrohfreitas/pcams_back_go/services"
	"github.com/gin-gonic/gin"
)

func ShowUser(c *gin.Context) {
	db := database.GetDataBase()
	var user models.User
	id := c.Param("id")

	newid, err := strconv.Atoi(id)
	user.ID = uint(newid)

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Formato de Id inválido",
		})

		return
	}
	err2 := db.QueryRow(`Select fullname, alias, username, usertype, status, created_at, updated_at from users where id=$1`, newid).Scan(&user.FullName,
		&user.Alias,
		&user.UserName,
		&user.UserType,
		&user.Status,
		&user.Created_at,
		&user.Updated_at)

	database.CheckError(err2)

	c.JSON(200, user)
}

func ShowUserByUserName(c *gin.Context) {
	db := database.GetDataBase()
	var user models.User
	username := c.Param("username")

	err2 := db.QueryRow(`Select username from users where username=$1`, username).Scan(&user.FullName)

	if err2 != nil {
		c.JSON(200, false)
		return
	}
	c.JSON(200, true)

}

func CreateUser(c *gin.Context) {
	db := database.GetDataBase()
	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Erro no Json",
		})
		return
	}
	user.Password = services.SHA256Encoder(user.Password)
	err = db.QueryRow(
		`INSERT INTO users (fullname, alias, username, usertype, status, "password") VALUES($1, $2, $3, $4, $5, $6)
		RETURNING id`, user.FullName,
		user.Alias,
		user.UserName,
		user.UserType,
		user.Status,
		user.Password,
	).Scan(&user.ID)

	database.CheckError(err)

	c.JSON(201, user)
}

func ShowUsers(c *gin.Context) {
	db := database.GetDataBase()

	var result dto.PageResultDTO

	rows, err := db.Query(`SELECT id, fullname, alias, username, usertype, status, created_at, updated_at FROM users ORDER BY fullname`)
	database.CheckError(err)

	defer rows.Close()

	for rows.Next() {
		var user models.User

		err = rows.Scan(
			&user.ID,
			&user.FullName,
			&user.Alias,
			&user.UserName,
			&user.UserType,
			&user.Status,
			&user.Created_at,
			&user.Updated_at,
		)
		database.CheckError(err)
		result.Data = append(result.Data, user)
	}

	c.JSON(200, result)

}
func UpdateUser(c *gin.Context) {
	db := database.GetDataBase()
	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Erro no Json",
		})
		return
	}
	if user.Password != "" {
		user.Password = services.SHA256Encoder(user.Password)
		_, err2 := db.Exec(`UPDATE pcam.users SET fullname=$1, alias=$2, username=$3, usertype=$4, status=$5, "password"=$6 WHERE id=$7`,
			user.FullName,
			user.Alias,
			user.UserName,
			user.UserType,
			user.Status,
			user.Password, user.ID)

		database.CheckError(err2)

		c.JSON(200, user)
	} else {
		_, err2 := db.Exec(`UPDATE pcam.users SET fullname=$1, alias=$2, username=$3, usertype=$4, status=$5 WHERE id=$6`,
			user.FullName,
			user.Alias,
			user.UserName,
			user.UserType,
			user.Status,
			user.ID)

		database.CheckError(err2)

		c.JSON(200, user)
	}

}

func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	newid, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Formato de Id inválido",
		})

		return
	}
	db := database.GetDataBase()
	_, err2 := db.Exec("DELETE FROM users WHERE id=$1", newid)
	database.CheckError(err2)
	c.Status(204)
}

func ResetUserAdmin(c *gin.Context) {
	db := database.GetDataBase()

	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Erro no Json",
		})
		return
	}
	user.FullName = "Administrador"
	user.Alias = "Administrador"
	user.Status = 1
	user.UserName = "admin"
	user.Password = services.SHA256Encoder("1234")

	_, err2 := db.Exec("DELETE FROM users WHERE username='admin'")
	if err2 != nil {
		fmt.Println("Não existe usuario Admin")
	}

	err = db.QueryRow(
		`INSERT INTO users (id,fullname, alias, username, usertype, status, "password") VALUES(1,$1, $2, $3, $4, $5, $6)
		RETURNING id`, user.FullName,
		user.Alias,
		user.UserName,
		user.UserType,
		user.Status,
		user.Password,
	).Scan(&user.ID)

	database.CheckError(err)

	c.JSON(201, user)
}
