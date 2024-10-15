package main

import (
	"fmt"
	"time"

	"github.com/valyala/fasthttp"
)

const (
	maxConcurrent = 10485750
)

func doStuff(temp *fasthttp.Request) {
	temp.Header.SetMethod(fasthttp.MethodPost)
	temp.SetRequestURI("http://localhost:3000/register")
	temp.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	args := temp.PostArgs()
	args.Reset()
	rand := time.Now().UnixNano()
	args.Add("username", fmt.Sprintf("%d", rand))
	args.Add("password", fmt.Sprintf("%d", rand))
}

func main() {
	// semaphore := make(chan struct{}, maxConcurrent)

	client := &fasthttp.Client{
		MaxConnsPerHost: maxConcurrent,
	}

	req := fasthttp.AcquireRequest()
	doStuff(req)

	for {
		// Fills the semaphore
		// semaphore <- struct{}{}
		go func() {
			// Releases the semaphore
			// defer func() { <-semaphore }()
			// temp := fasthttp.AcquireRequest()
			// defer fasthttp.ReleaseRequest(temp)
			// doStuff(temp)
			client.Do(req, nil)
		}()
	}
}
