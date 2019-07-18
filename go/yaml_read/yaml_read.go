package main

import (
	"fmt"
	"io/ioutil"
	"log"

	"gopkg.in/yaml.v2"
)

type tracing struct {
	TjgAppid     string `yaml:"tjgappid"`
	SamplingRate int    `yaml:"samplingRate"`
	SpeedMinRate int    `yaml:"speedMinRate"`
	SpeedMaxRate int    `yaml:"speedMaxRate"`
}

type config struct {
	TracingCfg tracing `yaml:"tracing"`
}

func parseConfigFromFile(f string) *config {
	var conf config
	b, err := ioutil.ReadFile(f)
	if err != nil {
		log.Fatalln(err)
	}
	err = yaml.Unmarshal(b, &conf)
	if err != nil {
		log.Fatalln(err)
	}
	return &conf
}

func main() {
	c := parseConfigFromFile("./cfg.yaml")
	fmt.Printf("%+v", c)
}
