import repositories from '../../../../frameworks/repositories/inMemory';
import { AdminQuery } from '../../../../domain/types/admin-types';
import Chance from 'chance';
import mongoose from 'mongoose';
import {
  CreateAdminQuery,
  UpdateAdminKeyQuery,
  UpdateAdminQuery,
  UpdateAdminStatusQuery
} from '../../../../domain/dto/admin/admin-dto';

const chance = new Chance();
const { adminRepository } = repositories;

// Helper function to generate test admin data
const generateTestAdmin = (): CreateAdminQuery => ({
  creation_date: new Date(),
  public_key: 'azerty',
  private_key: 'aaazzzeeerrrtttyyy',
  first_name: chance.first(),
  last_name: chance.last(),
  email: chance.email(),
  password: null,
  role: 'admin',
  status: 'pending',
});

describe('Admin repository', () => {
  let testAdmin: CreateAdminQuery;
  let addedAdmin: AdminQuery;

  beforeEach(async () => {
    testAdmin = generateTestAdmin();
    addedAdmin = await adminRepository.add(testAdmin);
  });

  afterEach(async () => {
    if (addedAdmin && addedAdmin._id) {
      await adminRepository.delete(addedAdmin._id);
    }
  });

  test('New admin should be added and returned', async () => {
    expect(addedAdmin).toBeDefined();
    expect(addedAdmin._id).toBeDefined();

    const returnedAdmin = await adminRepository.getById(addedAdmin._id);
    expect(addedAdmin).toEqual(returnedAdmin);
  });

  test('Admin should be found by id and email', async () => {
    const returnedAdminById = await adminRepository.getById(addedAdmin._id);
    expect(addedAdmin).toEqual(returnedAdminById);

    const returnedAdminByEmail = await adminRepository.getByEmail(addedAdmin.email);
    expect(addedAdmin).toEqual(returnedAdminByEmail);
  });

  test('Admin selected by id should be deleted', async () => {
    expect(addedAdmin).toBeDefined();
    expect(addedAdmin._id).toBeDefined();

    const deletedAdminId = await adminRepository.delete(addedAdmin._id);
    expect(deletedAdminId).toBe(addedAdmin._id);

    const deletedUnknownAdminId = await adminRepository.delete(new mongoose.Types.ObjectId().toString());
    expect(deletedUnknownAdminId).toBe(null);
  });

  test('Admin infos should be updated', async () => {
    const updateAdminInfo: UpdateAdminQuery = {
      first_name: chance.first(),
      last_name: chance.last(),
      email: chance.email()
    };

    const updatedAdmin = await adminRepository.updateAdminQuery(updateAdminInfo, addedAdmin._id);
    expect(updatedAdmin.first_name).toBe(updateAdminInfo.first_name);
    expect(updatedAdmin.last_name).toBe(updateAdminInfo.last_name);
    expect(updatedAdmin.email).toBe(updateAdminInfo.email);
  });

  test('Admin keys should be updated', async () => {
    const updateAdminKeys: UpdateAdminKeyQuery = {
      public_key: 'zedvbn,kiuytfd',
      private_key: 'sdfghjgfgdsqdfgh',
    };

    const updatedAdmin = await adminRepository.updateAdminKeyQuery(updateAdminKeys, addedAdmin._id);
    expect(updatedAdmin.public_key).toBe(updateAdminKeys.public_key);
    expect(updatedAdmin.private_key).toBe(updateAdminKeys.private_key);
  });

  test('Admin status should be updated', async () => {
    const updateAdminStatus: UpdateAdminStatusQuery = {
      status: 'validated',
    };

    const updatedAdmin = await adminRepository.updateAdminStatusQuery(updateAdminStatus, addedAdmin._id);
    expect(updatedAdmin.status).toBe(updateAdminStatus.status);
  });

  test('Admin password should be updated', async () => {
    const updatedAdmin = await adminRepository.updateAdminPassword('Azerty1234!', addedAdmin._id);
    expect(updatedAdmin.password).not.toBe(null);
  });
});
