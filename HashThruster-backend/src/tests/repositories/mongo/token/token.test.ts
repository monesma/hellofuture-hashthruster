import repositories from '../../../../frameworks/repositories/mongo';
import { TokenQuery } from '../../../../domain/types/token-types';
import Chance from 'chance';
import {
  CreateAndUpdateTokenQuery
} from '../../../../domain/dto/token/token-dto';
import mongoose from 'mongoose';
import MongoConnect from '../../../../frameworks/database/mongo';

const chance = new Chance();
const { tokenRepository } = repositories;

const generateTestProjectData = (): CreateAndUpdateTokenQuery => ({
  creation_date: new Date(),
  projectName: chance.company(),
  tokenName: 'Alpha token',
  tokenSymbol: 'ALFA',
  projectWebsite: 'https://alphatoken.com',
  projectDescription: chance.paragraph({ sentences: 200 }),
  technologies: ['Hedera Token Service'],
  isOpenSource: true,
  repositoryLink: '',
  isAudited: true,
  tokenPurpose: chance.paragraph({ sentences: 200 }),
  tokenSupply: 75000000,
  tokenDistribution: chance.paragraph({ sentences: 200 }),
  tokenStandard: 'Hedera Token Service',
  hashscanLink: 'https://hashcan.io/vdkvjdsb',
  revenueGeneration: chance.paragraph({ sentences: 200 }),
  tokenUseCases: chance.paragraph({ sentences: 200 }),
  registeredCountry: 'Poland',
  compliesWithRegulations: true,
  obtainedLegalAdvice: true,
  fundraisingTarget: 150000,
  minInvestment: '',
  maxInvestment: '30',
  tokenValue: 5,
  successReason: chance.paragraph({ sentences: 200 }),
  differentiation: chance.paragraph({ sentences: 200 }),
  launchDate: '25/02/2025',
  linkedin: "https://fake.com",
  discord: "https://fake.com",
  telegram: "https://fake.com",
  twitter: "https://fake.com",
  instagram: "https://fake.com",
  pdfFileName: 'pitchBlabla.pdf',
  imageFileName: 'img.png',
  walletAccountId: {
    accountId: "0.0.4680083",
    private_key: "302e020100300506032b65700422042030624100969208c0155f1e57b6cf07782bb75a",
    public_key: "302a300506032b657003210012cbda27feef43c10d8dcb6acd6f028321678c259f4465"
  }
});

describe('Token repository', () => {
  let addedToken: TokenQuery | null = null

  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });

  beforeEach(async () => {
    const testTokenData = generateTestProjectData();
    addedToken = await tokenRepository.add(testTokenData);
  });

  afterEach(async () => {
    if (addedToken && addedToken._id) {
      await tokenRepository.delete(addedToken._id);
    }
  });

  test('New token should be added and returned', async () => {
    expect(addedToken).toBeDefined();
    if (addedToken) {
      expect(addedToken._id).toBeDefined();
  
      const returnedToken = await tokenRepository.getById(addedToken._id.toString());

      expect(returnedToken).toBeDefined();
      const token = returnedToken as TokenQuery;

      expect(token.projectName).toBe(addedToken.projectName);
      expect(token.tokenName).toBe(addedToken.tokenName);
    }
  });
  
  test('Token should be found by id', async () => {
    if (addedToken) {
      const returnedTokenById = await tokenRepository.getById(addedToken._id.toString());
  
      expect(returnedTokenById).toBeDefined();
      const tokenById = returnedTokenById as TokenQuery;
  
      expect(tokenById.projectName).toBe(addedToken.projectName);
      expect(tokenById.tokenName).toBe(addedToken.tokenName);
    }
  });

  test('Token selected by id should be deleted', async () => {
    if (addedToken) {
      const deletedToken = await tokenRepository.delete(addedToken._id.toString());
      expect(deletedToken).toBe(addedToken._id);

      const deletedUnknownToken = await tokenRepository.delete(
        new mongoose.Types.ObjectId().toString(),
      );
      expect(deletedUnknownToken).toBe(null);
    }
  });

  test('Wallet from token selected by id should be deleted', async () => {
    if (addedToken) {
      const deletedWalletFromToken = await tokenRepository.deleteWallet(addedToken._id.toString());
      expect(deletedWalletFromToken?.walletAccountId).toBe("deleted");
    }
  });

  test('Token infos should be updated', async () => {
    if (addedToken) {
      const updateTokentInfo: CreateAndUpdateTokenQuery = {
        projectName: chance.company(),
        tokenName: 'Bravo token',
        tokenSymbol: 'BRAV',
        projectWebsite: 'https://bravotoken.com',
        projectDescription: chance.paragraph({ sentences: 200 }),
        technologies: ['Hedera Token Service'],
        isOpenSource: true,
        repositoryLink: '',
        isAudited: true,
        tokenPurpose: chance.paragraph({ sentences: 200 }),
        tokenSupply: 75000000,
        tokenDistribution: chance.paragraph({ sentences: 200 }),
        tokenStandard: 'Hedera Token Service',
        hashscanLink: 'https://hashcan.io/v752vjdsb',
        revenueGeneration: chance.paragraph({ sentences: 200 }),
        tokenUseCases: chance.paragraph({ sentences: 200 }),
        registeredCountry: 'Poland',
        compliesWithRegulations: true,
        obtainedLegalAdvice: true,
        fundraisingTarget: 150000,
        minInvestment: '',
        maxInvestment: '30',
        tokenValue: 5,
        successReason: chance.paragraph({ sentences: 200 }),
        differentiation: chance.paragraph({ sentences: 200 }),
        launchDate: '25/02/2025',
        linkedin: "https://fake.com",
        discord: "https://fake.com",
        telegram: "https://fake.com",
        twitter: "https://fake.com",
        instagram: "https://fake.com",
        pdfFileName: 'pitchBlabla.pdf',
        imageFileName: 'img.png'
      };

      const updatedToken = await tokenRepository.updateTokenQuery(
        updateTokentInfo,
        addedToken._id,
      );

      if (updatedToken) {
        // Compare relevant properties
        expect(updatedToken.projectName).toBe(updateTokentInfo.projectName);
        expect(updatedToken.tokenName).toBe(updateTokentInfo.tokenName);
        expect(updatedToken.projectWebsite).toBe(updateTokentInfo.projectWebsite);
        // Add comparisons for other properties you need to verify
      } else {
        fail('Updated token is null');
      }
    }
  });
});
