const Food = require('../models/food')

const index = (request, response) => {
  Food.all()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

module.exports = {
  index
}