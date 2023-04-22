package main

import (
	"net/http"
	"strings"
)

type Payload struct {
	Count int `json:"count"`
}

func main() {
	// var group sync.WaitGroup
	sendRequest()
	// group.Add(4)
	// go sendRequest(&group)
	// go sendRequest(&group)
	// go sendRequest(&group)
	// go sendRequest(&group)

	// group.Wait()

}

func sendRequest() {

	client := &http.Client{}

	for i := 0; i < 500; i++ {
		payload := `{"count": 1}`
		//queue
		//http://localhost:8000/queue
		req, _ := http.NewRequest("POST", "http://localhost:8000/counter", strings.NewReader(payload))

		req.Header.Add("Content-type", "application/json")
		client.Do(req)
	}

}
