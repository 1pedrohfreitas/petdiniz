package models

import "time"

type CamAccessPermission struct {
	ID                  uint      `json:"id"`
	CamId               []uint    `json:"camid"`
	Alias               string    `json:"alias"`
	Token               string    `json:"token"`
	StartPermissionDate time.Time `json:"startpermissiondate"`
	StopPermissionDate  time.Time `json:"stoppermissiondate"`
	DurationPermitions  uint64    `json:"durationpermitions"`
	UserName            string    `json:"username"`
	UserId              uint      `json:"userid"`
	CreateByUserId      uint      `json:"createbyuserid"`
	CreateByUserName    string    `json:"createbyusername"`
}
