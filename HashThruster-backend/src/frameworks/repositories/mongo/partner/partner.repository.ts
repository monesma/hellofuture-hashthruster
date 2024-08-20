import {
  CreatePartnerQuery,
  UpdatePartnerKeyQuery,
  UpdatePartnerQuery,
  UpdatePartnerStatusQuery,
} from '../../../../domain/dto/partner/partner-dto';
import PartnerModel from '../../../database/mongo/schema/partner.schema';
import { PartnerQuery } from '../../../../domain/types/partner-types';
import { adapterMongoDataPartner } from '../../../adapter/mongo/partner/partner.adapter';

export default {
  add: async (partner: CreatePartnerQuery): Promise<PartnerQuery | null> => {
    try {
      const newPartner = new PartnerModel(partner);
      const createdPartnerMongo = await newPartner.save();

      const createdPartenaire = adapterMongoDataPartner(createdPartnerMongo);
      return createdPartenaire;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getAll: async () => {
    try {
      return await PartnerModel.find({});
    } catch (err) {
      return err;
    }
  },
  getById: async (id: string) => {
    try {
      const response = await PartnerModel.findOne({ _id: id });
      if (response !== null) {
        return adapterMongoDataPartner(response);
      } else {
        return response;
      }
    } catch (err) {
      return err;
    }
  },
  getByEmail: async (email: string) => {
    try {
      const response = await PartnerModel.findOne({ email: email });
      if (response !== null) {
        return adapterMongoDataPartner(response);
      } else {
        return response;
      }
    } catch (err) {
      return err;
    }
  },
  getByCompanyName: async (name: string) => {
    try {
      const response = await PartnerModel.findOne({ name: name });

      if (response !== null) {
        return adapterMongoDataPartner(response);
      } else {
        return response;
      }
    } catch (err) {
      return err;
    }
  },
  updatePartnerQuery: async (
    partnerInfo: UpdatePartnerQuery,
    id: string,
  ): Promise<PartnerQuery | null> => {
    try {
      const response = await PartnerModel.updateOne(
        { _id: id },
        {
          $set: {
            name: partnerInfo.name,
            first_name: partnerInfo.first_name,
            last_name: partnerInfo.last_name,
            email: partnerInfo.email,
            phone: partnerInfo.phone,
          },
        },
      ).exec();

      if (response.modifiedCount === 1) {
        const res = await PartnerModel.findOne({ _id: id });
        const partnerById = adapterMongoDataPartner(res);
        return partnerById;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  },
  updatePartnerKeyQuery: async (
    partnerKey: UpdatePartnerKeyQuery,
    id: string,
  ) => {
    try {
      const response = await PartnerModel.updateOne(
        { _id: id },
        {
          $set: {
            public_key: partnerKey.public_key,
            private_key: partnerKey.private_key,
          },
        },
      ).exec();

      if (response.modifiedCount === 1) {
        const res = await PartnerModel.findOne({ _id: id });
        const partnerById = adapterMongoDataPartner(res);
        return partnerById;
      } else {
        return null;
      }
    } catch (err) {
      return err;
    }
  },
  updatePartnerStatusQuery: async (
    partnerStatus: UpdatePartnerStatusQuery,
    id: string,
  ) => {
    try {
      const response = await PartnerModel.updateOne(
        { _id: id },
        {
          $set: {
            status: partnerStatus.status,
          },
        },
      ).exec();
      if (response.modifiedCount === 1) {
        const res = await PartnerModel.findOne({ _id: id });
        const partnerById = adapterMongoDataPartner(res);
        return partnerById;
      } else {
        return null;
      }
    } catch (err) {
      return err;
    }
  },
  updatePartnerPassword: async (partnerPassword: string, id: string) => {
    try {
      if (!partnerPassword || !id) {
        throw new Error('Invalid parameters');
      }
      
      const response = await PartnerModel.updateOne(
        { _id: id },
        {
          $set: {
            password: partnerPassword,
          },
        },
      ).exec();
  
      if (response.modifiedCount === 1) {
        const updatedPartner = await PartnerModel.findOne({ _id: id });
        if (updatedPartner) {
          return adapterMongoDataPartner(updatedPartner);
        } else {
          throw new Error('Partner not found');
        }
      } else {
        throw new Error('No modifications made');
      }
    } catch (err) {
      console.error("Error updating partner password:", err);
      throw err;  // Rejeter l'erreur pour la propager à l'appelant
    }
  },
  delete: async (id: string) => {
    try {
      const response = await PartnerModel.deleteOne({ _id: id });

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
