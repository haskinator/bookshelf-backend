// const knex = require('knex');
// const config = require('./knexfile')
// const db = knex(config.development)

const db = require('./dbConfig');

//USERS
async function addUser(user) {
//   await db('users').insert(user)
//   return db('users').where({username:user.username})
    return await db('users').insert(user,['id','username'])
}

function findUserByUsername(username) {
    return db("users").where({username:username}).first(); 
}

function getAllUsers() {
    return db('users').orderBy('id','desc')
}

function getAllBooks() {
    return db('books').orderBy('id','desc')
}

function getUserBookByBookId(id,identifier) {
    return db("books")
    .where({
        user_id:id,
        identifier:identifier
    })
}

function removeUser(id) {
    return db('users')
    .where({id:id})
    .del()
   }

function deleteUserBookByBookId(id,identifier) {
    return db('books')
    .where({
        user_id:id,
        identifier:identifier
    })
    .del()
}

function getUserBooks(user_id) {
    return db('users')
    .join('books','users.id','books.user_id')
    .select(
        'users.id as UserId',
        'books.id as BookId',
        'books.title as BookTitle',
        'books.author as Author',
        'books.description as Description',
        'books.pages as PageNumber',
        'books.tag as UserTag',
        'books.identifier as Identifier',
        'books.imageUrl as ImageUrl'
    )
    .where({user_id:user_id})

}


function findUserByUserId(id) {
    return db('users').where({id:id}).first()
}

async function addBook(newBook,id) {
    await db('books')
    .where({user_id:id})
    .insert(newBook,['id'])
    return db('books').where({user_id:id}).orderBy('id','desc')

}

function addTag(NewTag,id,identifier) {
    return db('books')
    .where({
        user_id:id,
        identifier:identifier
    })
    .update(NewTag,['id'])

}

module.exports={
    addUser,
    findUserByUsername,
    getAllUsers,
    removeUser,
    getUserBooks,
    findUserByUserId,
    addBook,
    addTag,
    getAllBooks,
    getUserBookByBookId,
    deleteUserBookByBookId

}