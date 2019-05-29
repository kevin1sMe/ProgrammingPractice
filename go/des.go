package main

import (
	"bytes"
	"crypto/cipher"
	"crypto/des"
	"encoding/hex"
	"fmt"
	"strings"
	"syscall"
)

func DesEncrypt2(origData, key []byte) ([]byte, error) {
	block, err := des.NewCipher(key)
	if err != nil {
		return nil, err
	}
	//blockMode := cipher.NewCBCEncrypter(block, key)
	crypted := make([]byte, len(origData))
	//blockMode.CryptBlocks(crypted, origData)
	block.Encrypt(crypted, origData)
	return crypted, nil
}

func DesEncrypt3(origData, key []byte) ([]byte, error) {
	block, err := des.NewCipher(key)
	if err != nil {
		return nil, err
	}
	blockMode := cipher.NewCFBEncrypter(block, key)
	crypted := make([]byte, len(origData))
	//blockMode.CryptBlocks(crypted, origData)
	blockMode.XORKeyStream(crypted, origData)
	fmt.Println("%s=>%x", origData, crypted)
	//block.Encrypt(crypted, origData)
	return crypted, nil
}

func DesEncrypt(origData, key []byte) ([]byte, error) {
	block, err := des.NewCipher(key)
	if err != nil {
		return nil, err
	}
	fmt.Println("before padding, len:", len(origData), " data:", origData)
	origData = PKCS5Padding(origData, block.BlockSize())
	fmt.Println("after padding, len:", len(origData), " data:", origData)
	blockMode := cipher.NewCBCEncrypter(block, key)
	crypted := make([]byte, len(origData))
	// 根据CryptBlocks方法的说明，如下方式初始化crypted也可以
	// crypted := origData
	blockMode.CryptBlocks(crypted, origData)
	return crypted, nil
}

func PKCS5Padding(ciphertext []byte, blockSize int) []byte {
	fmt.Println("blockSize:", blockSize, "blockSize:", blockSize)
	padding := blockSize - len(ciphertext)%blockSize
	//padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	padtext := bytes.Repeat([]byte{byte(0x20)}, padding)
	return append(ciphertext, padtext...)
}

func main() {
	//appkey := "8c6e8d92ad0f433fa5e54ada746d49c1"
	random := 1242
	timestamp := 1375685363

	content := fmt.Sprintf("random%dtimestamp%d", random, timestamp)
	fmt.Println(content)

	//sysid := 2
	//cipher.Encrypt(dst, syscall.StringByteSlice(content))
	dst, err := DesEncrypt(syscall.StringByteSlice(content), []byte("2-------"))
	if err == nil {
		fmt.Println(strings.ToUpper(hex.EncodeToString(dst)))
	} else {
		panic(err)
	}
	//041F03E83D85AD43B0BCE79FBB6841DAA87CC6C874BB71B45F5214DDF80BEB16
	//041F03E83D85AD43B0BCE79FBB6841DAA87CC6C874BB71B4DC2862F93C9737C9
}
