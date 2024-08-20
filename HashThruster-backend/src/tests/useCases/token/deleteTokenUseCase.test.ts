import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateAndUpdateTokenQuery } from '../../../domain/dto/token/token-dto';

const { createTokenUseCase, deleteTokenUseCase } = useCases;

const generateTestTokenData = (): CreateAndUpdateTokenQuery => ({
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

describe('Delete an existing token', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  let addedToken: CreateAndUpdateTokenQuery;

  const createToken = createTokenUseCase(dependencies).execute;
  const deleteToken = deleteTokenUseCase(dependencies).execute;

  beforeEach(async () => {
    addedToken = generateTestTokenData();
  });

  test('Should delete the token and return 200 if the token exists', async () => {
    const createResponse = await createToken(addedToken);

    const tokenId = createResponse.content.createdToken._id;
    const deleteResponse = await deleteToken(tokenId);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.content.msg).toBe('Token deleted with success');
  });
});
