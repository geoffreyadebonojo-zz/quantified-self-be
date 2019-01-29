# Quantified Self

As we evolve we give off Data. This is a fact. Quantified Self is a fitness manager designed to help you capture the calorie data you produce throughout the day.


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
success: 204
failure: 404

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

### POST /api/v1/meals/:meal_id/foods/:id

Will add the food specified to the meal specified

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

DELETE api/v1/meals/:meal_id/foods/:id

if successful
```
{
    "message": "Successfully removed <FOODNAME> to <MEALNAME>"
}
```

if failed
```
status: 404
```