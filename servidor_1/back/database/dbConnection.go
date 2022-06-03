package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	host     = "petdiniz_db"
	port     = 5432
	user     = "postgres"
	password = "PetDiniz01@"
	dbname   = "pcam"
)

var dbSql *sql.DB

func StartDB() {
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlconn)
	CheckError(err)

	dbSql = db

}

func CheckError(err error) {
	if err != nil {
		panic(err)
	}
}

func GetDataBase() *sql.DB {
	return dbSql
}