const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pry = require('pryjs');


const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3030);
app.locals.title = 'Quantified Self';

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(400).json({ error });
    });
});

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select()
    .then(foods => {
      if (foods.length) {
        response.status(200).json(foods);
      } else {
        response.status(404).json({
          error: `Could not find food with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/foods', (request, response) => {
  const food = request.body;
  for (let requiredParameter of ['name', 'calories']) {
    if (!food[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, calories: <Integer> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('foods').insert(food, '*')
    .then(food => {
      response.status(201).json({ food });
    })
    .catch(error => {
      response.status(400).json({ error });
    });
});

app.patch('/api/v1/foods/:id', (request, response) =>{
  const food = request.body;
  for (let requiredParameter of ['name', 'calories']) {
    if (!food[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, calories: <Integer> }. You're missing a "${requiredParameter}" property.` });
    }
  }

    database('foods').where('id', request.params.id).select().update({"name": food.name, "calories": food.calories}, '*')
    .then(food => {
      response.status(200).json({ food });
    })
    .catch(error => {
      response.status(400).json({ error });
    });
});

app.delete('/api/v1/foods/:id', (request, response) => {
  database('meal_foods').where('food_id', request.params.id).del()
  .then(() => {
    database('foods').where('id', request.params.id).del()
    .then(foods => {
      if (foods == 1) {
        response.status(204).json({ success: true });
      } else {
        response.status(404).json({ error });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
  });
});


app.get('/api/v1/days', (request, response) => {
  database('days').select()
  .then((days) => {
    response.status(200).json(days);
  })
  .catch((error) => {
    response.status(400).json({ error });
  });
});

app.get('/api/v1/meals', (request, response) => {
  database('meals').select()
  .then((meals) => {
    response.status(200).json(meals);
  })
  .catch((error) => {
    response.status(400).json({ error });
  });
});

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  database('meal_foods').where('meal_id', request.params.meal_id)
  .join('foods', 'meal_foods.food_id', '=', 'foods.id')
  .join('meals', 'meal_foods.meal_id', '=', 'meals.id')
  .select('foods.id AS id', 'foods.name AS name', 'calories', 'meals.meal_type AS meal_name')
  .then(foods => {
    let foods_for_meal = [];
    
    let meal_name = foods[0].meal_name;
    foods.forEach( (f) => {
      delete f.meal_name;
      foods_for_meal.push(f)
    });
 
    response.status(200).json({ 
      'id': request.params.meal_id,
      'meal': meal_name,
      'foods': foods_for_meal
    })
  })
  .catch((error) => {
    response.status(400).json({ error });
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
