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

func ShowCam(c *gin.Context) {
	db := database.GetDataBase()
	var cam models.Cams
	id := c.Param("id")

	newid, err := strconv.Atoi(id)
	cam.ID = uint(newid)

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Formato de Id inválido",
		})

		return
	}

	err2 := db.QueryRow(`SELECT devicename, alias, streamtype, urlcamstream, status, created_at, updated_at FROM "pcam".cams;
	where id=$1`, newid).Scan(
		&cam.DeviceName,
		&cam.Alias,
		&cam.StreamType,
		&cam.UrlCamStream,
		&cam.Status,
		&cam.Created_at,
		&cam.Updated_at,
	)

	database.CheckError(err2)

	c.JSON(200, cam)
}

func CreateCam(c *gin.Context) {
	db := database.GetDataBase()
	var cam models.Cams
	err := c.ShouldBindJSON(&cam)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Erro no Json",
		})
		return
	}

	err = db.QueryRow(
		`INSERT INTO "pcam".cams (devicename, alias, streamtype, urlcamstream, status) VALUES($1, $2, $3, $4, $5)
		RETURNING id`, cam.DeviceName,
		cam.Alias,
		cam.StreamType,
		cam.UrlCamStream,
		cam.Status,
	).Scan(&cam.ID)

	database.CheckError(err)

	c.JSON(201, cam)
}

func ShowCams(c *gin.Context) {
	db := database.GetDataBase()

	var result dto.PageResultDTO

	rows, err := db.Query(`SELECT c.id, c.devicename, c.alias, c.streamtype, c.urlcamstream, c.status, c.created_at, c.updated_at, ti.sourceimg ,ti.alias
	FROM "pcam".cams c
	INNER JOIN "pcam".t_imgs ti on ti.id = c.imageid`)
	database.CheckError(err)

	defer rows.Close()

	for rows.Next() {
		var cam models.Cams

		err = rows.Scan(
			&cam.ID,
			&cam.DeviceName,
			&cam.Alias,
			&cam.StreamType,
			&cam.UrlCamStream,
			&cam.Status,
			&cam.Created_at,
			&cam.Updated_at,
			&cam.Icon.SourceImg,
			&cam.Icon.Alias,
		)
		database.CheckError(err)
		result.Data = append(result.Data, cam)
	}
	c.JSON(200, result)

}
func UpdateCam(c *gin.Context) {
	db := database.GetDataBase()
	var cam models.Cams
	err := c.ShouldBindJSON(&cam)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Erro no Json",
		})
		return
	}

	_, err2 := db.Exec(`UPDATE "pcam".cams SET devicename=$1, alias=$2, streamtype=$3, urlcamstream=$4, status=$5 WHERE id=$6`,
		cam.DeviceName,
		cam.Alias,
		cam.StreamType,
		cam.UrlCamStream,
		cam.Status,
		cam.ID)

	database.CheckError(err2)

	c.JSON(200, cam)
}

func DeleteCam(c *gin.Context) {
	id := c.Param("id")

	newid, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Formato de Id inválido",
		})

		return
	}
	db := database.GetDataBase()
	_, err2 := db.Exec(`DELETE FROM "pcam".cams WHERE id=$1`, newid)
	database.CheckError(err2)
	c.Status(204)
}

func ShowCamsByUser(c *gin.Context) {
	userid := c.Param("userid")

	newid, err := strconv.Atoi(userid)
	db := database.GetDataBase()

	var result dto.PageResultDTO

	rows, err := db.Query(`select distinct on (c.id) c.id, c.alias, c.urlcamstream, ti.alias, ti.sourceimg, cap.startpermissiondate, cap.stoppermissiondate
	from "pcam".cam_access_permission cap
	inner join "pcam".cams c on c.id = cap.camid
	inner join "pcam".t_imgs ti on ti.id = c.imageid
	where c.status = 1 and cap.stoppermissiondate > now() and userid = $1`, newid)
	database.CheckError(err)

	defer rows.Close()
	for rows.Next() {
		var cam models.CamsByUser

		err = rows.Scan(
			&cam.ID,
			&cam.Alias,
			&cam.UrlCamStream,
			&cam.Icon.Alias,
			&cam.Icon.SourceImg,
			&cam.StartPermissionDate,
			&cam.StopPermissionDate,
		)
		database.CheckError(err)
		result.Data = append(result.Data, cam)
	}
	c.JSON(200, result)

}

