import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { IUser } from '../interfaces';
import Users from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser= {
  id: 1,
  username: "admin",
  role: "admin",
  email: "admin@email.com",
  password: "secret_admin"
}

const bodyMock: IUser= {
  email: "admin@email.com",
  password: "secret_admin"
}

describe('Login', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });
  
  it('should return status 200', async () => {
    sinon.stub(Users, "findOne")
    .resolves(userMock as Users)

      const chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(bodyMock)
      
      expect(chaiHttpResponse.status).to.equal(200);
    })
  })