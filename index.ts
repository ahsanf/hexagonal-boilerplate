import bodyparser from 'body-parser';
import express, { Express, Request, Response } from "express"
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from "dotenv"
import { DomainController } from './src/adapter/in/rest/domain/controller/controller';
import cookieParser from 'cookie-parser';
import { loggingMiddleware } from './src/util/logger/logging';
import { initMysql } from './src/util/mysql/mysql';

const app: Express = express()
const port = process.env.APP_PORT ?? 9010
const appName = process.env.APP_NAME ?? 'app-name'

dotenv.config()
app.use(bodyparser.json())
app.use(cors())
app.use(fileUpload())
app.use(cookieParser())

app.use(loggingMiddleware)

initMysql()

const domainController = new DomainController(app, 'v1')

domainController.init()

app.get('/', (_: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`${appName} is listening on port ${port}`)
})