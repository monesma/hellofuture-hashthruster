import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontAdminQuery } from '../../../domain/dto/admin/admin-dto';

const {
  authenticateAdminUseCase,
  createAdminUseCase,
  newAccessTokenAdminUseCase,
} = useCases;

describe('Create a new partner', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createAdmin = createAdminUseCase(dependencies).execute;
  const authenticateAdmin = authenticateAdminUseCase(dependencies).execute;
  const newAccessTokenAdmin = newAccessTokenAdminUseCase(dependencies).execute;

  test('Should create good access token with good refresh token', async () => {
const testAdmin: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: chance.email(),
      role: 'admin'
    };

    const response = await createAdmin(testAdmin);
    expect(response.status).toBe(200);
    expect(response.content.createdAdmin.status).toBe('pending');

    response.content.createdAdmin.status = "validated";

    const responseRefreshToken = await authenticateAdmin(
      response.content.createdAdmin.public_key,
      response.content.createdAdmin._id,
      response.content.createdAdmin.email,
    );

    expect(responseRefreshToken.status).toBe(200);
    expect(responseRefreshToken.content.refreshToken).toBeDefined();
    expect(responseRefreshToken.content.accessToken).toBeDefined();

    const responseNewAccessToken = await newAccessTokenAdmin(
      responseRefreshToken.content.refreshToken,
      response.content.createdAdmin.public_key,
    );
    expect(responseNewAccessToken.status).toBe(200);
    expect(responseNewAccessToken.content.accessToken).toBeDefined();
  });

  test('Should not create refresh token with bad public and good private admin key', async () => {
    const testAdmin: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: chance.email(),
      role: 'admin'
    };

    const response = await createAdmin(testAdmin);
    expect(response.status).toBe(200);
    expect(response.content.createdAdmin.status).toBe('pending');

    response.content.createdAdmin.status = "validated";

    const responseRefreshToken = await authenticateAdmin(
      response.content.createdAdmin.public_key,
      response.content.createdAdmin._id,
      response.content.createdAdmin.email,
    );

    expect(responseRefreshToken.status).toBe(200);
    expect(responseRefreshToken.content.refreshToken).toBeDefined();
    expect(responseRefreshToken.content.accessToken).toBeDefined();

    const responseNewAccessToken = await newAccessTokenAdmin(
      'bad refresh token',
      response.content.createdAdmin.public_key,
    );
    expect(responseNewAccessToken.status).toBe(401);
  });
});
