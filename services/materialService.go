package services

import (
	"encoding/csv"
	"fmt"
	"material-master/dao"
	"material-master/model"
	"io"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
	"time"
)

func Uploadcsvfile(fileNameWithPath string) {

	// b, err := ioutil.ReadFile("/home/rohit/material-master_Documents/db.csv") // just pass the file name
	b, err := ioutil.ReadFile(fileNameWithPath) // just pass the file name
	if err != nil {
		fmt.Print(err)
	}
	r := csv.NewReader(strings.NewReader(string(b)))

	counter := 0
	// materialList := []*model.Material{}
	var materialList []*model.Material
	for {
		// material := models.Material
		material := new(model.Material)
		counter++
		record, err := r.Read()
		if counter == 1 {
			continue
		}

		// Processing
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}
		// material.
		// materialsData = append(materialsData, record)
		// fmt.Println(record)
		material.Pid, _ = strconv.Atoi(record[0])
		material.MaterialCode = record[1]
		material.MaterialGroup = record[2]
		material.MaterialName = record[3]
		material.Alias = record[4]
		material.Discription = record[5]
		material.MaterialUnit = record[6]
		material.Gst, _ = strconv.Atoi(record[7])
		// i, _ := strconv.ParseUint(record[9], 0, 8)
		material.BasePrice, _ = strconv.ParseFloat(record[8], 64)
		material.CreatedAt = time.Now()
		material.LastUpdatedAt = time.Now()
		material.CreatedBy = "Admin 1"
		material.LastUpdatedBy = "Admin 1"

		materialList = append(materialList, material)
		// fmt.Println(material)
	}
	_, _ = dao.MaterialDao().AddMaterial(materialList)
	//fmt.Println(materialList)
}

func GetAllMaterials() ([]model.Material, error) {

	getAllMaterials, getMaterialErr := dao.MaterialDao().GetAllMaterials()
	//fmt.Println(materialList)\
	return getAllMaterials, getMaterialErr
}

func GetMaterialsOnGroup(groupCode string) ([]model.Material, error) {

	getAllMaterials, getMaterialErr := dao.MaterialDao().GetMaterialsOnGroup(groupCode)
	//fmt.Println(materialList)\
	return getAllMaterials, getMaterialErr
}
