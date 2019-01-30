exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meals', function (table) {
      table.increments('id').primary();
      table.string('meal_type');
      table.integer('day_id').unsigned()
      table.foreign('day_id')
        .references('days.id')

      table.timestamps(true, true)
    })
  ])

};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meals')
  ]);
};
