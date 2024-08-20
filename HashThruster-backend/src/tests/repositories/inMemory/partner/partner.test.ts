import repositories from '../../../../frameworks/repositories/inMemory';
import { PartnerQuery } from '../../../../domain/types/partner-types';
import Chance from 'chance';
import mongoose from 'mongoose';
import {
  CreatePartnerQuery,
  UpdatePartnerKeyQuery,
  UpdatePartnerQuery,
  UpdatePartnerStatusQuery
} from '../../../../domain/dto/partner/partner-dto';

const chance = new Chance();
const { partnerRepository } = repositories;

// Helper function to generate test partner data
const generateTestPartner = (): CreatePartnerQuery => ({
  name: 'Company name',
  creation_date: new Date(),
  public_key: 'azerty',
  private_key: 'aaazzzeeerrrtttyyy',
  first_name: chance.first(),
  last_name: chance.last(),
  email: chance.email(),
  password: null,
  phone: chance.phone(),
  status: 'pending',
});

describe('Partner repository', () => {
  let testPartner: CreatePartnerQuery;
  let addedPartner: PartnerQuery;

  beforeEach(async () => {
    testPartner = generateTestPartner();
    addedPartner = await partnerRepository.add(testPartner);
  });

  afterEach(async () => {
    if (addedPartner && addedPartner._id) {
      await partnerRepository.delete(addedPartner._id);
    }
  });

  test('New partner should be added and returned', async () => {
    expect(addedPartner).toBeDefined();
    expect(addedPartner._id).toBeDefined();
    expect(addedPartner.name).toBe(testPartner.name);

    const returnedPartner = await partnerRepository.getById(addedPartner._id);
    expect(addedPartner).toEqual(returnedPartner);
  });

  test('Partner should be found by id, email, and company name', async () => {
    const returnedPartnerById = await partnerRepository.getById(addedPartner._id);
    expect(addedPartner).toEqual(returnedPartnerById);

    const returnedPartnerByEmail = await partnerRepository.getByEmail(addedPartner.email);
    expect(addedPartner).toEqual(returnedPartnerByEmail);

    const returnedPartnerByCompany = await partnerRepository.getByCompanyName(addedPartner.name);
    expect(addedPartner).toEqual(returnedPartnerByCompany);
  });

  test('Partner selected by id should be deleted', async () => {
    const deletedPartnerId = await partnerRepository.delete(addedPartner._id);
    expect(deletedPartnerId).toBe(addedPartner._id);

    const deletedUnknownPartnerId = await partnerRepository.delete(new mongoose.Types.ObjectId().toString());
    expect(deletedUnknownPartnerId).toBe(null);
  });

  test('Partner infos should be updated', async () => {
    const updatePartnerInfo: UpdatePartnerQuery = {
      name: 'Company name 2',
      first_name: chance.first(),
      last_name: chance.last(),
      email: chance.email(),
      phone: chance.phone(),
    };

    const updatedPartner = await partnerRepository.updatePartnerQuery(updatePartnerInfo, addedPartner._id);
    expect(updatedPartner.name).toBe(updatePartnerInfo.name);
    expect(updatedPartner.first_name).toBe(updatePartnerInfo.first_name);
    expect(updatedPartner.last_name).toBe(updatePartnerInfo.last_name);
    expect(updatedPartner.email).toBe(updatePartnerInfo.email);
    expect(updatedPartner.phone).toBe(updatePartnerInfo.phone);
  });

  test('Partner keys should be updated', async () => {
    const updatePartnerKeys: UpdatePartnerKeyQuery = {
      public_key: 'zedvbn,kiuytfd',
      private_key: 'sdfghjgfgdsqdfgh',
    };

    const updatedPartner = await partnerRepository.updatePartnerKeyQuery(updatePartnerKeys, addedPartner._id);
    expect(updatedPartner.public_key).toBe(updatePartnerKeys.public_key);
    expect(updatedPartner.private_key).toBe(updatePartnerKeys.private_key);
  });

  test('Partner status should be updated', async () => {
    const updatePartnerStatus: UpdatePartnerStatusQuery = {
      status: 'validated',
    };

    const updatedPartner = await partnerRepository.updatePartnerStatusQuery(updatePartnerStatus, addedPartner._id);
    expect(updatedPartner.status).toBe(updatePartnerStatus.status);
  });

  test('Partner password should be updated', async () => {
    const updatedPartner = await partnerRepository.updatePartnerPassword('Azerty1234!', addedPartner._id);
    expect(updatedPartner.password).not.toBe(null);
  });
});
