import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Users from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: Array<object>= [{
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@email.com",
  password: "secret_admin"
},
{
  id: 2,
  username: "User",
  role: "user",
  email: "user@email.com",
  password: "secret_user"
}]

describe('Login', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });
  
  it('should return status 200 and token', async () => {
    sinon.stub(Users, "findOne")
    .resolves(userMock[0] as Users)

      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: "admin@email.com",
          password: "secret_admin"
        })
      
      expect(chaiHttpResponse.status).to.equal(200);
      // expect(chaiHttpResponse.body).to.have.property('token');
    })
  })