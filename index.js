//used to load content of .env file into process.env

const express = require('express')
const cors =require('cors')
const router = require('./routes/router')
require('dotenv').config()
require('./dbConnections/connection')

const projectfairServer =express()

projectfairServer.use(cors())
projectfairServer.use(express.json())
projectfairServer.use(router)
projectfairServer.use('/uploads' ,express.static('./uploads'))

const PORT = 3000 || process.env.PORT

projectfairServer.listen(PORT,()=>{
    console.log(`projectfair server started at port :${PORT} an waiting for client request!!!!`);
    
})

//resolving client/browser request (GET/POST/PUT/DELETE) using express

projectfairServer.get('/',(req,res)=>{
    res.status(200).send(`PFServer started`)
})