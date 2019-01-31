
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE days RESTART IDENTITY CASCADE')
  .then(function () {
      return knex('days').insert([
        {'goal': 3000}
      ]);
    });
};
