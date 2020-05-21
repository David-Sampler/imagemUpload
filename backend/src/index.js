require('dotenv').config();

const express = require('express')
const router = require('./routes')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use("/files",express.static(path.resolve(__dirname,"..","tmp","uploads")))
app.use(router)


app.listen(3000,()=>console.log("Conectado com sucess",process.env.APP))