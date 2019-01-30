
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('days', function(table) {
      table.increments('id').primary();
      table.integer('goal');

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('days')
  ]);

};
