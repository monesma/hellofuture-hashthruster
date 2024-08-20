import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateAndUpdateTokenQuery } from '../../../domain/dto/token/token-dto';

const { createTokenUseCase, readOneTokenUseCase } = useCases;

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

describe('Read One token', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  let addedToken: CreateAndUpdateTokenQuery

  const createToken = createTokenUseCase(dependencies).execute;
  const readToken = readOneTokenUseCase(dependencies).execute;

  beforeEach(async () => {
    addedToken = generateTestTokenData();
  });

  test('Should return 200 if good informations', async () => {

    const response = await createToken(addedToken);

    expect(response.status).toBe(200);
    expect(response.content.createdToken.projectName).toBe(addedToken.projectName);
    expect(response.content.createdToken.tokenName).toBe(
      addedToken.tokenName,
    );
    expect(response.content.createdToken.tokenSymbol).toBe(
        addedToken.tokenSymbol,
    );
    
    const oneToken = await readToken(response.content.createdToken._id);
    expect(oneToken.status).toBe(200);
    expect(oneToken.content.token).toBeDefined();
    expect(oneToken.content.token.projectName).toEqual(addedToken.projectName);
  });
});