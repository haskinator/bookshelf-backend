
exports.up = function(knex) {
    return knex.schema.createTable('users',tbl=>{
      tbl.increments() // id column
      tbl.text('username',120).notNullable().unique().index()
      tbl.text('password',200).notNullable()
      tbl.timestamps(true,true)
    })
    .createTable('books',tbl=>{
      tbl.increments()
      tbl.text('title').notNullable().index()
      tbl.text('author').notNullable()
      tbl.text('description')
      tbl.integer('pages').notNullable()
      tbl.text('tag')
      tbl.text('imageUrl').notNullable()
      tbl.timestamps(true,true)
      tbl.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    })
   
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users").dropTableIfExists("books")
  };
