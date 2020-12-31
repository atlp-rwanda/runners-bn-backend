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
});
