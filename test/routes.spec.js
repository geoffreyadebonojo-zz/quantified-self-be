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
        done();
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
        done();
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
        done();
      });
    });
  });

  describe('GET /api/v1/foods/:id', () => {
    it('should return a food by id', function(done) {
      chai.request(server)
      .get('/api/v1/foods/3')
      .end((err, response) => {
        response.should.be.json;
        response.body[0].should.be.a('object');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('calories');
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
  });

  describe('PATCH /api/v1/foods/:id', () => {
    it('should update a food entry', (done) => {
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
        done();
      });
    });
  });
  
  describe('DELETE /api/v1/foods/:id', () => {
    it('should delete a food entry', (done) => {
      chai.request(server)
      .delete('/api/v1/foods/1')
      .end((err, response) => {
        response.should.have.status(204);
        done();
      });
    });
  });
  

  //DAYS 

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
});