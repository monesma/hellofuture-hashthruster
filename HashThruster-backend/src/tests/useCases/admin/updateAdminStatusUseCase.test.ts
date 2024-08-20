import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontAdminQuery } from '../../../domain/dto/admin/admin-dto';

const { createAdminUseCase, updateAdminStatusUseCase } = useCases;

describe('Update an admin', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createAdmin = createAdminUseCase(dependencies).execute;
  const updateAdmin = updateAdminStatusUseCase(dependencies).execute;

  test('Should return 200 if good informations', async () => {
    const testAdmin: CreateFrontAdminQuery = {
      first_name: chance.name(),
      last_name: chance.last(),
      sendEmail: 'coucou2@gmail.com',
      role: 'admin',
      sendRole: 'admin',
    };
  
    const response = await createAdmin(testAdmin);
    expect(response.status).toBe(200);
    expect(response.content).toBeDefined();
    expect(response.content.createdAdmin).toBeDefined();
  
    const updateStatus = await updateAdmin("Validated", response.content.createdAdmin._id);
    expect(updateStatus.status).toBe(200);
  })
  test('Should return 404 if user not found', async () => {
    const response2 = await updateAdmin("Validated", "nonexistent-id");
    expect(response2.status).toBe(404);
  });
});
