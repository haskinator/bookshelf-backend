require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 8000 ;
app.use(express.json());


//IMPORT ROUTES
const userRouters = require('./routes/user-routes')

//USE ROUTES
app.use('/',userRouters)

app.get('/',(req,res)=>{
    res.status(200).json({Message: 'Welcome to the server'})
})

app.listen(port,()=>{
    console.log(`My server is running on port http://localhost:${port}`)
})