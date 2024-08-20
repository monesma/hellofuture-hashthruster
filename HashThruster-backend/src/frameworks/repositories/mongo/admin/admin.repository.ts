import {
    CreateAdminQuery,
    UpdateAdminKeyQuery,
    UpdateAdminQuery,
    UpdateAdminStatusQuery
  } from '../../../../domain/dto/admin/admin-dto';
  import AdminModel from '../../../database/mongo/schema/admin.schema';
  import { AdminQuery } from '../../../../domain/types/admin-types';
  import { adapterMongoDataAdmin } from '../../../adapter/mongo/admin/admin.adapter';
  
  export default {
    add: async (admin: CreateAdminQuery): Promise<AdminQuery | null> => {
      try {
        const newAdmin = new AdminModel(admin);
        const createdAdminMongo = await newAdmin.save();
  
        const createdNewAdmin = adapterMongoDataAdmin(createdAdminMongo);
        return createdNewAdmin;
      } catch (err) {
        return null;
      }
    },
    getAll: async () => {
      try {
        return await AdminModel.find({});
      } catch (err) {
        return err;
      }
    },
    getById: async (id: string) => {
      try {
        const response = await AdminModel.findOne({ _id: id });
        if (response !== null) {
          return adapterMongoDataAdmin(response);
        } else {
          return response;
        }
      } catch (err) {
        return err;
      }
    },
    getByEmail: async (email: string) => {
      try {
        const response = await AdminModel.findOne({ email: email });
        if (response !== null) {
          return adapterMongoDataAdmin(response);
        } else {
          return response;
        }
      } catch (err) {
        return err;
      }
    },
    updateAdminQuery: async (
      adminInfo: UpdateAdminQuery,
      id: string,
    ): Promise<AdminQuery | null> => {
      try {
        const response = await AdminModel.updateOne(
          { _id: id },
          {
            $set: {
              first_name: adminInfo.first_name,
              last_name: adminInfo.last_name,
              email: adminInfo.email
            },
          },
        ).exec();
  
        if (response.modifiedCount === 1) {
          const res = await AdminModel.findOne({ _id: id });
          const adminById = adapterMongoDataAdmin(res);
          return adminById;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    updateAdminKeyQuery: async (
      adminKey: UpdateAdminKeyQuery,
      id: string,
    ) => {
      try {
        const response = await AdminModel.updateOne(
          { _id: id },
          {
            $set: {
              public_key: adminKey.public_key,
              private_key: adminKey.private_key,
            },
          },
        ).exec();
  
        if (response.modifiedCount === 1) {
          const res = await AdminModel.findOne({ _id: id });
          const adminById = adapterMongoDataAdmin(res);
          return adminById;
        } else {
          return null;
        }
      } catch (err) {
        return err;
      }
    },
    updateAdminStatusQuery: async (
      adminStatus: string,
      id: string,
    ) => {
      try {
        const response = await AdminModel.updateOne(
          { _id: id },
          {
            $set: {
              status: adminStatus,
            },
          },
        ).exec();
        if (response.modifiedCount === 1) {
          const res = await AdminModel.findOne({ _id: id });
          const adminById = adapterMongoDataAdmin(res);
          return adminById;
        } else {
          return null;
        }
      } catch (err) {
        return err;
      }
    },
    updateAdminPassword: async (adminPassword: string, id: string) => {
      try {
        if (!adminPassword || !id) {
          throw new Error('Invalid parameters');
        }
        
        const response = await AdminModel.updateOne(
          { _id: id },
          {
            $set: {
              password: adminPassword,
            },
          },
        ).exec();
    
        if (response.modifiedCount === 1) {
          const updatedAdmin = await AdminModel.findOne({ _id: id });
          if (updatedAdmin) {
            return adapterMongoDataAdmin(updatedAdmin);
          } else {
            throw new Error('Admin not found');
          }
        } else {
          throw new Error('No modifications made');
        }
      } catch (err) {
        console.error("Error updating admin password:", err);
        throw err;
      }
    },
    delete: async (id: string) => {
      try {
        const response = await AdminModel.deleteOne({ _id: id });
  
        if (response.deletedCount === 1) {
          return id;
        } else {
          return null;
        }
      } catch (err) {
        return err;
      }
    },
  };
  