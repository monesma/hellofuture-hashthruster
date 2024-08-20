import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontAdminQuery, LoginAdminQuery } from '../../../domain/dto/admin/admin-dto';

const { createAdminUseCase, loginAdminUseCase, updateAdminUseCase } = useCases;

describe('Login an admin', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createAdmin = createAdminUseCase(dependencies).execute;
  const loginAdmin = loginAdminUseCase(dependencies).execute;
  const updateAdmin = updateAdminUseCase(dependencies).execute;

  test('Should return 200 if good informations', async () => {
    const testAdmin: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: 'coucou@gmail.com',
      role: 'admin',
      sendRole: 'admin'
    };

    const response = await createAdmin(testAdmin);
    expect(response.status).toBe(200);
    const updatePsw = await updateAdmin("Azerty1234!",response.content.createdAdmin._id)
    expect(updatePsw.status).toBe(200);

    const testLoginAdmin: LoginAdminQuery = {
      email: 'coucou@gmail.com',
      password: "Azerty1234!"
    };

    const response2 = await loginAdmin(testLoginAdmin);
    expect(response2.status).toBe(200);
    expect(response2.content.user.email).toBe(testAdmin.sendEmail);
    expect(response2.content.user.first_name).toBe(
        testAdmin.first_name,
    );
    expect(response2.content.user.last_name).toBe(
        testAdmin.last_name,
    );
    expect(response2.content.token).not.toBe(undefined)
  });

  test('Should return 404 if user not found', async () => {
    const testLoginAdmin: LoginAdminQuery = {
        email: chance.email(),
        password: "Azerty1234!"
    };
    const response2 = await loginAdmin(testLoginAdmin);
    expect(response2.status).toBe(404);
  });
});
