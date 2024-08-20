import request from 'supertest';
import { Request, Response, NextFunction } from 'express';
import MongoConnect from '../../../frameworks/database/mongo';
import appServer from '../../../frameworks/express/app';
import { app, server } from '../../../frameworks/express/app';
import Chance from 'chance';
import { CreateFrontAdminQuery } from '../../../domain/dto/admin/admin-dto';
import adminRepository from '../../../frameworks/repositories/mongo/admin/admin.repository';
import portfinder from 'portfinder';

const chance = new Chance();


const authenticateAdminForTest = async () => {
  const adminCredentials = {
    public_key: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBep6/c96z1MHvGCgtDcISCFD8Fg/\nwNN/0IKyFnK2uCzyrfcTzs8xeDG5Rwdvf/SdAO23/+n50OaTlLJNolUq0Q==\n-----END PUBLIC KEY-----`,
    _id: '66ab671b255b9d88b19fc772',
    email: 'blabla@gmail.com',
    role: 'superAdmin'
  };
  

  const response = await request(app)
    .post('/api/v1/auth/getAccessAdmin')
    .send(adminCredentials)
    .expect(200);
  if (response.status === 200) {
    const { refreshToken, accessToken } = response.body.content;
    return {
      refreshToken,
      accessToken,
    };
  } else {
    throw new Error('Authentication failed');
  }
};

const loginAdminForTest = async () => {
  const adminInfos = {
    email: "blabla@gmail.com",
    password: "Azerty1234!"
  }
  const response = await request(app)
    .post('/api/v1/admin/login')
    .send(adminInfos)
    .expect(200);

  if (response.status === 200) {
    const { token } = response.body.content;
    return token;
  } else {
    throw new Error('Authentication failed');
  }
}

describe('Test admin API', () => {
  let accessToken: string;
  let refreshToken: string;
  let xAccessToken: string;
  let adminInfos: any;

  beforeAll(async () => {
    await MongoConnect.connect();
    const port = await portfinder.getPortPromise();
    appServer.start(port);
    process.env.URL_BASE = `http://localhost:${port}`
    // Authentification pour récupérer les tokens avant les tests
    const tokens = await authenticateAdminForTest();
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;

    xAccessToken = await loginAdminForTest();
  });
  afterAll(async () => {
    await MongoConnect.disconnect();
    server.close();
  });

  test('It should respond 200 success', async () => {
    const response = await request(app)
      .get('/api/v1/admin')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.status).toBe(200);
  });

  test('it should post admin', async () => {

    const testAdmin = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: chance.email(),
      sendRole: 'admin'
    } as CreateFrontAdminQuery;
    adminInfos = {...testAdmin,refreshToken: refreshToken, public_key: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBep6/c96z1MHvGCgtDcISCFD8Fg/\nwNN/0IKyFnK2uCzyrfcTzs8xeDG5Rwdvf/SdAO23/+n50OaTlLJNolUq0Q==\n-----END PUBLIC KEY-----`, role: 'superAdmin'}
    const response = await request(app)
      .post('/api/v1/admin')
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    await adminRepository.delete(response.body.content.createdAdmin._id);
  });

  test('it should get admin list', async () => {

    const testAdmin = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: chance.email(),
      sendRole: 'admin'
    } as CreateFrontAdminQuery;
    adminInfos = {...testAdmin,refreshToken: refreshToken, public_key: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBep6/c96z1MHvGCgtDcISCFD8Fg/\nwNN/0IKyFnK2uCzyrfcTzs8xeDG5Rwdvf/SdAO23/+n50OaTlLJNolUq0Q==\n-----END PUBLIC KEY-----`, role: 'superAdmin'}
    const response = await request(app)
      .post('/api/v1/admin/allAdmin')
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
  });

  test('it should update admin password', async () => {

    const testAdmin = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: chance.email(),
      sendRole: 'admin',
    } as CreateFrontAdminQuery;
    adminInfos = {...testAdmin,refreshToken: refreshToken, public_key: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBep6/c96z1MHvGCgtDcISCFD8Fg/\nwNN/0IKyFnK2uCzyrfcTzs8xeDG5Rwdvf/SdAO23/+n50OaTlLJNolUq0Q==\n-----END PUBLIC KEY-----`, role: 'superAdmin'}
    const response = await request(app)
      .post('/api/v1/admin')
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.status).toBe(200);
    const updateAdminPassword = {
      password: "azerty1234"
    };
    const updateAdminBody = {
      updateAdminPassword,
      id: response.body.content.createdAdmin._id
    };
    const response2 = await request(app)
      .put('/api/v1/admin/updatePassword')
      .send(updateAdminBody)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response2.status).toBe(200);
    await adminRepository.delete(response.body.content.createdAdmin._id);
  });
  test('it should update admin status', async () => {

    const testAdmin = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: chance.email(),
      sendRole: 'admin',
    } as CreateFrontAdminQuery;
    adminInfos = {...testAdmin,refreshToken: refreshToken, public_key: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBep6/c96z1MHvGCgtDcISCFD8Fg/\nwNN/0IKyFnK2uCzyrfcTzs8xeDG5Rwdvf/SdAO23/+n50OaTlLJNolUq0Q==\n-----END PUBLIC KEY-----`, role: 'superAdmin'}
    const response = await request(app)
      .post('/api/v1/admin')
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    const updateAdminStatus = {
      password: "Validated"
    };
    const updateAdminBody = {
      updateAdminStatus,
      id: response.body.content.createdAdmin._id,
      refreshToken: refreshToken, 
      public_key: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBep6/c96z1MHvGCgtDcISCFD8Fg/\nwNN/0IKyFnK2uCzyrfcTzs8xeDG5Rwdvf/SdAO23/+n50OaTlLJNolUq0Q==\n-----END PUBLIC KEY-----`, 
      role: 'superAdmin'
    };
    const response2 = await request(app)
      .put('/api/v1/admin/updateStatus')
      .set('x-access-token', xAccessToken)
      .send(updateAdminBody)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response2.status).toBe(200);
    await adminRepository.delete(response.body.content.createdAdmin._id);
  });
});
