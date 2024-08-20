import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontPartnerQuery, LoginPartnerQuery } from '../../../domain/dto/partner/partner-dto';

const { createPartnerUseCase, loginPartnerUseCase, updatePartnerUseCase } = useCases;

describe('Login a partner', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createPartner = createPartnerUseCase(dependencies).execute;
  const loginPartner = loginPartnerUseCase(dependencies).execute;
  const updatePartner = updatePartnerUseCase(dependencies).execute;

  test('Should return 200 if good informations', async () => {
    const today = new Date();
    const testPartner: CreateFrontPartnerQuery = {
      name: 'Company name11',
      first_name: chance.name(),
      last_name: chance.last(),
      email: 'coucou@gmail.com',
      phone: chance.phone(),
    };

    const response = await createPartner(testPartner);
    expect(response.status).toBe(200);
    const updatePsw = await updatePartner("Azerty1234!",response.content.createdPartner._id)
    expect(updatePsw.status).toBe(200);

    const testLoginPartner: LoginPartnerQuery = {
      email: 'coucou@gmail.com',
      password: "Azerty1234!"
    };

    const response2 = await loginPartner(testLoginPartner);
    expect(response2.status).toBe(200);
    expect(response2.content.user.name).toBe('Company name11');
    expect(response2.content.user.email).toBe(testPartner.email);
    expect(response2.content.user.first_name).toBe(
      testPartner.first_name,
    );
    expect(response2.content.user.last_name).toBe(
      testPartner.last_name,
    );
    expect(response2.content.token).not.toBe(undefined)
  });

  test('Should return 404 if user not found', async () => {
    const testLoginPartner: LoginPartnerQuery = {
        email: chance.email(),
        password: "Azerty1234!"
    };
    const response2 = await loginPartner(testLoginPartner);
    expect(response2.status).toBe(404);
  });
});
