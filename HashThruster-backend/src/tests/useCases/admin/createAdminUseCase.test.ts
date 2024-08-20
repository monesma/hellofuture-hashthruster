import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontAdminQuery } from '../../../domain/dto/admin/admin-dto';

const { createAdminUseCase } = useCases;

describe('Create a new admin', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createAdmin = createAdminUseCase(dependencies).execute;

  test('Should return 200 if good informations', async () => {
    const today = new Date();
    const testAdmin: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: chance.email(),
      role: 'admin',
      sendRole: 'admin'
    };

    const response = await createAdmin(testAdmin);

    expect(response.status).toBe(200);
    expect(response.content.createdAdmin.email).toBe(testAdmin.sendEmail);
    expect(response.content.createdAdmin.first_name).toBe(
      testAdmin.first_name,
    );
    expect(response.content.createdAdmin.last_name).toBe(
        testAdmin.last_name,
    );
    expect(response.content.temporaryPassword).toBeDefined()
  });

  test('Should return 400 if email already exist', async () => {
    const today = new Date();
    const testAdmin: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: 'test@email.fr',
      role: 'admin',
      sendRole: 'admin'
    };

    const response = await createAdmin(testAdmin);

    const testAdmin2: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: 'test@email.fr',
      role: 'admin',
      sendRole: 'admin'
    };

    const response2 = await createAdmin(testAdmin2);
    expect(response2.status).toBe(400);

    const testAdmin3: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: 'test@email.fr',
      role: 'admin',
      sendRole: 'admin'
    };

    const response3 = await createAdmin(testAdmin3);
    expect(response3.status).toBe(400);
  });
});
