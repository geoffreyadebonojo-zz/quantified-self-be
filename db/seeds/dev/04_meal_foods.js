
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY CASCADE')
  .then(function () {
      return knex('meal_foods').insert([
        {'meal_id': 1, 'food_id': 1},
        {'meal_id': 1, 'food_id': 2},
        {'meal_id': 1, 'food_id': 3}
      ]);
    });
};