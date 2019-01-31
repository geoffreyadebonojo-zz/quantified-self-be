
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
  .then(function () {
      return knex('foods').insert([
        {'name': 'Pemmican', 'calories': 500},
        {'name': 'Hard Tack', 'calories': 800},
        {'name': 'Raw Seal Flesh', 'calories': 1200}
      ]);
    });
};
