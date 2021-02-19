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
  it('should add a comment on a trip', async () => {
    const trip = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripnewRequest);
    const tripId = trip.body.data.id;
    const res = await chai.request(app).post(`/api/v1/trips/${tripId}/comment`).set('Authorization', mockdata.manToken).send(mockdata.comment);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('should only allow manager and a requester to add a comment', async () => {
    const trip = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripnewRequest);
    const tripId = trip.body.data.id;
    const res = await chai.request(app).post(`/api/v1/trips/${tripId}/comment`).set('Authorization', mockdata.token).send(mockdata.comment);
    expect(res.status).to.be.equal(403);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should only allow relevant manager and a requester to add a comment', async () => {
    const trip = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripnewRequest);
    const tripId = trip.body.data.id;
    const res = await chai.request(app).post(`/api/v1/trips/${tripId}/comment`).set('Authorization', mockdata.reqTwoToken).send(mockdata.comment);
    expect(res.status).to.be.equal(403);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should only a manager or a requester to add a comment on an existing trip', async () => {
    const res = await chai.request(app).post('/api/v1/trips/100/comment').set('Authorization', mockdata.reqTwoToken).send(mockdata.comment);
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should allow a manager or a requester to view all comments', async () => {
    const trip = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripnewRequest);
    const tripId = trip.body.data.id;
    await chai.request(app).post(`/api/v1/trips/${tripId}/comment`).set('Authorization', mockdata.reqToken).send(mockdata.comment);
    const res = await chai.request(app).get(`/api/v1/trips/${tripId}/comments`).set('Authorization', mockdata.reqToken);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should allow a user to delete a comment', async () => {
    const trip = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripnewRequest);
    const tripId = trip.body.data.id;
    const comment = await chai.request(app).post(`/api/v1/trips/${tripId}/comment`).set('Authorization', mockdata.reqToken).send(mockdata.comment);
    const { id } = comment.body.data;
    const res = await chai.request(app).delete(`/api/v1/trips/comments/${id}`).set('Authorization', mockdata.reqToken);
    expect(res.status).to.be.equal(200);
  });
  it('should  only allow manager and a requester to view all comments', async () => {
    const trip = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripnewRequest);
    const tripId = trip.body.data.id;
    await chai.request(app).post(`/api/v1/trips/${tripId}/comment`).set('Authorization', mockdata.reqToken).send(mockdata.comment);
    const res = await chai.request(app).get(`/api/v1/trips/${tripId}/comments`).set('Authorization', mockdata.token);
    expect(res.status).to.be.equal(403);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
});
