import repositories from '../../../../frameworks/repositories/mongo';
import { AdminQuery } from '../../../../domain/types/admin-types';
import Admin from '../../../../entities/admin/Admin';
import Chance from 'chance';
import {
  CreateAdminQuery,
  UpdateAdminKeyQuery,
  UpdateAdminQuery,
  UpdateAdminStatusQuery,
} from '../../../../domain/dto/admin/admin-dto';
const chance = new Chance();
import mongoose from 'mongoose';
import MongoConnect from '../../../../frameworks/database/mongo';

const { adminRepository } = repositories;

describe('Partner repository', () => {
  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });

  test('New admin should be added and returned', async () => {
    const today = new Date();
    const testAdmin = new Admin({
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      role: 'admin',
      status: 'pending',
    }) as CreateAdminQuery;

    const addedAdmin = await adminRepository.add(testAdmin);
    expect(addedAdmin).toBeDefined();

    if (addedAdmin) {
      expect(addedAdmin._id).toBeDefined();

      const returnedAdmin = await adminRepository.getById(
        addedAdmin._id.toString(),
      );
      expect(addedAdmin).toEqual(returnedAdmin);

      await adminRepository.delete(addedAdmin._id);
    }
  });

  test('Admin should be find by id or email', async () => {
    const today = new Date();
    const testAdmin = new Admin({
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      role: 'admin',
      status: 'pending',
    }) as CreateAdminQuery;

    const addedAdmin = await adminRepository.add(testAdmin);

    if (addedAdmin) {
      const returnedAdminById = await adminRepository.getById(addedAdmin._id);
      expect(addedAdmin).toEqual(returnedAdminById);
      const returnedAdminByEmail = await adminRepository.getByEmail(
        addedAdmin.email,
      );
      expect(addedAdmin).toEqual(returnedAdminByEmail);

      await adminRepository.delete(addedAdmin._id);
    }
  });

  test('Admin selected by id sould be deleted', async () => {
    const today = new Date();
    const testAdmin = new Admin({
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      role: 'admin',
      status: 'pending',
    }) as CreateAdminQuery;

    const addedAdmin = await adminRepository.add(testAdmin);
    if (addedAdmin) {
      expect(addedAdmin).toBeDefined();
      expect(addedAdmin._id).toBeDefined();

      const deletedAdmin = await adminRepository.delete(
        addedAdmin._id.toString(),
      );
      expect(deletedAdmin).toBe(addedAdmin._id);

      const deletedUnknowAdmin = await adminRepository.delete(
        new mongoose.Types.ObjectId().toString(),
      );
      expect(deletedUnknowAdmin).toBe(null);
      await adminRepository.delete(addedAdmin._id);
    }
  });

  test('Admin infos should be updated', async () => {
    const today = new Date();
    const testAdmin = new Admin({
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      role: 'admin',
      status: 'pending',
    }) as CreateAdminQuery;

    const addedAdmin = await adminRepository.add(testAdmin);

    if (addedAdmin) {
      expect(addedAdmin).toBeDefined();
      expect(addedAdmin._id).toBeDefined();

      const updateAdminInfo: UpdateAdminQuery = {
        first_name: chance.name(),
        last_name: chance.last(),
        email: chance.email(),
      };

      const updatedAdmin = await adminRepository.updateAdminQuery(
        updateAdminInfo,
        addedAdmin._id,
      );

      if (updatedAdmin !== null) {
        expect(updatedAdmin.first_name).toBe(updateAdminInfo.first_name);
        expect(updatedAdmin.last_name).toBe(updateAdminInfo.last_name);
        expect(updatedAdmin.email).toBe(updateAdminInfo.email);
      } else {
        expect(updatedAdmin).toBe(null);
      }

      await adminRepository.delete(addedAdmin._id);
    }
  });

  test('Admin keys should be updated', async () => {
    const today = new Date();
    const testAdmin = new Admin({
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      role: 'admin',
      status: 'pending',
    }) as CreateAdminQuery;

    const addedAdmin = await adminRepository.add(testAdmin);

    if (addedAdmin) {
      expect(addedAdmin).toBeDefined();
      expect(addedAdmin._id).toBeDefined();

      const updateAdminKeys: UpdateAdminKeyQuery = {
        public_key: 'zedvbn,kiuytfd',
        private_key: 'sdfghjgfgdsqdfgh',
      };

      const updatedAdmin = (await adminRepository.updateAdminKeyQuery(
        updateAdminKeys,
        addedAdmin._id,
      )) as AdminQuery;
      if (updatedAdmin) {
        expect(updatedAdmin.public_key).toBe('zedvbn,kiuytfd');
        expect(updatedAdmin.private_key).toBe('sdfghjgfgdsqdfgh');
      }
      await adminRepository.delete(addedAdmin._id);
    }
  });

  test('Admin status should be updated', async () => {
    const today = new Date();
    const testAdmin = new Admin({
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      role: 'admin',
      status: 'pending',
    }) as CreateAdminQuery;

    const addedAdmin = await adminRepository.add(testAdmin);
    if (addedAdmin) {
      expect(addedAdmin).toBeDefined();
      expect(addedAdmin._id).toBeDefined();

      const updatedAdmin = (await adminRepository.updateAdminStatusQuery(
        'validated',
        addedAdmin._id,
      )) as AdminQuery;
      if (updatedAdmin !== null) {
        expect(updatedAdmin.status).toBe('validated');
      }
      await adminRepository.delete(addedAdmin._id);
    }
  });

  test('Admin password should be updated', async () => {
    const today = new Date();
    const testAdmin = new Admin({
      creation_date: today,
      public_key: 'azerty',
      private_key: 'aaazzzeeerrrtttyyy',
      first_name: chance.name(),
      last_name: chance.last(),
      email: chance.email(),
      password: null,
      role: 'admin',
      status: 'pending',
    }) as CreateAdminQuery;

    const addedAdmin = await adminRepository.add(testAdmin);
    if (addedAdmin) {
      expect(addedAdmin).toBeDefined();
      expect(addedAdmin._id).toBeDefined();

      const updatedAdmin = (await adminRepository.updateAdminPassword(
        'Azerty1234!',
        addedAdmin._id,
      )) as AdminQuery;
      if (updatedAdmin !== null) {
        expect(updatedAdmin.status).not.toBe('null');
      }
      await adminRepository.delete(addedAdmin._id);
    }
  });
});
