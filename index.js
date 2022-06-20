const express = require('express');
const app = express();
const PORT = 8000;
app.use(express.json());


//Import routes
const userRouters = require('./routes/user-routes')

//Use routes
app.use('/',userRouters)

app.get('/',(req,res)=>{
    res.status(200).json({Message: 'Welcome to the server'})
})

app.listen(PORT,()=>{
    console.log('My server is running')
})