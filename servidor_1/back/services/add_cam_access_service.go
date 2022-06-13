package services

import (
	"fmt"
	"time"

	"github.com/1pedrohfreitas/pcams_back_go/models"
	"github.com/1pedrohfreitas/pcams_back_go/repository"
)

func GenerateTokenCamAccess(camAccessPermission models.CamAccessPermission) (string, error) {
	if camAccessPermission.DurationPermitions != 0 {
		camAccessPermission.StopPermissionDate = camAccessPermission.StartPermissionDate.Add(time.Minute * time.Duration(time.Duration(camAccessPermission.DurationPermitions*60000000000).Minutes()))
	} else {
		camAccessPermission.DurationPermitions = uint64(camAccessPermission.StopPermissionDate.Sub(camAccessPermission.StartPermissionDate).Minutes())
	}

	camAccessPermission.Token = encrypt(fmt.Sprintf("%x", time.Now().UnixMilli()))

	repository.CamAccessPermissionRepository(camAccessPermission)

	return camAccessPermission.Token, nil

}
