import repositories from '../../../../frameworks/repositories/mongo';
import { PartnerQuery } from '../../../../domain/types/partner-types';
import Partner from '../../../../entities/partner/Partner';
import Chance from 'chance';
import {
  CreatePartnerQuery,
  UpdatePartnerKeyQuery,
  UpdatePartnerQuery,
  UpdatePartnerStatusQuery
} from '../../../../domain/dto/partner/partner-dto';
const chance = new Chance();
import mongoose from 'mongoose';
import MongoConnect from '../../../../frameworks/database/mongo';

const { partnerRepository } = repositories;

describe('Partner repository', () => {
  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });

  test('New partner should be added and returned', async () => {
    const today = new Date();
    const testPartner = new Partner({
      name: 'Company name',
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      phone: chance.phone(),
      status: 'pending',
    }) as CreatePartnerQuery;

    const addedPartner = await partnerRepository.add(testPartner);
    expect(addedPartner).toBeDefined();

    if (addedPartner) {
      expect(addedPartner._id).toBeDefined();
      expect(addedPartner.name).toBe('Company name');

      const returnedPartner = await partnerRepository.getById(
        addedPartner._id.toString(),
      );
      expect(addedPartner).toEqual(returnedPartner);

      await partnerRepository.delete(addedPartner._id);
    }
  });

  test('Partner should be find by id, email, comapny name', async () => {
    const today = new Date();
    const testPartner = new Partner({
      name: 'Company haha',
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      phone: chance.phone(),
      status: 'pending',
    }) as CreatePartnerQuery;

    const addedPartner = await partnerRepository.add(testPartner);
    if (addedPartner) {
      const returnedPartnerById = await partnerRepository.getById(
        addedPartner._id,
      );
      expect(addedPartner).toEqual(returnedPartnerById);
      const returnedPartnerByEmail = await partnerRepository.getByEmail(
        addedPartner.email,
      );
      expect(addedPartner).toEqual(returnedPartnerByEmail);

      const returnedPartnerByCompany = await partnerRepository.getByCompanyName(
        addedPartner.name,
      );
      expect(addedPartner).toEqual(returnedPartnerByCompany);

      await partnerRepository.delete(addedPartner._id);
    }
  });

  test('Partner selected by id sould be deleted', async () => {
    const today = new Date();
    const testPartner = new Partner({
      name: 'Company kiki',
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      phone: chance.phone(),
      status: 'pending',
    }) as CreatePartnerQuery;

    const addedPartner = await partnerRepository.add(testPartner);
    if (addedPartner) {
      expect(addedPartner).toBeDefined();
      expect(addedPartner._id).toBeDefined();

      const deletedPartner = await partnerRepository.delete(
        addedPartner._id.toString(),
      );
      expect(deletedPartner).toBe(addedPartner._id);

      const deletedUnknowPartner = await partnerRepository.delete(
        new mongoose.Types.ObjectId().toString(),
      );
      expect(deletedUnknowPartner).toBe(null);
      await partnerRepository.delete(addedPartner._id);
    }
  });

  test('Partner infos should be updated', async () => {
    const today = new Date();
    const testPartner = new Partner({
      name: 'Company coco',
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      phone: chance.phone(),
      status: 'pending',
    }) as CreatePartnerQuery;

    const addedPartner = await partnerRepository.add(testPartner);

    if (addedPartner) {
      expect(addedPartner).toBeDefined();
      expect(addedPartner._id).toBeDefined();

      const updatePartnerInfo: UpdatePartnerQuery = {
        name: 'Company name 2',
        first_name: chance.name(),
        last_name: chance.last(),
        email: chance.email(),
        phone: chance.phone(),
      };

      const updatedPartner = await partnerRepository.updatePartnerQuery(
        updatePartnerInfo,
        addedPartner._id,
      );

      if (updatedPartner !== null) {
        expect(updatedPartner.name).toBe('Company name 2');
        expect(updatedPartner.first_name).toBe(updatePartnerInfo.first_name);
        expect(updatedPartner.last_name).toBe(updatePartnerInfo.last_name);
        expect(updatedPartner.email).toBe(updatePartnerInfo.email);
        expect(updatedPartner.phone).toBe(updatePartnerInfo.phone);
      } else {
        expect(updatedPartner).toBe(null);
      }

      await partnerRepository.delete(addedPartner._id);
    }
  });

  test('Partner keys should be updated', async () => {
    const today = new Date();
    const testPartner = new Partner({
      name: 'Company cucu',
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      phone: chance.phone(),
      status: 'pending',
    }) as CreatePartnerQuery;

    const addedPartner = await partnerRepository.add(testPartner);

    if (addedPartner) {
      expect(addedPartner).toBeDefined();
      expect(addedPartner._id).toBeDefined();

      const updatePartnerKeys: UpdatePartnerKeyQuery = {
        public_key: 'zedvbn,kiuytfd',
        private_key: 'sdfghjgfgdsqdfgh',
      };

      const updatedPartner = (await partnerRepository.updatePartnerKeyQuery(
        updatePartnerKeys,
        addedPartner._id,
      )) as PartnerQuery;
      if (updatedPartner) {
        expect(updatedPartner.public_key).toBe('zedvbn,kiuytfd');
        expect(updatedPartner.private_key).toBe('sdfghjgfgdsqdfgh');
      }
      await partnerRepository.delete(addedPartner._id);
    }
  });

  test('Partner status should be updated', async () => {
    const today = new Date();
    const testPartner = new Partner({
      name: 'Company caca',
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      phone: chance.phone(),
      status: 'pending',
    }) as CreatePartnerQuery;

    const addedPartner = await partnerRepository.add(testPartner);
    if (addedPartner) {
      expect(addedPartner).toBeDefined();
      expect(addedPartner._id).toBeDefined();

      const updatePartnerStatus: UpdatePartnerStatusQuery = {
        status: 'validated',
      };

      const updatedPartner = (await partnerRepository.updatePartnerStatusQuery(
        updatePartnerStatus,
        addedPartner._id,
      )) as PartnerQuery;
      if (updatedPartner !== null) {
        expect(updatedPartner.status).toBe('validated');
      }
      await partnerRepository.delete(addedPartner._id);
    }
  });

  test('Partner password should be updated', async () => {
    const today = new Date();
    const testPartner = new Partner({
      name: 'Company caca',
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      phone: chance.phone(),
      status: 'pending',
    }) as CreatePartnerQuery;

    const addedPartner = await partnerRepository.add(testPartner);
    if (addedPartner) {
      expect(addedPartner).toBeDefined();
      expect(addedPartner._id).toBeDefined();

      const updatedPartner = (await partnerRepository.updatePartnerPassword(
        'Azerty1234!',
        addedPartner._id,
      )) as PartnerQuery;
      if (updatedPartner !== null) {
        expect(updatedPartner.status).not.toBe('null');
      }
      await partnerRepository.delete(addedPartner._id);
    }
  });
});
