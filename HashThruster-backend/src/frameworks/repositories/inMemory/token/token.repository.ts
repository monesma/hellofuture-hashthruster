import database from '../../../database/inMemory';
import {
  CreateAndUpdateTokenQuery
} from '../../../../domain/dto/token/token-dto';
import mongoose from 'mongoose';
import { TokenQuery } from '../../../../domain/types/token-types';

export default {
  add: async (token: CreateAndUpdateTokenQuery) => {
    const completeToken: TokenQuery = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...token,
      creation_date: token.creation_date ?? new Date(),
    };
    database.token.push(completeToken);
    return database.token[database.token.length - 1];
  },
  getAll: async () => {
    return database.token;
  },
  getById: async (id: string) => {
    return database.token.find((p) => {
      return p._id === id;
    });
  },
  updateTokenQuery: async (tokenInfo: CreateAndUpdateTokenQuery, id: string) => {
    const index = database.token.findIndex((p) => {
      return p._id === id;
    });

    const updatedToken = {
      ...database.token[index],
      ...tokenInfo,
    };

    database.token[index] = updatedToken;
    return database.token[index];
  },
  delete: async (id: string) => {
    const index = database.token.findIndex((p) => {
      return p._id === id;
    });
    if (index !== -1) {
      database.token.splice(index, 1);
      return id;
    }
    return null;
  },
  deleteWallet: async (id: string) => {
    const index = database.token.findIndex((p) => {
      return p._id === id;
    });

    const updatedToken = {
      ...database.token[index],
      walletAccountId: "deleted"
    };
    database.token[index] = updatedToken;
    return database.token[index];
  }
};
