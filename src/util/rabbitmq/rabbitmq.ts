import client, { Channel, Connection } from "amqplib"
import { config } from "@config"

let connection!: Connection
let channel!: Channel
let connected: boolean

export const initRabbitMQ = async () => {
  if (connected && channel) return;

  try {
    connection = await client.connect(
      `amqp://${config.rabbitMq.user}:${config.rabbitMq.password}@${config.rabbitMq.host}:${config.rabbitMq.port}`
    )
  
    channel = await connection.createChannel()
    connected = true
    console.log("RabbitMQ connected")
  } catch (error) {
    console.log("RabbitMQ connection failed")
    console.log(error)
  }
}