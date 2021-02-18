import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../index';
import mockdata from './mockdata';
import models from '../database/models';

const { Room, Accommodation } = models;
chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const {
  it, describe
} = mocha;

describe('tests for Rooms:', () => {
  afterEach(async () => {
    await Room.destroy({
      where: {},
    });
  });
  afterEach(async () => {
    await Accommodation.destroy({
      where: {},
    });
  });
  it('should create Room', async () => {
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
    const res = await chai.request(app).post('/api/v1/rooms').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationId: accommodation.body.data.accommodation.id,
        roomType: mockdata.validRoom.roomType,
        bedType: mockdata.validRoom.bedType,
        roomCost: mockdata.validRoom.roomCost,
        roomNumber: mockdata.validRoom.roomNumber
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/robot.jpg'),
        'robot.jpg');
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should retrieve all Rooms', async () => {
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
    await chai.request(app).post('/api/v1/rooms').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationId: accommodation.body.data.accommodation.id,
        roomType: mockdata.validRoom.roomType,
        bedType: mockdata.validRoom.bedType,
        roomCost: mockdata.validRoom.roomCost,
        roomNumber: mockdata.validRoom.roomNumber
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/robot.jpg'),
        'robot.jpg');
    const res = await chai.request(app).get('/api/v1/rooms');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should not create Room when already exist', async () => {
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
    await chai.request(app).post('/api/v1/rooms').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationId: accommodation.body.data.accommodation.id,
        roomType: mockdata.validRoom.roomType,
        bedType: mockdata.validRoom.bedType,
        roomCost: mockdata.validRoom.roomCost,
        roomNumber: mockdata.validRoom.roomNumber
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/robot.jpg'),
        'robot.jpg');
    const res = await chai.request(app).post('/api/v1//rooms').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationId: accommodation.body.data.accommodation.id,
        roomType: mockdata.validRoom.roomType,
        bedType: mockdata.validRoom.bedType,
        roomCost: mockdata.validRoom.roomCost,
        roomNumber: mockdata.validRoom.roomNumber
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/robot.jpg'),
        'robot.jpg');
    expect(res.status).to.be.equal(409);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should update room', async () => {
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
    const room = await chai.request(app).post('/api/v1/rooms').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationId: accommodation.body.data.accommodation.id,
        roomType: mockdata.validRoom.roomType,
        bedType: mockdata.validRoom.bedType,
        roomCost: mockdata.validRoom.roomCost,
        roomNumber: mockdata.validRoom.roomNumber
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/robot.jpg'),
        'robot.jpg');
    const { id } = room.body.data.room;
    const res = await chai.request(app).put(`/api/v1/rooms/${id}`).set('Authorization', `Bearer ${token}`)
      .field({
        accommodationId: accommodation.body.data.accommodation.id,
        roomType: mockdata.validRoom.roomType,
        bedType: mockdata.validRoom.bedType,
        roomCost: mockdata.validRoom.roomCost,
        roomNumber: mockdata.validRoom.roomNumber
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/robot.jpg'),
        'robot.jpg');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('should retrieve single room Room', async () => {
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
    const room = await chai.request(app).post('/api/v1/rooms').set('Authorization', `Bearer ${token}`)
      .field({
        accommodationId: accommodation.body.data.accommodation.id,
        roomType: mockdata.validRoom.roomType,
        bedType: mockdata.validRoom.bedType,
        roomCost: mockdata.validRoom.roomCost,
        roomNumber: mockdata.validRoom.roomNumber
      })
      .attach('photo',
        fs.readFileSync('src/tests/testFile/robot.jpg'),
        'robot.jpg');
    const { id } = room.body.data.room;
    const res = await chai.request(app).get(`/api/v1/rooms/${id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should not get room by Id if does not exist', async () => {
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
    const res = await chai.request(app).get('/api/v1/rooms/1000');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
});
