import repositories from '../../../../frameworks/repositories/inMemory';
import { TokenQuery } from '../../../../domain/types/token-types';
import Chance from 'chance';
import mongoose from 'mongoose';
import {
  CreateAndUpdateTokenQuery,
} from '../../../../domain/dto/token/token-dto';

const chance = new Chance();
const { tokenRepository } = repositories;

// Helper function to generate test project data
const generateTestTokenData = () => ({
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
  hashscanLink: '0.0.587756',
  revenueGeneration: chance.paragraph({ sentences: 200 }),
  tokenUseCases: chance.paragraph({ sentences: 200 }),
  hasRoadMap: true,
  roadMapLink: '',
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
  let addedToken: TokenQuery;

  beforeEach(async () => {
    const testTokenData = generateTestTokenData();
    addedToken = await tokenRepository.add(testTokenData);
  });

  afterEach(async () => {
    if (addedToken && addedToken._id) {
      await tokenRepository.delete(addedToken._id);
    }
  });

  test('New token should be added and returned', async () => {
    expect(addedToken).toBeDefined();
    expect(addedToken._id).toBeDefined();

    const returnedProject = await tokenRepository.getById(addedToken._id);
    expect(addedToken).toEqual(returnedProject);
  });

  test('Token should be found by id', async () => {
    const returnedProject = await tokenRepository.getById(addedToken._id);
    expect(addedToken).toEqual(returnedProject);
  });

  test('Token selected by id should be deleted', async () => {
    expect(addedToken).toBeDefined();
    expect(addedToken._id).toBeDefined();

    const deletedProjectId = await tokenRepository.delete(addedToken._id);
    expect(deletedProjectId).toBe(addedToken._id);

    const deletedUnknownProjectId = await tokenRepository.delete(
      new mongoose.Types.ObjectId().toString()
    );
    expect(deletedUnknownProjectId).toBe(null);
  });

  test('Wallet from token selected by id should be deleted', async () => {
    expect(addedToken).toBeDefined();
    expect(addedToken._id).toBeDefined();

    const deletedWallet = await tokenRepository.deleteWallet(addedToken._id);
    expect(deletedWallet.walletAccountId).toBe("deleted");
  });

  test('Token infos should be updated', async () => {
    const updateTokenInfo: CreateAndUpdateTokenQuery = {
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
      hashscanLink: 'https://hashcan.io/vd855jdsb',
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
        updateTokenInfo,
      addedToken._id
    );

    expect(updatedToken.tokenName).toBe(updateTokenInfo.tokenName);
    expect(updatedToken.tokenSymbol).toBe(updateTokenInfo.tokenSymbol);
    expect(updatedToken.projectWebsite).toBe(updateTokenInfo.projectWebsite);
  });
});