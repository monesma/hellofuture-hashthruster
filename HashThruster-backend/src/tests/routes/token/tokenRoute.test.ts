import request from 'supertest';
import MongoConnect from '../../../frameworks/database/mongo';
import appServer from '../../../frameworks/express/app';
import { app, server } from '../../../frameworks/express/app';
import Chance from 'chance';
import { CreateAndUpdateTokenQuery } from '../../../domain/dto/token/token-dto';
import tokenRepository from '../../../frameworks/repositories/mongo/token/token.repository';
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

const generateTestTokenData = (): CreateAndUpdateTokenQuery => ({
  creation_date: new Date(),
  projectName: chance.company(),
  tokenName: 'Alpha token',
  tokenSymbol: 'ALFA',
  projectWebsite: 'https://alphatoken.com',
  projectDescription: chance.paragraph({ sentences: 200 }),
  technologies: ['Hedera Token Service'],
  isOpenSource: true,
  repositoryLink: '',
  isAudited: true,
  tokenPurpose: chance.paragraph({ sentences: 50 }),
  tokenSupply: 75000000,
  tokenDistribution: chance.paragraph({ sentences: 50 }),
  tokenStandard: 'Hedera Token Service',
  hashscanLink: 'https://hashcan.io/vdkvjdsb',
  revenueGeneration: chance.paragraph({ sentences: 50 }),
  tokenUseCases: chance.paragraph({ sentences: 50 }),
  registeredCountry: 'Poland',
  compliesWithRegulations: true,
  obtainedLegalAdvice: true,
  fundraisingTarget: 150000,
  minInvestment: '30',
  maxInvestment: '80',
  tokenValue: 5,
  successReason: chance.paragraph({ sentences: 50 }),
  differentiation: chance.paragraph({ sentences: 50 }),
  launchDate: '25/02/2025',
  linkedin: "https://fake.com",
  discord: "https://fake.com",
  telegram: "https://fake.com",
  twitter: "https://fake.com",
  instagram: "https://fake.com",
  pdfFileName: 'pitchBlabla.pdf',
  imageFileName: 'img.png',
  walletAccountId: {
    accountId: "0.0.4680083",
    private_key: "302e020100300506032b65700422042030624100969208c0155f1e57b6cf07782bb75a",
    public_key: "302a300506032b657003210012cbda27feef43c10d8dcb6acd6f028321678c259f4465"
  }
});

describe('Test token API', () => {
  let testToken: CreateAndUpdateTokenQuery;
  let createdTokenId: string;
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

  beforeEach(async () => {
    testToken = generateTestTokenData();

    adminInfos = {...testToken,refreshToken: refreshToken, public_key: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBep6/c96z1MHvGCgtDcISCFD8Fg/\nwNN/0IKyFnK2uCzyrfcTzs8xeDG5Rwdvf/SdAO23/+n50OaTlLJNolUq0Q==\n-----END PUBLIC KEY-----`, role: 'superAdmin'}

    const response = await request(app)
      .post('/api/v1/token')
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body.content).toBeDefined();
    expect(response.body.content.createdToken).toBeDefined();

    createdTokenId = response.body.content.createdToken._id;
  });

  afterEach(async () => {
    if (createdTokenId) {
      await tokenRepository.delete(createdTokenId);
    }
  });

  test('It should respond 200 success', async () => {
    const response = await request(app)
      .get('/api/v1/token')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.status).toBe(200);
  });

  test('It should get all tokens', async () => {
    const response = await request(app)
      .get('/api/v1/token/all')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.tokens).toBeDefined();
    expect(response.body.content.tokens.length).toBeGreaterThan(0);
  });

  test('It should get one token', async () => {
    const response = await request(app)
      .get(`/api/v1/token/one/${createdTokenId}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.token).toBeDefined();
    expect(response.body.content.token._id).toBe(createdTokenId);
  });

  test('It should get one wallet from token', async () => {
    const response = await request(app)
      .post(`/api/v1/token/wallet/${createdTokenId}`)
      .expect('Content-Type', /json/)
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.walletInfo).toBeDefined();
    expect(response.body.content.walletInfo._id).toBe(createdTokenId);
  });

  test('It should update one token', async () => {
    const response = await request(app)
      .put(`/api/v1/token/update/${createdTokenId}`)
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.updatedToken).toBeDefined();
    expect(response.body.content.updatedToken._id).toBe(createdTokenId);
  });

  test('It should delete one token', async () => {
    const response = await request(app)
      .post(`/api/v1/token/delete/${createdTokenId}`)
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.msg).toBeDefined();
    expect(response.body.content.msg).toBe("Token deleted with success");
  });

  test('It should delete wallet from token', async () => {
    const response = await request(app)
    .post(`/api/v1/token/wallet/delete/${createdTokenId}`)
    .set('x-access-token', xAccessToken)
    .send(adminInfos)
    .expect('Content-Type', /json/)
    .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.updatedToken).toBeDefined();
    expect(response.body.content.updatedToken.walletAccountId).toBe("deleted");
  });
});
