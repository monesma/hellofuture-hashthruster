import request from 'supertest';
import MongoConnect from '../../../frameworks/database/mongo';
import appServer from '../../../frameworks/express/app';
import { app, server } from '../../../frameworks/express/app';
import Chance from 'chance';
import { CreateProjectQuery } from '../../../domain/dto/project/project-dto';
import projectRepository from '../../../frameworks/repositories/mongo/project/project.repository';
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

const generateTestProjectData = (): CreateProjectQuery => ({
  creation_date: new Date(),
  projectName: chance.company(),
  tokenName: 'Alpha token',
  tokenSymbol: 'ALFA',
  projectWebsite: 'https://alphatoken.com',
  projectDescription: chance.paragraph({ sentences: 200 }),
  teamMemberCount: 15,
  teamMembers: [
    { name: 'Yann', position: 'CEO', linkedin: 'https://linkedin.com' },
  ],
  hasPartners: true,
  partnerCount: 5,
  mainPartner: 'Hedera',
  partnerRole: 'Help us for marketing',
  technologies: ['Hedera Token Service'],
  isOpenSource: true,
  repositoryLink: '',
  isAudited: true,
  auditCompany: chance.company(),
  tokenPurpose: chance.paragraph({ sentences: 50 }),
  tokenSupply: 75000000,
  tokenDistribution: chance.paragraph({ sentences: 50 }),
  tokenStandard: 'Hedera Token Service',
  hashscanLink: 'https://hashcan.io/vdkvjdsb',
  businessModel: true,
  revenueGeneration: chance.paragraph({ sentences: 50 }),
  tokenUseCases: chance.paragraph({ sentences: 50 }),
  hasRoadMap: true,
  roadMapLink: "https://example.com/roadmap",
  registeredCountry: 'Poland',
  compliesWithRegulations: true,
  obtainedLegalAdvice: true,
  marketingStrategy: chance.paragraph({ sentences: 50 }),
  communicationChannels: ['Twitter', 'Telegram'],
  communityMembers: '500-2500',
  risks: chance.paragraph({ sentences: 50 }),
  challenges: chance.paragraph({ sentences: 50 }),
  fundraisingTarget: 150000,
  minInvestment: '30',
  maxInvestment: '80',
  tokenValue: 5,
  successReason: chance.paragraph({ sentences: 50 }),
  differentiation: chance.paragraph({ sentences: 50 }),
  launchDate: '25/02/2025',
  hasLaunched: false,
  projectLaunchDate: '15/12/2024',
  pdfFileName: 'pitchBlabla.pdf',
  status: 'pending',
  projectEmail: 'blabla@gmail.com'
});

describe('Test project API', () => {
  let testProject: CreateProjectQuery;
  let createdProjectId: string;
  let accessToken: string;
  let refreshToken: string;
  let xAccessToken: any;
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
    testProject = generateTestProjectData();
    adminInfos = {...testProject,refreshToken: refreshToken, public_key: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBep6/c96z1MHvGCgtDcISCFD8Fg/\nwNN/0IKyFnK2uCzyrfcTzs8xeDG5Rwdvf/SdAO23/+n50OaTlLJNolUq0Q==\n-----END PUBLIC KEY-----`, role: 'superAdmin'}
    const response = await request(app)
      .post('/api/v1/project')
      .send(testProject)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.content).toBeDefined();
    expect(response.body.content.createdProject).toBeDefined();

    createdProjectId = response.body.content.createdProject._id;
  });

  afterEach(async () => {
    if (createdProjectId) {
      await projectRepository.delete(createdProjectId);
    }
  });

  test('It should respond 200 success', async () => {
    const response = await request(app)
      .get('/api/v1/project')
      .set('x-access-token', xAccessToken)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.status).toBe(200);
  });

  test('It should get all projects', async () => {
    const response = await request(app)
      .post('/api/v1/project/all')
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.projects).toBeDefined();
    expect(response.body.content.projects.length).toBeGreaterThan(0);
  });

  test('It should get one project', async () => {
    const response = await request(app)
      .post(`/api/v1/project/one/${createdProjectId}`)
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.project).toBeDefined();
    expect(response.body.content.project._id).toBe(createdProjectId);
  });

  test('It should update one project', async () => {
    const response = await request(app)
      .put(`/api/v1/project/update/${createdProjectId}`)
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.updatedProject).toBeDefined();
    expect(response.body.content.updatedProject._id).toBe(createdProjectId);
  });

  test('It should delete one project', async () => {
    const response = await request(app)
      .post(`/api/v1/project/delete/${createdProjectId}`)
      .set('x-access-token', xAccessToken)
      .send(adminInfos)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).toBe(200);
    expect(response.body.content.msg).toBeDefined();
    expect(response.body.content.msg).toBe("Project deleted with success");
  });
});
