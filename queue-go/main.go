package main

import (
	"log"

	connection "queue/db"

	"github.com/gin-gonic/gin"
	"github.com/gocraft/work"
	"github.com/gomodule/redigo/redis"
)

var redisPool = &redis.Pool{
	MaxActive: 5,
	MaxIdle:   5,
	Wait:      true,
	Dial: func() (redis.Conn, error) {
		return redis.Dial("tcp", ":6379")
	},
}

var enqueuer = work.NewEnqueuer("my_app_namespace", redisPool)

func main() {

	app := gin.Default()

	app.GET("/", func(ctx *gin.Context) {

		enqueuer.Enqueue("count")

	})

}

func increaseCounter() {

	conn := connection.NewDatabaseConnection()

	_, err := conn.Query("INSET INTO Count (count) VALUES $1", 1)

	if err != nil {

		log.Fatal(err)

	}
}
