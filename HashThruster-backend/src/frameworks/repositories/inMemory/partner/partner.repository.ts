import database from '../../../database/inMemory';
import {
  CreatePartnerQuery,
  UpdatePartnerKeyQuery,
  UpdatePartnerQuery,
  UpdatePartnerStatusQuery
} from '../../../../domain/dto/partner/partner-dto';
import mongoose from 'mongoose';
import { PartnerQuery } from '../../../../domain/types/partner-types';

export default {
  add: async (partner: CreatePartnerQuery) => {
    const completePartner: PartnerQuery = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...partner,
    };
    database.partner.push(completePartner);
    return database.partner[database.partner.length - 1];
  },
  getAll: async () => {
    return database.partner;
  },
  getById: async (id: string) => {
    return database.partner.find((p) => {
      return p._id === id;
    });
  },
  getByEmail: async (email: string) => {
    return database.partner.find((p) => {
      return p.email === email;
    });
  },
  getByCompanyName: async (name: string) => {
    return database.partner.find((p) => {
      return p.name === name;
    });
  },
  updatePartnerQuery: async (partnerInfo: UpdatePartnerQuery, id: string) => {
    const index = database.partner.findIndex((p) => {
      return p._id === id;
    });

    const updatedPartner = {
      ...database.partner[index],
      ...partnerInfo,
    };

    database.partner[index] = updatedPartner;
    return database.partner[index];
  },
  updatePartnerKeyQuery: async (
    partnerKey: UpdatePartnerKeyQuery,
    id: string,
  ) => {
    const index = database.partner.findIndex((p) => {
      return p._id === id;
    });

    const updatedPartner = {
      ...database.partner[index],
      ...partnerKey,
    };

    database.partner[index] = updatedPartner;
    return database.partner[index];
  },
  updatePartnerStatusQuery: async (
    partnerStatus: UpdatePartnerStatusQuery,
    id: string
  ) => {
    const index = database.partner.findIndex((p) => {
      return p._id === id;
    });

    const updatedPartner = {
      ...database.partner[index],
      ...partnerStatus,
    };

    database.partner[index] = updatedPartner;
    return database.partner[index];
  },
  updatePartnerPassword: async (partnerPassowrd: string,
    id: string) => {
      const index = database.partner.findIndex((p) => {
        return p._id === id;
      });
      const updatedPartner = {
        ...database.partner[index],
        password: partnerPassowrd
      };
      database.partner[index] = updatedPartner;
      return database.partner[index];
  },
  delete: async (id: string) => {
    const index = database.partner.findIndex((p) => {
      return p._id === id;
    });
    if (index !== -1) {
      database.partner.splice(index, 1);
      return id;
    }
    return null;
  },
};
