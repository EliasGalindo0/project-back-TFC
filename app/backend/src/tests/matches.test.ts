import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });
  
  it('should return status 200', async () => {

      const chaiHttpResponse = await chai.request(app)
        .post('/matches');
      
      expect(chaiHttpResponse.status).to.equal(200);
    })
  })