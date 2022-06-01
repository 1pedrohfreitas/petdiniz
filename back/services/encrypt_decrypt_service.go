package services

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"fmt"
)

func encrypt(text string) string {
	key := []byte("a821a0228a134b12")
	plaintext := []byte(text)
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}
	nonce := []byte("netappsinfo0")
	aesgcm, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}
	ciphertext := aesgcm.Seal(nil, nonce, plaintext, nil)
	return fmt.Sprintf("%x", ciphertext)
}

func decrypt(text string) string {
	key := []byte("a821a0228a134b12")
	ciphertext, _ := hex.DecodeString(text)
	nonce := []byte("netappsinfo0")
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}
	aesgcm, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}
	plaintext, err := aesgcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		panic(err.Error())
	}
	decryptedText := string(plaintext[:])
	return fmt.Sprintf("%s", decryptedText)
}
