package main

import "encoding/json"
import "encoding/xml"
import "fmt"

type response1 struct {
	Page   int
	Fruits []string
}

type response2 struct {
	Page   int      `json:"page" xml:"xml_page"`
	Fruits []string `json:"fruits" xml:"xml_fruits"`
}

func main() {

	r1 := response1{
		Page:   1,
		Fruits: []string{"apple", "orange"},
	}

	s, err := json.Marshal(r1)
	if err != nil {
		fmt.Printf("%s", err)
	}
	fmt.Printf("%s\n", string(s))

	r2 := response2{
		Page:   2,
		Fruits: []string{"banana", "apple", "orange"},
	}

	s, err = json.Marshal(r2)
	if err != nil {
		fmt.Printf("%s", err)
	}

	fmt.Printf("%s\n", string(s))

	xml_str, err := xml.Marshal(r2)
	fmt.Printf("%s\n", string(xml_str))

}
