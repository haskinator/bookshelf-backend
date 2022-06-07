const express = require('express');
const app = express();
const PORT = 8000;
const Bookshelf = require('./dbHelpers');
const bcrypt = require('bcryptjs');


app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({Message: 'Hello world'})
})

app.get('/welcome',(req,res)=>{
    res.status(200).json({Message: 'Welcome'})
})


app.post('/users/register',(req,res)=>{
    const credentials = req.body;
    const {username,password} = credentials;
    if (!(username && password)){
        return res.status(400).json({message:"Username and password required."})
    }

    const hash = bcrypt.hashSync(credentials.password,12);
    credentials.password = hash;

    Bookshelf.addUser(credentials)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>{res.status(500).json(error)
        })

})

app.listen(PORT,()=>{
    console.log('My server is running')
})