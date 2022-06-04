package repository

import (
	"github.com/1pedrohfreitas/pcams_back_go/database"
	"github.com/1pedrohfreitas/pcams_back_go/models"
)

func CamAccessPermissionRepository(camAccessPermission models.CamAccessPermission) {

	for _, c := range camAccessPermission.CamId {
		db := database.GetDataBase()
		err := db.QueryRow(
			`INSERT INTO "pcam".cam_access_permission (
				token,
				alias,
				createbyuser,
				camid,
				startpermissiondate,
				stoppermissiondate,
				durationpermitions,
				userid) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id`, camAccessPermission.Token,
			camAccessPermission.Alias,
			camAccessPermission.CreateByUserId,
			c,
			camAccessPermission.StartPermissionDate,
			camAccessPermission.StopPermissionDate,
			camAccessPermission.DurationPermitions,
			camAccessPermission.UserId,
		).Scan(&camAccessPermission.ID)
		database.CheckError(err)
	}

}
