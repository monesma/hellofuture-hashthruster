import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontPartnerQuery } from '../../../domain/dto/partner/partner-dto';

const { createPartnerUseCase, updatePartnerUseCase } = useCases;

describe('Update a partner', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createPartner = createPartnerUseCase(dependencies).execute;
  const updatePartner = updatePartnerUseCase(dependencies).execute;

  test('Should return 200 if good informations', async () => {
    const today = new Date();
    const testPartner: CreateFrontPartnerQuery = {
      name: 'Company name12',
      first_name: chance.name(),
      last_name: chance.last(),
      email: 'coucou@gmail.com',
      phone: chance.phone(),
    };

    const response = await createPartner(testPartner);
    expect(response.status).toBe(200);

    const updatePsw = await updatePartner("Azerty1234!",response.content.createdPartner._id)
    expect(updatePsw.status).toBe(200);
  });

  test('Should return 404 if user not found', async () => {
    const response2 = await updatePartner("Azerty1234!", "");
    expect(response2.status).toBe(404);
  });

  test('Should return 400 if invalid password format', async () => {
    const today = new Date();
    const testPartner: CreateFrontPartnerQuery = {
      name: 'Company name13',
      first_name: chance.name(),
      last_name: chance.last(),
      email: 'coucou2@gmail.com',
      phone: chance.phone(),
    };

    const response = await createPartner(testPartner);
    expect(response.status).toBe(200);

    const updatePsw = await updatePartner("zerty1234",response.content.createdPartner._id)
    expect(updatePsw.status).toBe(400);
  });
});
