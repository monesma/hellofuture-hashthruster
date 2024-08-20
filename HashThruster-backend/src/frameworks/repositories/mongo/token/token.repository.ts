import {
    CreateAndUpdateTokenQuery
  } from '../../../../domain/dto/token/token-dto';
  import TokenModel from '../../../database/mongo/schema/token.schema';
  import { TokenQuery } from '../../../../domain/types/token-types';
  import { adapterMongoDataToken } from '../../../adapter/mongo/token/token.adapter';
  
  export default {
    add: async (token: CreateAndUpdateTokenQuery): Promise<TokenQuery | null> => {
      try {
        const newToken = new TokenModel(token);
        const createdTokenMongo = await newToken.save();
  
        const createdNewToken = adapterMongoDataToken(createdTokenMongo);
        return createdNewToken;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    getAll: async () => {
      try {
        return await TokenModel.find({});
      } catch (err) {
        return err;
      }
    },
    getById: async (id: string): Promise<TokenQuery | null | unknown> => {
      try {
        const response = await TokenModel.findOne({ _id: id });
        if (response !== null) {
          return adapterMongoDataToken(response);
        } else {
          return response;
        }
      } catch (err) {
        return err;
      }
    },
    updateTokenQuery: async (
      tokenInfo: CreateAndUpdateTokenQuery,
      id: string,
    ): Promise<TokenQuery | null> => {
      try {
        const updatedToken = await TokenModel.findByIdAndUpdate(
          id,
          { $set: { ...tokenInfo } },
          { new: true },
        ).exec();
  
        if (updatedToken) {
          return adapterMongoDataToken(updatedToken);
        }
  
        return null;
      } catch (err) {
        console.error('Error updating token:', err);
        return null;
      }
    },
    delete: async (id: string) => {
      try {
        const response = await TokenModel.deleteOne({ _id: id });
  
        if (response.deletedCount === 1) {
          return id;
        } else {
          return null;
        }
      } catch (err) {
        return err;
      }
    },
    deleteWallet: async (id: string) => {
      try {
        const deleteWalletFromToken = await TokenModel.findByIdAndUpdate(
          id,
          { $set: { walletAccountId: "deleted" } },
          { new: true },
        ).exec();
  
        if (deleteWalletFromToken) {
          return adapterMongoDataToken(deleteWalletFromToken);
        }
  
        return null;
      } catch (err) {
        console.error('Error updating token:', err);
        return null;
      }
    }
  };
  