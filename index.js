const express = require('express');
const app = express();
const PORT = 8000;


app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({Message: 'Hello world'})
})

app.get('/welcome',(req,res)=>{
    res.status(200).json({Message: 'Welcome'})
})

app.listen(PORT,()=>{
    console.log('My server is running')
})