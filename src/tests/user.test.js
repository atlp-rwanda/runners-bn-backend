import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
import mockdata from './mockdata';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const {
  it, describe
} = mocha;

const emailtoken = jwt.sign(mockdata.sendEmail, process.env.JWT_KEY);

const token = jwt.sign(mockdata.resetEmail, process.env.JWT_KEY);

describe('User related tests:', () => {
  it('should update user role', async () => {
    const res = await chai.request(app).put('/api/v1/users/3/role').set('Authorization', mockdata.token).send(mockdata.userRole);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('should not update user role with invalid role', async () => {
    const res = await chai.request(app).put('/api/v1/users/3/role').set('Authorization', mockdata.token).send(mockdata.userInvalidRole);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('error');
  });
  it('should not update user role with invalid token', async () => {
    const res = await chai.request(app).put('/api/v1/users/3/role').set('Authorization', mockdata.invalidToken).send(mockdata.userInvalidRole);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('error');
  });
  it('should not send a reset link to an invalid email', async () => {
    const res = await chai.request(app).post('/api/v1/users/forgotPassword').send(mockdata.resetInvalidEmail);
    expect(res.status).to.be.equal(400);
  });
  it('should send a reset link to the user', async () => {
    const res = await chai.request(app).post('/api/v1/users/forgotPassword').send(mockdata.resetEmail);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message');
  });
  it('should reset the password', async () => {
    const res = await chai.request(app).put(`/api/v1/users/resetPassword/${token}`).send(mockdata.resetPassword);
    expect(res.status).to.be.equal(200);
  });
  it('should not reset the password with invalid token', async () => {
    const res = await chai.request(app).put(`/api/v1/users/resetPassword/${mockdata.invalidToken}`).send(mockdata.resetPassword);
    expect(res.status).to.be.equal(401);
  });
  it('should register a user ', async () => {
    const res = await chai.request(app).post('/api/v1/users/signup').send(mockdata.signup);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('data');
  });
  it('should not register a user already registered', async () => {
    const res = await chai.request(app).post('/api/v1/users/signup').send(mockdata.signup);
    expect(res.status).to.be.equal(409);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should not register a user without valid email', async () => {
    const res = await chai.request(app).post('/api/v1/users/signup').send(mockdata.signupInvalid);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should not login an unverified user', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send(mockdata.signin);
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should not login a user without valid password', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send(mockdata.signinInvalidPassword);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should not login a user without valid email', async () => {
    const res = await chai.request(app).post('/api/v1/users/login').send(mockdata.signinInvalidEmail);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('error');
  });
  it('should verify the email', async () => {
    const res = await chai.request(app).patch(`/api/v1/users/verifyEmail/${emailtoken}`).send(mockdata.sendEmail);
    expect(res.status).to.be.equal(200);
  });
  it('should not verify email with invalid token', async () => {
    const res = await chai.request(app).patch(`/api/v1/users/verifyEmail/${mockdata.invalidToken}`).send(mockdata.sendEmail);
    expect(res.status).to.be.equal(401);
  });
});
