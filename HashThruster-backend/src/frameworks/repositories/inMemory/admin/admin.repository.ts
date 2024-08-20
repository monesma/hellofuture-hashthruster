import database from '../../../database/inMemory';
import {
  CreateAdminQuery,
  UpdateAdminKeyQuery,
  UpdateAdminQuery,
  UpdateAdminStatusQuery
} from '../../../../domain/dto/admin/admin-dto';
import mongoose from 'mongoose';
import { AdminQuery } from '../../../../domain/types/admin-types';

export default {
  add: async (admin: CreateAdminQuery) => {
    const completeAdmin: AdminQuery = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...admin,
    };
    database.admin.push(completeAdmin);
    return database.admin[database.admin.length - 1];
  },
  getAll: async () => {
    return database.admin;
  },
  getById: async (id: string) => {
    return database.admin.find((p) => {
      return p._id === id;
    });
  },
  getByEmail: async (email: string) => {
    return database.admin.find((p) => {
      return p.email === email;
    });
  },
  updateAdminQuery: async (adminInfo: UpdateAdminQuery, id: string) => {
    const index = database.admin.findIndex((p) => {
      return p._id === id;
    });

    const updatedAdmin = {
      ...database.admin[index],
      ...adminInfo,
    };

    database.admin[index] = updatedAdmin;
    return database.admin[index];
  },
  updateAdminKeyQuery: async (
    adminKey: UpdateAdminKeyQuery,
    id: string,
  ) => {
    const index = database.admin.findIndex((p) => {
      return p._id === id;
    });

    const updatedAdmin = {
      ...database.admin[index],
      ...adminKey,
    };

    database.admin[index] = updatedAdmin;
    return database.admin[index];
  },
  updateAdminStatusQuery: async (
    adminStatus: UpdateAdminStatusQuery,
    id: string
  ) => {
    const index = database.admin.findIndex((p) => {
      return p._id === id;
    });

    const updatedAdmin = {
      ...database.admin[index],
      ...adminStatus,
    };

    database.admin[index] = updatedAdmin;
    return database.admin[index];
  },
  updateAdminPassword: async (adminPassowrd: string,
    id: string) => {
      const index = database.admin.findIndex((p) => {
        return p._id === id;
      });
      const updatedAdmin = {
        ...database.admin[index],
        password: adminPassowrd
      };
      database.admin[index] = updatedAdmin;
      return database.admin[index];
  },
  delete: async (id: string) => {
    const index = database.admin.findIndex((p) => {
      return p._id === id;
    });
    if (index !== -1) {
      database.admin.splice(index, 1);
      return id;
    }
    return null;
  },
};
