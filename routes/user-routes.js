const express = require('express');
const Bookshelf = require('../dbHelpers');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/users',(req,res)=>{
    Bookshelf.getAllUsers()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(error=>{res.status(500).json(error)})
    
})


router.post('/users/register',(req,res)=>{
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
    .catch(error=>{
        if(error.errno===19){
          res.status(401).json({message:"Username already exists."})
      }else{
          res.status(500).json(error)
      }
      })

})


router.post('/users/login',(req,res)=>{
    const {username,password}=req.body;
    Bookshelf.findUserByUsername(username,password)
    .then(user=>{
      if(user && bcrypt.compareSync(password,user.password) ){
        res.status(200).json(user)
      } else{
        res.status(404).json({message:"User does not exist"})
      }
    })
    .catch(error=>{
      res.status(500).json(error)
    })
  })


router.get('/users/:username',(req,res)=>{
    const {username} = req.params
    Bookshelf.findUserByUsername(username)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>{
        res.status(500).json(error)
    })
})

router.delete("/users/:id",(req,res)=>{
    const {id} = req.params
    Bookshelf.removeUser(id)
    .then(count=>{
      if(count>0){
        res.status(200).json({message:"User is deleted"})
      }else{
        res.status(404).json({message:"No user with that id"})
      }
    })
    .catch(error=>{
      res.status(500).json(error)
    })
})

router.get('/users/:id/books',(req,res)=>{
    const {id} = req.params
    Bookshelf.getUserBooks(id)
    .then(books=>{
        res.status(200).json(books)
    })
    .catch(error=>{
        res.status(500).json({Message: "Cannot get books"})
    })
})


router.post('/users/:id/books',(req,res)=>{
    const {id} = req.params
    const newBook = req.body
        if(!newBook.user_id){
            newBook['user_id'] = parseInt(id,10)
        }
    
    Bookshelf.findUserByUserId(id)
    .then(user=>{
        if(!user){
            res.status(400).json({Message:"User does not exists"})
        }
        
    Bookshelf.addBook(newBook,id)
    .then(book=>{
        res.status(200).json(book)
    })
    .catch(error=>{
        res.status(500).json(error)
    })
    
    })
})


router.patch('/users/:id/books/:identifier',(req,res)=>{
    const{id} = req.params
    const{identifier} = req.params
    const NewTag = req.body

    Bookshelf.findUserByUserId(id)
    .then(user=>{
        if(!user){
            res.status(400).json({Message:"User does not exists"})
        }

        Bookshelf.addTag(NewTag,id,identifier)
        .then(book=>{
            res.status(200).json(book.tag)
        })
        .catch(error=>{
            res.status(500).json(error)
        })
    
    })

})

router.get('/users/:id/books/:identifier',(req,res)=>{
    const{id} = req.params
    const{identifier} = req.params

    Bookshelf.findUserByUserId(id)
    .then(user=>{
        if(!user){
            res.status(400).json({Message:"User does not exists"})
        }

    Bookshelf.getUserBookByBookId(id,identifier)
    .then(book =>{
        res.status(200).json(book)
    })

    .catch(err=>res.status(400).json(err))
    
    })
    
})


module.exports = router;