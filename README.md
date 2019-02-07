# Quantified Self
As we evolve we give off Data. This is a fact. Quantified Self is a fitness manager designed to help you capture the calorie data you produce throughout the day.

###### Heroku: https://warm-cove-64806.herokuapp.com
###### Github: https://github.com/geoffreyadebonojo/quantified-self-be.git

## Installation
clone this repo:
```
$ git clone https://github.com/geoffreyadebonojo/quantified-self-be.git
```
Next ```cd ``` into the cloned repo and run ```npm install``` to install the necessary node modules, then ```npm run build```

To start the server locally
```
npm start
```


## ENDPOINTS AVAILABLE:

### GET /api/v1/foods
```
[
  {
    "id": 1,
    "name": "Banana",
    "calories": "150"
  },
  {
    "id": 2,
    "name": "Apple",
    "calories": "100"
  }
]
```

### GET /api/v1/foods/:id
```
{
  "id": 1,
  "name": "Banana",
  "calories": "150"
}
```

### POST /api/v1/foods
```
body {
  "food":
  {
    "name": "Apple Pie",
    "calories": "500"
  }
}
```

### PATCH /api/v1/foods/:id
```
body {
  "food":
  {
    "name": "Cheesecake",
    "calories": "200"
  }
}
```
failure: 400

### DELETE /api/v1/foods/:id
Deletes food with a given id from the database. Returns status 204 code if successful.
If unsuccessful, returns
```
{
    "error": {}
}
```
with status 404


### GET /api/v1/days
```
[
  {
    "id": 1,
    "goal": 3000,
    "created_at": "2019-02-06T22:29:37.633Z",
    "updated_at": "2019-02-06T22:29:37.633Z"
  },
  {
    "id": 2,
    "goal": 2500,
    "created_at": "2019-02-06T22:30:04.553Z",
    "updated_at": "2019-02-06T22:30:04.553Z"
  },
  {
    "id": 3,
    "goal": 3500,
    "created_at": "2019-02-06T22:30:19.036Z",
    "updated_at": "2019-02-06T22:30:19.036Z"
  }

  ...

]

```
Returns all days entries in the database with id, goal and timestamps.

### POST /api/v1/days
Sending body data with that days caloric goal
```
body {
  "goal": 2000
}
```
Returns the created day object with id, goal and timestamps
```
{
  "day": [
    {
      "id": 7,
      "goal": 2000,
      "created_at": "2019-02-05T01:36:41.317Z",
      "updated_at": "2019-02-05T01:36:41.317Z"
    }
  ]
}
```

### GET /api/v1/today
```
{
    "id": 6,
    "goal": 2000,
    "created_at": "2019-02-07T00:32:15.375Z",
    "updated_at": "2019-02-07T00:32:15.375Z"
}
```
Returns the last day entry in the database with its id, calorie goal and timestamps.



### GET /api/v1/days/:day_id/meals
```
[
  {
    "id": 1,
    "name": "Breakfast",
    "foods": [
  {
    "id": 1,
    "name": "Pemmican",
    "calories": "500"
  },
  {
    "id": 3,
    "name": "Raw Seal Flesh",
    "calories": "1200"
  }
]
},
  {
    "id": 2,
    "name": "Lunch",
    "foods": []
  },
  {
    "id": 3,
    "name": "Snack",
    "foods": []
  },
  {
    "id": 4,
    "name": "Dinner",
    "foods": []
  }
]
```
Returns all four meals with their foods for a given day.


### GET /api/v1/meals
```
[
  {
    "id": 1,
    "name": "Breakfast",
    "foods": [
      {
        "id": 1,
        "name": "Banana",
        "calories": 150
      },
      {
        "id": 6,
        "name": "Yogurt",
        "calories": 550
      },
      {
        "id": 12,
        "name": "Apple",
        "calories": 220
      }
    ]
  },
  {
    "id": 2,
    "name": "Snack",
    "foods": [
      {
        "id": 1,
        "name": "Banana",
        "calories": 150
      },
      {
        "id": 9,
        "name": "Gum",
        "calories": 50
      },
      {
        "id": 10,
        "name": "Cheese",
        "calories": 400
      }
    ]
  },
  {
    "id": 3,
    "name": "Lunch",
    "foods": [
      {
        "id": 2,
        "name": "Bagel Bites - Four Cheese",
        "calories": 650
      },
      {
        "id": 3,
        "name": "Chicken Burrito",
        "calories": 800
      },
      {
        "id": 12,
        "name": "Apple",
        "calories": 220
      }
    ]
  },
  {
    "id": 4,
    "name": "Dinner",
    "foods": [
      {
        "id": 1,
        "name": "Banana",
        "calories": 150
      },
      {
        "id": 2,
        "name": "Bagel Bites - Four Cheese",
        "calories": 650
      },
      {
        "id": 3,
        "name": "Chicken Burrito",
        "calories": 800
      }
    ]
  }
]
```
Returns all meals from the database

### GET /api/v1/meals/:meal_id/foods

```
{
  "id": 1,
  "name": "Breakfast",
  "foods": [
    {
      "id": 1,
      "name": "Banana",
      "calories": 150
    },
    {
      "id": 6,
      "name": "Yogurt",
      "calories": 550
    },
    {
      "id": 12,
      "name": "Apple",
      "calories": 220
    }
  ]
}
```
Returns data for a given meal, including any foods associated with that meal, their names and calorie counts.

### POST /api/v1/meals/:meal_id/foods/:id

Will add the food with specified id to the meal given.
```
body {
  "meal_id": 4,
  "food_id": 2
}
```

if successful:
```
status: 204
{
    "message": "Successfully added <FOODNAME> to <MEALNAME>"
}
```

if failed:
```
status: 404
```

### DELETE api/v1/meals/:meal_id/foods/:id
Removes the food with given id from the meal specified.

if successful:
```
{
    "message": "Successfully removed <FOODNAME> to <MEALNAME>"
}
```

if failed
```
status: 404
```