func ShowCamsByToken(c *gin.Context) {
	token := c.Param("token")

	db := database.GetDataBase()

	var result dto.PageResultDTO

	rows, err := db.Query(`select distinct on (c.id) c.id, c.alias, c.urlcamstream, ti.alias, ti.sourceimg, cap.startpermissiondate, cap.stoppermissiondate
	from "pcam".cam_access_permission cap
	inner join "pcam".cams c on c.id = cap.camid
	inner join "pcam".t_imgs ti on ti.id = c.imageid
	where c.status = 1 and cap.stoppermissiondate > now() and cap."token" = $1`, token)
	database.CheckError(err)

	defer rows.Close()
	for rows.Next() {
		var cam models.CamsByUser

		err = rows.Scan(
			&cam.ID,
			&cam.Alias,
			&cam.UrlCamStream,
			&cam.Icon.Alias,
			&cam.Icon.SourceImg,
			&cam.StartPermissionDate,
			&cam.StopPermissionDate,
		)
		database.CheckError(err)
		result.Data = append(result.Data, cam)
	}
	c.JSON(200, result)

}

func CreateCamAccessPermission(c *gin.Context) {

	var camAccessPermission models.CamAccessPermission

	err := c.ShouldBindJSON(&camAccessPermission)

	if err != nil {
		fmt.Println(err)
		c.JSON(400, gin.H{
			"error": "Erro no Json",
		})
		return
	}

	token, _ := services.GenerateTokenCamAccess(camAccessPermission)

	c.JSON(201, token)
}
func ShowListCamsAccessPermission(c *gin.Context) {
	db := database.GetDataBase()

	var result dto.PageResultDTO

	rows, err := db.Query(`select distinct on (cap."token") cap.id, cap.alias, cap."token",
	case 
		when u.fullname is not null then u.fullname
		else 'Token Unico'
	end as name,
	cap.userid as userid,
	cap.startpermissiondate,
	cap.stoppermissiondate,
	cap.durationpermitions
   from "pcam".cam_access_permission cap
   left join "pcam".users u on u.id = cap.userid 
   where stoppermissiondate > now()`)
	database.CheckError(err)

	defer rows.Close()
	for rows.Next() {
		var cam models.CamAccessPermission

		err = rows.Scan(
			&cam.ID,
			&cam.Alias,
			&cam.Token,
			&cam.UserName,
			&cam.UserId,
			&cam.StartPermissionDate,
			&cam.StopPermissionDate,
			&cam.DurationPermitions,
		)
		database.CheckError(err)
		result.Data = append(result.Data, cam)
	}
	c.JSON(200, result)
}

func DeleteCamsAccessPermission(c *gin.Context) {
	token := c.Param("token")

	db := database.GetDataBase()
	_, err2 := db.Exec(`DELETE FROM "pcam".cam_access_permission WHERE token=$1`, token)
	database.CheckError(err2)
	c.Status(204)
}

func ShowDetailsCamsAccessPermission(c *gin.Context) {
	db := database.GetDataBase()
	var cam models.CamAccessPermission
	token := c.Param("token")
	err2 := db.QueryRow(`select distinct on (cap."token") cap.alias, cap."token",
	case 
		when u.fullname is not null then u.fullname
		else 'Token Unico'
	end as name,
	cap.userid as userid,
	cap.startpermissiondate,
	cap.stoppermissiondate,
	cap.durationpermitions,
	u2.fullname as createbyusername
   from "pcam".cam_access_permission cap
   left join "pcam".users u on u.id = cap.userid
   inner join "pcam".users u2 on u2.id = cap.createbyuser
   where cap.token =$1 limit 1`, token).Scan(
		&cam.Alias,
		&cam.Token,
		&cam.UserName,
		&cam.UserId,
		&cam.StartPermissionDate,
		&cam.StopPermissionDate,
		&cam.DurationPermitions,
		&cam.CreateByUserName,
	)

	if err2 != nil {
		c.JSON(200, nil)
		return
	}

	c.JSON(200, cam)

}

func ValidateStreamRmtpCam(c *gin.Context) {
	u := c.Request.URL.Query()
	if len(u) > 0 {
		code := u["code"][0]

		if services.IsValidStreamRmtp(code) {
			c.JSON(200, nil)
		}
	}

	c.JSON(401, nil)
}
