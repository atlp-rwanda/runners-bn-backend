import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import { stub } from 'sinon';
import app from '../index';
import mockdata from './mockdata';
import models from '../database/models';
import uploader from '../config/cloudinary';
import sequelizeErrorHandler from '../helpers/sequelizeErrorHandler';

const { Accommodation } = models;
chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const {
  it, describe
} = mocha;
const image = 'https://res.cloudinary.com/mucyo/image/upload/v1612771085/AccommodationPictures/a4938b25a277e31af64720041e0290e3_bjwq4c.jpg';
stub(uploader, 'upload').resolves({ url: image });

describe('tests for Accommodations:', () => {
  afterEach(async () => {
    await Accommodation.destroy({
      where: {},
      truncate: true
    });
  });
  it('should create accommodation', async () => {
    const loginUser = await chai.request(app).post('/api/v1/users/login').send(mockdata.loginadmin);
    const { token } = loginUser.body.data;
    const res = await chai.request(app).post('/api/v1/accommodations/').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.validAccommodation.accommodationName,
        accommodationType: mockdata.validAccommodation.accommodationType,
        description: mockdata.validAccommodation.description,
        amenities: mockdata.validAccommodation.amenities,
        numberOfRooms: mockdata.validAccommodation.numberOfRooms,
        latitude: mockdata.validAccommodation.latitude,
        longitude: mockdata.validAccommodation.longitude,
        locationId: mockdata.validAccommodation.locationId,
        streetAddress: mockdata.validAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/m-blog-2.jpg'),
        'm-blog-2.jpg');
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should not create accommodation when already exist', async () => {
    const loginUser = await chai.request(app).post('/api/v1/users/login').send(mockdata.loginadmin);
    const { token } = loginUser.body.data;
    await chai.request(app).post('/api/v1/accommodations/').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.invalidAccommodation.accommodationName,
        accommodationType: mockdata.invalidAccommodation.accommodationType,
        description: mockdata.invalidAccommodation.description,
        amenities: mockdata.invalidAccommodation.amenities,
        numberOfRooms: mockdata.invalidAccommodation.numberOfRooms,
        latitude: mockdata.invalidAccommodation.latitude,
        longitude: mockdata.invalidAccommodation.longitude,
        locationId: mockdata.invalidAccommodation.locationId,
        streetAddress: mockdata.invalidAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/m-blog-2.jpg'),
        'm-blog-2.jpg');
    const res = await chai.request(app).post('/api/v1/accommodations/').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.invalidAccommodation.accommodationName,
        accommodationType: mockdata.invalidAccommodation.accommodationType,
        description: mockdata.invalidAccommodation.description,
        amenities: mockdata.invalidAccommodation.amenities,
        numberOfRooms: mockdata.invalidAccommodation.numberOfRooms,
        latitude: mockdata.invalidAccommodation.latitude,
        longitude: mockdata.invalidAccommodation.longitude,
        locationId: mockdata.invalidAccommodation.locationId,
        streetAddress: mockdata.invalidAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/m-blog-2.jpg'),
        'm-blog-2.jpg');
    expect(res.status).to.be.equal(409);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should call a function with invalid argument', async () => {
    const data = { message: 'undefined error', name: 'error' };
    const res = sequelizeErrorHandler(data);
    expect(res.statusCode).to.be.equal(500);
  });
  it('should call a function with invalid', async () => {
    const data = { message: 'undefined error', name: 'SequelizeUniqueConstraintError', fields: { } };
    const res = sequelizeErrorHandler(data);
    expect(res.statusCode).to.be.equal(409);
  });
  it('should not create accommodation when not tripAdmin', async () => {
    const loginUser = await chai.request(app).post('/api/v1/users/login').send(mockdata.loginManager);
    const { token } = loginUser.body.data;
    const res = await chai.request(app).post('/api/v1/accommodations/').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.validAccommodation.accommodationName,
        accommodationType: mockdata.validAccommodation.accommodationType,
        description: mockdata.validAccommodation.description,
        amenities: mockdata.validAccommodation.amenities,
        numberOfRooms: mockdata.validAccommodation.numberOfRooms,
        latitude: mockdata.validAccommodation.latitude,
        longitude: mockdata.validAccommodation.longitude,
        locationId: mockdata.validAccommodation.locationId,
        streetAddress: mockdata.validAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/m-blog-2.jpg'),
        'm-blog-2.jpg');
    expect(res.status).to.be.equal(403);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should not create accommodation without valid location ID', async () => {
    const loginUser = await chai.request(app).post('/api/v1/users/login').send(mockdata.loginadmin);
    const { token } = loginUser.body.data;
    console.log(token);
    const res = await chai.request(app).post('/api/v1/accommodations/').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.validAccommodation.accommodationName,
        accommodationType: mockdata.validAccommodation.accommodationType,
        description: mockdata.validAccommodation.description,
        amenities: mockdata.validAccommodation.amenities,
        numberOfRooms: mockdata.validAccommodation.numberOfRooms,
        latitude: mockdata.validAccommodation.latitude,
        longitude: mockdata.validAccommodation.longitude,
        locationId: mockdata.validAccommodation.locationID,
        streetAddress: mockdata.validAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/m-blog-2.jpg'),
        'm-blog-2.jpg');
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should get all accommodations', async () => {
    const loginUser = await chai.request(app).post('/api/v1/users/login').send(mockdata.loginadmin);
    const { token } = loginUser.body.data;
    await chai.request(app).post('/api/v1/accommodations/').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.validAccommodation.accommodationName,
        accommodationType: mockdata.validAccommodation.accommodationType,
        description: mockdata.validAccommodation.description,
        amenities: mockdata.validAccommodation.amenities,
        numberOfRooms: mockdata.validAccommodation.numberOfRooms,
        latitude: mockdata.validAccommodation.latitude,
        longitude: mockdata.validAccommodation.longitude,
        locationId: mockdata.validAccommodation.locationId,
        streetAddress: mockdata.validAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/m-blog-2.jpg'),
        'm-blog-2.jpg');
    const res = await chai.request(app).get('/api/v1/accommodations/');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should get accommodation by Id', async () => {
    const loginUser = await chai.request(app).post('/api/v1/users/login').send(mockdata.loginadmin);
    const { token } = loginUser.body.data;
    const accommodation = await chai.request(app).post('/api/v1/accommodations/').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.validAccommodation.accommodationName,
        accommodationType: mockdata.validAccommodation.accommodationType,
        description: mockdata.validAccommodation.description,
        amenities: mockdata.validAccommodation.amenities,
        numberOfRooms: mockdata.validAccommodation.numberOfRooms,
        latitude: mockdata.validAccommodation.latitude,
        longitude: mockdata.validAccommodation.longitude,
        locationId: mockdata.validAccommodation.locationId,
        streetAddress: mockdata.validAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/m-blog-2.jpg'),
        'm-blog-2.jpg');
    const res = await chai.request(app).get(`/api/v1/accommodations/${accommodation.body.data.accommodation.id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should not get accommodation by Id if does not exist', async () => {
    const res = await chai.request(app).get('/api/v1/accommodations/100');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should delete a single accommodation by Id', async () => {
    const loginUser = await chai.request(app).post('/api/v1/users/login').send(mockdata.loginadmin);
    const { token } = loginUser.body.data;
    const accommodation = await chai.request(app).post('/api/v1/accommodations/').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.validAccommodation.accommodationName,
        accommodationType: mockdata.validAccommodation.accommodationType,
        description: mockdata.validAccommodation.description,
        amenities: mockdata.validAccommodation.amenities,
        numberOfRooms: mockdata.validAccommodation.numberOfRooms,
        latitude: mockdata.validAccommodation.latitude,
        longitude: mockdata.validAccommodation.longitude,
        locationId: mockdata.validAccommodation.locationId,
        streetAddress: mockdata.validAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/m-blog-2.jpg'),
        'm-blog-2.jpg');
    const res = await chai.request(app).delete(`/api/v1/accommodations/${accommodation.body.data.id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('should update a single accommodation by Id', async () => {
    const loginUser = await chai.request(app).post('/api/v1/users/login').send(mockdata.loginadmin);
    const { token } = loginUser.body.data;
    const accommodation = await chai.request(app).post('/api/v1/accommodations/').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.validAccommodation.accommodationName,
        accommodationType: mockdata.validAccommodation.accommodationType,
        description: mockdata.validAccommodation.description,
        amenities: mockdata.validAccommodation.amenities,
        numberOfRooms: mockdata.validAccommodation.numberOfRooms,
        latitude: mockdata.validAccommodation.latitude,
        longitude: mockdata.validAccommodation.longitude,
        locationId: mockdata.validAccommodation.locationId,
        streetAddress: mockdata.validAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/m-blog-2.jpg'),
        'm-blog-2.jpg');
    const res = await chai.request(app).put(`/api/v1/accommodations/${accommodation.body.data.id}`).set('Authorization', `Bearer ${token}`)
      .field({
        accommodationName: mockdata.validAccommodation.accommodationName,
        accommodationType: mockdata.validAccommodation.accommodationType,
        description: mockdata.validAccommodation.description,
        amenities: mockdata.validAccommodation.amenities,
        numberOfRooms: mockdata.validAccommodation.numberOfRooms,
        latitude: mockdata.validAccommodation.latitude,
        longitude: mockdata.validAccommodation.longitude,
        locationId: mockdata.validAccommodation.locationId,
        streetAddress: mockdata.validAccommodation.streetAddress,
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/robot.jpg'),
        'robot.jpg');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
});
