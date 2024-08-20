import request from 'supertest';
import MongoConnect from '../../../frameworks/database/mongo';
import appServer from '../../../frameworks/express/app';
import { app, server } from '../../../frameworks/express/app';
import Chance from 'chance';
import { CreateFrontPartnerQuery, UpdatePartnerStatusQuery } from '../../../domain/dto/partner/partner-dto';
const chance = new Chance();
import partnerRepository from '../../../frameworks/repositories/mongo/partner/partner.repository';
import adminRepository from '../../../frameworks/repositories/mongo/admin/admin.repository';
import createPartnerUseCase from '../../../useCases/partner/createPartner.useCase';
import repositories from '../../../frameworks/repositories/mongo';
import useCases from '../../../useCases';
import createAdminUseCase from '../../../useCases/admin/createAdmin.useCase';
import { CreateFrontAdminQuery, UpdateAdminStatusQuery } from '../../../domain/dto/admin/admin-dto';

describe('Test auth API', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createPartner = createPartnerUseCase(dependencies).execute;
  const createAdmin = createAdminUseCase(dependencies).execute;

  beforeAll(async () => {
    appServer.start(9015);
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
    //appServer.end()
    server.close();
  });

  test('it should post acces partner', async () => {

    const testPartner5: CreateFrontPartnerQuery = {
      name: chance.name(),
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      phone: chance.phone()
    };

    const newPartner = await createPartner(testPartner5);

    expect(newPartner.status).toBe(200);

    const updatePartnerStatus: UpdatePartnerStatusQuery = {
      status: 'validated',
    };

    await partnerRepository.updatePartnerStatusQuery(
        updatePartnerStatus,
        newPartner.content.createdPartner._id,
    )


    const testAccessPartner = {
        public_key: newPartner.content.createdPartner.public_key,
        _id: newPartner.content.createdPartner._id,
        email: newPartner.content.createdPartner.email,
      }

    const response = await request(app)
      .post('/api/v1/auth/getAccessPartner')
      .send(testAccessPartner)
      .expect('Content-Type', /json/)
      .expect(200);

     
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.content.refreshToken).toBeDefined();
    expect(response.body.content.accessToken).toBeDefined();

    const testRefreshToken = {
      refreshToken: response.body.content.refreshToken,
      public_key: testAccessPartner.public_key,
    };

    const response2 = await request(app)
      .post('/api/v1/auth/refreshAccessPartner')
      .send(testRefreshToken)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response2.status).toBe(200);
    expect(response2.body.status).toBe(200);
    expect(response2.body.content.accessToken).toBeDefined();

    await partnerRepository.delete(newPartner.content.createdPartner._id);
  });

  test('it should post acces admin', async () => {

    const testAdmin5: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: chance.email(),
      role: 'admin'
    };

    const newAdmin = await createAdmin(testAdmin5);

    expect(newAdmin.status).toBe(200);

    await adminRepository.updateAdminStatusQuery(
      'validated',
        newAdmin.content.createdAdmin._id,
    )


    const testAccessAdmin = {
        public_key: newAdmin.content.createdAdmin.public_key,
        _id: newAdmin.content.createdAdmin._id,
        email: newAdmin.content.createdAdmin.email,
      }

    const response = await request(app)
      .post('/api/v1/auth/getAccessAdmin')
      .send(testAccessAdmin)
      .expect('Content-Type', /json/)
      .expect(200);

     
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.content.refreshToken).toBeDefined();
    expect(response.body.content.accessToken).toBeDefined();

    const testRefreshToken = {
      refreshToken: response.body.content.refreshToken,
      public_key: testAccessAdmin.public_key,
    };

    const response2 = await request(app)
      .post('/api/v1/auth/refreshAccessAdmin')
      .send(testRefreshToken)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.content.accessToken).toBeDefined();

    await adminRepository.delete(newAdmin.content.createdAdmin._id);
  });
});
