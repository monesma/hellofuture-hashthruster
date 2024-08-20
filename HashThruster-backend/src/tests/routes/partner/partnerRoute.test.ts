import request from 'supertest';
import MongoConnect from '../../../frameworks/database/mongo';
import appServer from '../../../frameworks/express/app';
import { app, server } from '../../../frameworks/express/app';
import Chance from 'chance';
import { CreateFrontPartnerQuery } from '../../../domain/dto/partner/partner-dto';
const chance = new Chance();
import partnerRepository from '../../../frameworks/repositories/mongo/partner/partner.repository';


describe('Test partner API', () => {
  beforeAll(async () => {
    appServer.start(9009);
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
    server.close();
  });

  test('It should respond 200 success', async () => {
    const response = await request(app)
      .get('/api/v1/partner')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.status).toBe(200);
  });

  test('it should post partner', async () => {
    const today = new Date();
    const testPartner = {
      name: 'Company name 11',
      creation_date: today,
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      phone: chance.phone(),
      status: 'pending',
    } as CreateFrontPartnerQuery;
    
    const response = await request(app)
      .post('/api/v1/partner')
      .send(testPartner)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    await partnerRepository.delete(response.body.content.createdPartner._id);
  });

  test('it should update partner password', async () => {
    const today = new Date();
    const testPartner = {
      name: 'Company name 12',
      creation_date: today,
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      phone: chance.phone(),
      status: 'pending',
    } as CreateFrontPartnerQuery;
    const response = await request(app)
      .post('/api/v1/partner')
      .send(testPartner)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.status).toBe(200);

    const updatePartnerPassword = {
      password: "azerty1234"
    }
    const updatePartnerBody = {
      updatePartnerPassword,
      id: response.body.content.createdPartner._id
    }
    const response2 = await request(app)
      .put('/api/v1/partner/updatePassword')
      .send(updatePartnerBody)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response2.status).toBe(200);
    await partnerRepository.delete(response.body.content.createdPartner._id);
  });
});
