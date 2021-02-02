import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockdata from './mockdata';
import models from '../database/models';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const {
  it, describe, afterEach
} = mocha;
const { Trip } = models;

describe('Trip related tests:', () => {
  afterEach(async () => {
    await Trip.destroy({
      where: {},
      truncate: true
    });
  });
  it('should create a trip', async () => {
    const res = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripRequest);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.be.have.property('message');
  });
  it('should all manager to get all trips', async () => {
    const res = await chai.request(app).get('/api/v1/trips').set('Authorization', mockdata.manToken);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.be.have.property('message');
  });
  it('should get single trip', async () => {
    const trip = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripRequest);
    const { id } = trip.body.data;
    const res = await chai.request(app).get(`/api/v1/trips/${id}`).set('Authorization', mockdata.manToken);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.be.have.property('message');
  });
  it('should update the trip request', async () => {
    const trip = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripnewRequest);
    const tripId = trip.body.data.id;
    const res = await chai.request(app).put(`/api/v1/trips/${tripId}`).set('Authorization', mockdata.reqToken).send(mockdata.tripUpdatedReq);
    expect(res.status).to.be.equal(200);
  });
});
