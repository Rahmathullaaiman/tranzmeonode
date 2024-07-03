
require('dotenv').config() 

const express = require('express')

const cors = require('cors')

const morgan = require('morgan'); 

const router = require('./ROUTES/router')


require('./DATABASE/connect')


const server = express()

server.use(cors())

server.use(express.json())
server.use(morgan('dev'))

server.use(router)



const PORT = 9000 || process.env

server.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})



