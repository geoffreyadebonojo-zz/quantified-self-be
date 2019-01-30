const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
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

  it('should not return success for non-existent endpoint', function(done) {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    })
  });

  it('should return a food by id', function(done) {
    chai.request(server)
    .get('/api/v1/foods/3')
    .end((err, response) =>
    {
      response.should.be.json;
      response.body[0].should.be.a('object');
      response.body[0].should.have.property('name');
      response.body[0].should.have.property('calories');
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

  // beforeEach((done) => {
  //   database.seed.run()
  //     .then(() => done())
  //     .catch(error => {
  //       throw error;
  //     });
  // });

  // after((done) => {
    // database teardown
  // });

  xdescribe('GET /api/v1/foods', () => {
    it('should return all of the foods', done => {
      chai.request(server)
      .get('/api/v1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.be.a('array')
        done();
      });
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
        done();
      });
    });
  });
});