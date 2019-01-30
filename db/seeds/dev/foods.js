
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
  .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        {'name': 'Cheese', 'calories': 500},
        {'name': 'Apple', 'calories': 800},
        {'name': 'Raw Seal Flesh', 'calories': 1200}
      ]);
    });
};
