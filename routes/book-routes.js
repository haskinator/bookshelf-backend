const express = require('express');
const Bookshelf = require('../dbHelpers');

const router = express.Router();

router.get('/books',(req,res)=>{
    Bookshelf.getAllBooks()
    .then(books=>{
        res.status(200).json(books)
    })
    .catch(error=>{res.status(500).json(error)})
    
})


module.exports = router;