import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });
  
  it('should return status 200', async () => {

      const chaiHttpResponse = await chai.request(app)
        .get('/teams');
      
      expect(chaiHttpResponse.status).to.equal(200);
    })

  it('should return status 200 when get a Team By Id', async () => {

      const chaiHttpResponse = await chai.request(app)
        .get('/teams/1');
      
      expect(chaiHttpResponse.status).to.equal(200);
    })
  })