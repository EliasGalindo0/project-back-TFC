import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { IUser } from '../interfaces';
import Users from '../database/models/users';
import loginService from '../services/loginService';
import ValidationError from '../middleWares/ValidateError';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser= {
  id: 1,
  username: "admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

const bodyMock: IUser= {
  email: "admin@email.com",
  password: "secret_admin"
}

const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjYxOTA3NzAzfQ.1NuT4HqDMOa5y1FCiShTlp8PCI2DwVtq7BOxoHkdy0g"

// const role: Record<string, unknown> = {role: "admin"};

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
  it('should return token', async () => {
    sinon.stub(loginService, "login")
    .resolves({token})

      const chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(bodyMock)
      
      expect(chaiHttpResponse.body.token).to.equal(token);
    })
  it('should return status 401', async () => {
    sinon.stub(loginService, 'login').callsFake(() => {
      throw new ValidationError(401, 'All fields must be filled')
  })

      const chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(bodyMock)
      
      expect(chaiHttpResponse.status).to.equal(401);
    })
  it('should return status 400 case password or email incorrect', async () => {
    sinon.stub(loginService, 'login').callsFake(() => {
      throw new ValidationError(400, 'Incorrect email or password')
  })

      const chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(bodyMock)
      
      expect(chaiHttpResponse.status).to.equal(400);
    })
  // it('should return user role', async () => {
  //   sinon.stub(loginService, "userRole")
  //   .resolves(role)

  //     const chaiHttpResponse = await chai.request(app)
  //       .post('/login/validate')
  //       .send(bodyMock)
      
  //     expect(chaiHttpResponse.body.userRole).to.equal(role);
  //   })
  })