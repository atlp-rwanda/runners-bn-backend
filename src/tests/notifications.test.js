import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockdata from './mockdata';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const {
  it, describe
} = mocha;

let managerToken;

const signinUrl = '/api/v1/users/login';
const getNotifications = '/api/v1/notification';
const markOneAsRead = '/api/v1/notification/read?id=1';
const markAllAsRead = '/api/v1/notification/readAll';

const user = {
  email: 'jimnyagtr@gmail.com',
  password: 'James@2020'
};

describe('Notification related tests:', () => {
  beforeEach(async () => {
    const res = await chai.request(app).post(signinUrl).send(user);
    managerToken = res.body.data.token;
  });

  it('should retrieve all the notifications', async () => {
    const trip = await chai.request(app).post('/api/v1/trips/new').set('Authorization', mockdata.reqToken).send(mockdata.tripnewRequest);
    const tripId = trip.body.data.id;
    await chai.request(app).post(`/api/v1/trips/${tripId}/comment`).set('Authorization', mockdata.reqToken).send(mockdata.commentNumberTwo);
    await chai.request(app).post(`/api/v1/trips/${tripId}/comment`).set('Authorization', mockdata.reqToken).send(mockdata.comment);
    const res = await chai.request(app).get(getNotifications).set('Authorization', `Bearer ${managerToken}`);
    expect(res.status).to.be.equal(200);
  });
  it('should retrieve all the notifications as a requester', async () => {
    const res = await chai.request(app).get(getNotifications).set('Authorization', mockdata.reqToken);
    expect(res.status).to.be.equal(200);
  });
  it('should mark one notification as read', async () => {
    const res = await chai.request(app).patch(markOneAsRead).set('Authorization', `Bearer ${managerToken}`);
    expect(res.status).to.be.equal(200);
  });
  it('should get no notifications when all are read', async () => {
    await chai.request(app).patch(markAllAsRead).set('Authorization', `Bearer ${managerToken}`);
    const res = await chai.request(app).get(getNotifications).set('Authorization', `Bearer ${managerToken}`);
    expect(res.status).to.be.equal(200);
  });
  it('should mark all notifications as read', async () => {
    const res = await chai.request(app).patch(markAllAsRead).set('Authorization', `Bearer ${managerToken}`);
    expect(res.status).to.be.equal(200);
  });
});
