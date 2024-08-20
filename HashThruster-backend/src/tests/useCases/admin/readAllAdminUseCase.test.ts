import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontAdminQuery } from '../../../domain/dto/admin/admin-dto';

const { createAdminUseCase, readAllAdminUseCase } = useCases;

const generateTestTokenData = (): CreateFrontAdminQuery => ({
    first_name: chance.name(),
    last_name: chance.last(),
    sendEmail: chance.email(),
    role: 'admin',
    sendRole: 'admin'
});

describe('Read all admins', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  let addedAdmin: CreateFrontAdminQuery

  const createAdmin = createAdminUseCase(dependencies).execute;
  const readAllAdmins = readAllAdminUseCase(dependencies).execute;

  beforeEach(async () => {
    addedAdmin = generateTestTokenData();
  });

  test('Should return 200 if good informations', async () => {

    const response = await createAdmin(addedAdmin);

    expect(response.status).toBe(200);
    expect(response.content.createdAdmin.first_name).toBe(addedAdmin.first_name);
    expect(response.content.createdAdmin.last_name).toBe(
        addedAdmin.last_name,
    );
    expect(response.content.createdAdmin.email).toBe(
        addedAdmin.sendEmail,
    );

    const allAdmins = await readAllAdmins();
    expect(allAdmins.status).toBe(200);
    expect(allAdmins.content.admins).toBeDefined();
    expect(allAdmins.content.admins.length).toBeGreaterThan(0);
    expect(allAdmins.content.admins[0].first_name).toEqual(addedAdmin.first_name);
  });
});
