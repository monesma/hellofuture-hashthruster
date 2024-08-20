import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontPartnerQuery } from '../../../domain/dto/partner/partner-dto';

const { authenticatePartnerUseCase, createPartnerUseCase } = useCases;

describe('Create a new partner', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createPartner = createPartnerUseCase(dependencies).execute;
  const authenticatePartner = authenticatePartnerUseCase(dependencies).execute;

  test('Should create good refresh token with public and private partner key and verify', async () => {
    const testPartner: CreateFrontPartnerQuery = {
      name: 'Company name11',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      phone: chance.phone(),
    };

    const response = await createPartner(testPartner);
    expect(response.status).toBe(200);
    expect(response.content.createdPartner.status).toBe('pending');

    response.content.createdPartner.status = "validated";

    const responseRefreshToken = await authenticatePartner(
      response.content.createdPartner.public_key,
      response.content.createdPartner._id,
      response.content.createdPartner.email,
    );

    expect(responseRefreshToken.status).toBe(200);
    expect(responseRefreshToken.content.refreshToken).toBeDefined();
    expect(responseRefreshToken.content.accessToken).toBeDefined();
  });

  test('Should not create refresh token with bad public and good private partner key', async () => {
    const testPartner: CreateFrontPartnerQuery = {
      name: 'Company name12',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      phone: chance.phone(),
    };

    const response = await createPartner(testPartner);
    expect(response.status).toBe(200);

    expect(response.content.createdPartner.status).toBe('pending');

    response.content.createdPartner.status = "validated";

    const responseRefreshToken = await authenticatePartner(
      'bad public key',
      response.content.createdPartner._id,
      response.content.createdPartner.email,
    );

    expect(responseRefreshToken.status).toBe(401);
  });


  test('Partner should be validated to have refresh and access token', async ()=>{
    const today = new Date();
    const testPartner: CreateFrontPartnerQuery = {
      name: 'Company name14',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      phone: chance.phone(),
    };

    const response = await createPartner(testPartner);
    expect(response.status).toBe(200);

    const responseRefreshToken = await authenticatePartner(
      response.content.createdPartner.public_key,
      response.content.createdPartner._id,
      response.content.createdPartner.email,
    );

    expect(responseRefreshToken.status).toBe(401);
  });
});
