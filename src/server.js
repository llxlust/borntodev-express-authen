import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import {ErrorHandling} from './middlewares/errorHandling.js'
import { ErrorResponse } from './utils/errorResponse.js'
dotenv.config()
const apikey = "12312451251"
const app = express()

const port = parseInt(process.env.SERVER_PORT)

if(!port){
    process.exit(1)
}


app.use(cors())
app.use(bodyParser.json())
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use(ErrorHandling)



app.listen(3100,()=>console.log("save data"))