const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

const pry = require('pryjs');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {

  it('should not return success for non-existent endpoint', function(done) {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    })
  });


});

describe('API Routes', () => {

  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  describe('GET /api/v1/foods', () => {
    it('should return the homepage with text', function(done) {
      chai.request(server)
      .get('/api/v1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property("name");
        response.body[0].should.have.property("calories");
        response.body[0].should.have.property("id");
        done();
      });
    });
  });

  describe('GET /api/v1/foods/:id', () => {
    it('should return a food by id', function(done) {
      chai.request(server)
      .get('/api/v1/foods/3')
      .end((err, response) => {
        response.should.have.status(200)
        response.should.be.json;
        response.body[0].should.be.a('object');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('calories');
        done();
      })
    });

    it('should throw a 404 if passed an invalid ID', function(done) {
      chai.request(server)
      .get('/api/v1/foods/300')
      .end((err, response) => {
        response.should.have.status(404)
        response.should.be.json;
        done();
      })
    });
  });

  describe('POST /api/v1/foods', () => {
    it('should create a new food', done => {
      chai.request(server)
      .post('/api/v1/foods')
      .send({
        name: "Cheesecake",
        calories: "500"
      })
      .end((err, response) => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('object');
        response.body.should.have.property('food');
        response.body.food[0].should.have.property('name');
        response.body.food[0].should.have.property('calories');
        done();
      });
    });

    it('should throw a 422 and not create a new food if calories property is missing', done => {
      chai.request(server)
      .post('/api/v1/foods')
      .send({
        name: "Cheesecake",
      })
      .end((err, response) => {
        response.should.have.status(422)
        response.should.be.json
        done();
      });
    });

    it('should throw a 422 and not create a new food if name property is missing', done => {
      chai.request(server)
      .post('/api/v1/foods')
      .send({
        calories: 600,
      })
      .end((err, response) => {
        response.should.have.status(422)
        response.should.be.json
        done();
      });
    });
  });

  describe('PATCH /api/v1/foods/:id', () => {
    it('should update a food entry', (done) => {
      chai.request(server)
        .get('/api/v1/foods/1')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('calories');
          response.body[0].name.should.equal('Pemmican');
          response.body[0].calories.should.equal('500');
        })
      chai.request(server)
      .patch('/api/v1/foods/1')
      .send({
        name: "BurgerBurger",
        calories: "200"
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('food');
        response.body.food[0].should.have.property('name');
        response.body.food[0].should.have.property('calories');
      chai.request(server)
      .get('/api/v1/foods/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].should.be.a('object');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('calories');
        response.body[0].name.should.equal('BurgerBurger');
        response.body[0].calories.should.equal('200');
      })
        done();
      });
    });

    it('should throw a 400 and fail to update a food entry if a property is missing', (done) => {
      chai.request(server)
      .patch('/api/v1/foods/1')
      .send({
        name: "BurgerBurger",
      })
      .end((err, response) => {
        response.should.have.status(400);
        response.should.be.json;
        done();
      });
    });
  });

  describe('DELETE /api/v1/foods/:id', () => {
    it('should delete a food entry, if the food is not part of any meals', (done) => {
      chai.request(server)
      .delete('/api/v1/foods/2')
      .end((err, response) => {
        response.should.have.status(204);
        done();
      });
    });

    it('should throw a 404 and fail to delete a food entry, if the food is part of any meals', (done) => {
      chai.request(server)
      .delete('/api/v1/foods/1')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });

    it('should throw a 404 if the food entry does not exist', (done) => {
      chai.request(server)
      .delete('/api/v1/foods/100')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/days', () => {
    it('should return the days entries', function(done) {
      chai.request(server)
      .get('/api/v1/days')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('goal');

        response.body[0].should.have.property('created_at');
        response.body[0].should.have.property('updated_at');
        done();
      });
    });
  });

  describe('GET /api/v1/today', () => {
    it('should return the most recent days entry', function(done) {
      chai.request(server)
      .get('/api/v1/today')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('goal');

        response.body.should.have.property('created_at');
        response.body.should.have.property('updated_at');
        done();
      });
    });
  });

  describe('GET /api/v1/days/:id/meals', () => {
    it('should return the meals for a given day id', function(done) {
      chai.request(server)
      .get('/api/v1/days/1/meals')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('foods');

        done();
      });
    });
  });

  describe('GET /api/v1/meals', () => {
    it('should return the meals entries', function(done) {
      chai.request(server)
      .get('/api/v1/meals')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('foods');
        done();
      });
    });
  });

  describe('GET /api/v1/meals/:id/foods', () => {
    it('should return the all the foods for a meal', function(done) {
      chai.request(server)
      .get('/api/v1/meals/1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.have.property('id');
        response.body.should.have.property('meal');
        response.body.should.have.property('foods');
        response.body.foods.should.be.a('array');

        response.body.foods[0].should.have.property('id');
        response.body.foods[0].should.have.property('name');
        response.body.foods[0].should.have.property('calories');

        done();
      });
    });

    it('should throw a 404 if the request is send with an invalid meal ID', function(done) {
      chai.request(server)
      .get('/api/v1/meals/1000/foods')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        done();
      });
    });
  });

  describe('POST /api/v1/meals/:meal_id/foods/:food_id', () => {
    it('should add a food to a meal', function(done) {
      chai.request(server)
      .post('/api/v1/meals/1/foods/1')
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.have.property('message');
        response.body.message.should.equal('Successfully added Pemmican to Breakfast.')
        done();
      });
    });

    it('should throw a 404 if the request is sent with an invalid meal ID', function(done) {
      chai.request(server)
      .post('/api/v1/meals/1000/foods/1')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        done();
      });
    });

    it('should throw a 404 if the request is sent with an invalid food ID', function(done) {
      chai.request(server)
      .post('/api/v1/meals/1/foods/1000')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        done();
      });
    });
  });

  describe('DELETE /api/v1/meals/:meal_id/foods/:food_id', () => {
    it('should remove a food from a meal', function(done) {
      chai.request(server)
      .delete('/api/v1/meals/1/foods/3')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.have.property('message');
        response.body.message.should.equal('Successfully removed Raw Seal Flesh from Breakfast.')
        done();
      });
    });

    it('should throw a 404 if the request is sent with an invalid meal ID', function(done) {
      chai.request(server)
      .delete('/api/v1/meals/1000/foods/3')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        done();
      });
    });

    it('should throw a 404 if the request is sent with an invalid food ID', function(done) {
      chai.request(server)
      .delete('/api/v1/meals/1/foods/3000')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        done();
      });
    });
  });
});