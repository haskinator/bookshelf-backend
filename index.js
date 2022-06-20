require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 8000 ;
const cors = require('cors');
app.use(cors({origin:'*'}))
app.use(express.json());


//IMPORT ROUTES
const userRouters = require('./routes/user-routes')
const bookRouters = require('./routes/book-routes')

//USE ROUTES
app.use('/',userRouters)
app.use('/',bookRouters)

app.get('/',(req,res)=>{
    res.status(200).json({Message: 'Welcome to the server'})
})

app.listen(port,()=>{
    console.log(`My server is running on port http://localhost:${port}`)
})