const knex = require('knex');
const config = require('./knexfile')
const db = knex(config.development)

//const db = require('./dbConfig');

//USERS
async function addUser(user) {
  await db('users').insert(user)
  return db('users').where({username:user.username})
    //return await db('users').insert(user,['id','username'])
}


module.exports={
    addUser

}