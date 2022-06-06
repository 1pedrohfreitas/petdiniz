package services

import "github.com/1pedrohfreitas/pcams_back_go/repository"

func IsValidStreamRmtp(code string) bool {

	_, err := repository.GetCamByCode(code)

	if err != nil {
		return false
	}

	return true

}
