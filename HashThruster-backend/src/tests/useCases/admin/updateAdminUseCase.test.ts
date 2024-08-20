import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontAdminQuery } from '../../../domain/dto/admin/admin-dto';

const { createAdminUseCase, updateAdminUseCase } = useCases;

describe('Update an admin', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createAdmin = createAdminUseCase(dependencies).execute;
  const updateAdmin = updateAdminUseCase(dependencies).execute;

  test('Should return 200 if good informations', async () => {
    const testAdmin: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: 'coucou2@gmail.com',
      role: 'admin',
      sendRole: 'admin'
    };

    const response = await createAdmin(testAdmin);
    expect(response.status).toBe(200);

    const updatePsw = await updateAdmin("Azerty1234!",response.content.createdAdmin._id)
    expect(updatePsw.status).toBe(200);
  });

  test('Should return 404 if user not found', async () => {
    const response2 = await updateAdmin("Azerty1234!", "");
    expect(response2.status).toBe(404);
  });

  test('Should return 400 if invalid password format', async () => {
    const testAdmin: CreateFrontAdminQuery = {
        first_name: chance.name(),
        last_name: chance.last(),
        sendEmail: 'blabla@gmail.com',
        role: 'admin',
        sendRole: 'admin'
      };
      
    const response = await createAdmin(testAdmin);
    expect(response.status).toBe(200);
      
    const updatePsw = await updateAdmin("azerty1234",response.content.createdAdmin._id)
    expect(updatePsw.status).toBe(400);
  });
});
