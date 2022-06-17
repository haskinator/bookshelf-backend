
exports.up = function(knex) {
    return knex.schema.createTable('users',tbl=>{
      tbl.increments() // id column
      tbl.text('username',120).notNullable().unique().index()
      tbl.text('password',200).notNullable()
      tbl.timestamps(true,true)
    })
    .createTable('books',tbl=>{
      tbl.increments()
      tbl.text('title')
      tbl.text('author')
      tbl.text('description')
      tbl.integer('pages')
      tbl.text('tag')
      tbl.text('imageUrl')
      tbl.text('identifier').notNullable()
      tbl.timestamps(true,true)
      tbl.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    })

    
   
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users").dropTableIfExists("books")
  };