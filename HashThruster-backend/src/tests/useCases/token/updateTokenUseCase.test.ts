import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateAndUpdateTokenQuery } from '../../../domain/dto/token/token-dto';

const { createTokenUseCase, updateTokenUseCase } = useCases;

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

const generateUpdateTokenData = (existingProject: CreateAndUpdateTokenQuery): CreateAndUpdateTokenQuery => ({
    ...existingProject,
    projectName: 'Updated Project Name',
    tokenName: 'Updated Token Name',
    tokenSymbol: 'UPDT',
    projectDescription: chance.paragraph({ sentences: 50 })
});

describe('Update an existing token', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  let addedToken: CreateAndUpdateTokenQuery;

  const createToken = createTokenUseCase(dependencies).execute;
  const updateToken = updateTokenUseCase(dependencies).execute;

  beforeEach(async () => {
    addedToken = generateTestProjectData();
  });

  test('Should update the token and return 200 if the information is correct', async () => {
    const createResponse = await createToken(addedToken);

    const tokenId = createResponse.content.createdToken.id;
    const updatedTokenData = generateUpdateTokenData(createResponse.content.createdToken);

    const updateResponse = await updateToken(updatedTokenData, tokenId);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.content.updatedToken.projectName).toBe(updatedTokenData.projectName);
    expect(updateResponse.content.updatedToken.tokenName).toBe(updatedTokenData.tokenName);
    expect(updateResponse.content.updatedToken.tokenSymbol).toBe(updatedTokenData.tokenSymbol);
  });
});
