import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateFrontPartnerQuery } from '../../../domain/dto/partner/partner-dto';

const { createPartnerUseCase } = useCases;

describe('Create a new partner', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  const createPartner = createPartnerUseCase(dependencies).execute;

  test('Should return 200 if good informations', async () => {
    const today = new Date();
    const testPartner: CreateFrontPartnerQuery = {
      name: 'Company name11',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      phone: chance.phone(),
    };

    const response = await createPartner(testPartner);

    expect(response.status).toBe(200);
    expect(response.content.createdPartner.name).toBe('Company name11');
    expect(response.content.createdPartner.email).toBe(testPartner.email);
    expect(response.content.createdPartner.first_name).toBe(
      testPartner.first_name,
    );
    expect(response.content.createdPartner.last_name).toBe(
      testPartner.last_name,
    );
  });

  test('Should return 400 if email already exist', async () => {
    const today = new Date();
    const testPartner: CreateFrontPartnerQuery = {
      name: 'Company name 11',
      first_name: chance.name(),
      last_name: chance.last(),
      email: 'test@email.fr',
      phone: chance.phone(),
    };

    const response = await createPartner(testPartner);

    const testPartner2: CreateFrontPartnerQuery = {
      name: 'Company name 11',
      first_name: chance.name(),
      last_name: chance.last(),
      email: 'test@email.fr',
      phone: chance.phone(),
    };

    const response2 = await createPartner(testPartner2);
    expect(response2.status).toBe(400);

    const testPartner3: CreateFrontPartnerQuery = {
      name: 'Company name 11',
      first_name: chance.name(),
      last_name: chance.last(),
      email: 'test@email.fr',
      phone: chance.phone(),
    };

    const response3 = await createPartner(testPartner3);
    expect(response3.status).toBe(400);
  });
});
