import * as amqplib from 'amqplib';
import { config } from '@config';

type AmqpConnection = ReturnType<typeof amqplib.connect> extends Promise<infer T> ? T : never;
type AmqpChannel = ReturnType<AmqpConnection['createChannel']> extends Promise<infer T> ? T : never;

let connection: AmqpConnection | null = null;
let channel: AmqpChannel | null = null;

export async function initRabbitMQ() {
  try {
    connection = await amqplib.connect(`amqp://${config.rabbitMq.user}:${config.rabbitMq.password}@${config.rabbitMq.host}:${config.rabbitMq.port}`);
    channel = await connection.createChannel();
    console.log('RabbitMQ Connected');
    
    return { connection, channel };
  } catch (error) {
    console.error('❌ Error connecting to RabbitMQ:', error);
    throw error;
  }
}

export function getChannel() {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
}