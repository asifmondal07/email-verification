import express from 'express'
import mongooseConnect from './connection/connect.js'
import route from './routes/user.js'
import bodyParser from 'body-parser';
import config from "./config.js";


const app=express()


mongooseConnect(config.mongoUri)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/user",route)








app.listen(config.port,()=>console.log("Server Started ",config.port));