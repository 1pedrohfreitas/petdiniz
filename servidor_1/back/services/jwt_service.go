package services

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type jwtService struct {
	secretKey string
	issure    string
}

func NewJWTService() *jwtService {
	return &jwtService{
		secretKey: "pcams",
		issure:    "pcams",
	}
}

type Claim struct {
	Sum uint `json:"sum"`
	jwt.StandardClaims
}

type ClaimAccessCam struct {
	Cams []uint `json:"cams"`
	jwt.StandardClaims
}

func (s *jwtService) GenerateToken(id uint) (string, error) {
	claim := &Claim{
		id,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 4).Unix(),
			Issuer:    s.issure,
			IssuedAt:  time.Now().Add(time.Duration(-4) * time.Hour).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)

	t, err := token.SignedString([]byte(s.secretKey))

	if err != nil {
		return "", err
	}
	return encrypt(t), nil

}

func (s *jwtService) ValidateToken(token string) int {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(decrypt(token), claims, func(t *jwt.Token) (interface{}, error) {
		if _, isValid := t.Method.(*jwt.SigningMethodHMAC); !isValid {
			return nil, fmt.Errorf("invalid token: %v", token)
		}
		return []byte(s.secretKey), nil
	})

	var id = 0
	if err == nil {
		for key, val := range claims {
			if key == "sum" {
				id = int(val.(float64))
			}
		}
	}

	return id
}
