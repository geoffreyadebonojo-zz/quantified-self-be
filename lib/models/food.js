const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


//order by id
const all = () => database('foods')
  .select()

module.exports = {
  all
}