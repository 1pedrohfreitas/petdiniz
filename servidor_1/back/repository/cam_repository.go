package repository

import (
	"github.com/1pedrohfreitas/pcams_back_go/database"
	"github.com/1pedrohfreitas/pcams_back_go/models"
)

func GetCamByCode(code string) (models.Cams, error) {
	db := database.GetDataBase()
	var cam models.Cams

	err2 := db.QueryRow(`select code from "pcam".cams where code=$1`, code).Scan(&cam.Code)

	database.CheckError(err2)

	return cam, err2

}
