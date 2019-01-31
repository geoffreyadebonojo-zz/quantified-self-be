
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
  .then(function () {
      return knex('meals').insert([
        {'meal_type': 'Breakfast', 'day_id': 1},
        {'meal_type': 'Lunch', 'day_id': 1},
        {'meal_type': 'Snack', 'day_id': 1},
        {'meal_type': 'Dinner', 'day_id': 1}
      ]);
    });
};