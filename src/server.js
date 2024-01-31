import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

const port = parseInt(process.env.SERVER_PORT)

if(!port){
    process.exit(1)
}

app.use(cors())


app.listen(3100,()=>console.log("hahgahahahah"))