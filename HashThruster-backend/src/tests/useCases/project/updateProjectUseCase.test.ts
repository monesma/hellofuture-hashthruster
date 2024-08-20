import repositories from '../../../frameworks/repositories/inMemory';
import useCases from '../../../useCases';
import Chance from 'chance';
const chance = new Chance();
import { CreateProjectQuery, UpdateProjectQuery } from '../../../domain/dto/project/project-dto';
import { ProjectQuery } from '../../../domain/types/project-types';

const { createProjectUseCase, updateProjectUseCase } = useCases;

const generateTestProjectData = (): CreateProjectQuery => ({
    creation_date: new Date(),
    projectName: chance.company(),
    tokenName: 'Alpha token',
    tokenSymbol: 'ALFA',
    projectWebsite: 'https://alphatoken.com',
    projectDescription: chance.paragraph({ sentences: 200 }),
    teamMemberCount: 15,
    teamMembers: [
      { name: 'Yann', position: 'CEO', linkedin: 'https://linkedin.com' },
    ],
    hasPartners: true,
    partnerCount: 5,
    mainPartner: 'Hedera',
    partnerRole: 'Help us for marketing',
    technologies: ['Hedera Token Service'],
    isOpenSource: true,
    repositoryLink: '',
    isAudited: true,
    auditCompany: chance.company(),
    tokenPurpose: chance.paragraph({ sentences: 200 }),
    tokenSupply: 75000000,
    tokenDistribution: chance.paragraph({ sentences: 200 }),
    tokenStandard: 'Hedera Token Service',
    hashscanLink: 'https://hashcan.io/vdkvjdsb',
    businessModel: true,
    revenueGeneration: chance.paragraph({ sentences: 200 }),
    tokenUseCases: chance.paragraph({ sentences: 200 }),
    hasRoadMap: true,
    roadMapLink: '',
    registeredCountry: 'Poland',
    compliesWithRegulations: true,
    obtainedLegalAdvice: true,
    marketingStrategy: chance.paragraph({ sentences: 200 }),
    communicationChannels: ['Twitter', 'Telegram'],
    communityMembers: '500-2500',
    risks: chance.paragraph({ sentences: 200 }),
    challenges: chance.paragraph({ sentences: 200 }),
    fundraisingTarget: 150000,
    minInvestment: '',
    maxInvestment: '30',
    tokenValue: 5,
    successReason: chance.paragraph({ sentences: 200 }),
    differentiation: chance.paragraph({ sentences: 200 }),
    launchDate: '25/02/2025',
    hasLaunched: false,
    projectLaunchDate: '15/12/2024',
    pdfFileName: 'pitchBlabla.pdf',
    projectEmail: 'blabla@gmail.com',
    status: 'pending',
  });

const generateUpdateProjectData = (existingProject: CreateProjectQuery): UpdateProjectQuery => ({
    ...existingProject,
    projectName: 'Updated Project Name',
    tokenName: 'Updated Token Name',
    tokenSymbol: 'UPDT',
    projectDescription: chance.paragraph({ sentences: 50 }),
    teamMemberCount: 10,
    hasLaunched: true
});

describe('Update an existing project', () => {
  const dependencies = {
    ...useCases,
    ...repositories,
  };

  let addedProject: CreateProjectQuery;

  const createProject = createProjectUseCase(dependencies).execute;
  const updateProject = updateProjectUseCase(dependencies).execute;

  beforeEach(async () => {
    addedProject = generateTestProjectData();
  });

  test('Should update the project and return 200 if the information is correct', async () => {
    const createResponse = await createProject(addedProject);

    const projectId = createResponse.content.createdProject.id;  // Assuming that the ID is returned
    const updatedProjectData = generateUpdateProjectData(createResponse.content.createdProject);

    const updateResponse = await updateProject(updatedProjectData, projectId);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.content.updatedProject.projectName).toBe(updatedProjectData.projectName);
    expect(updateResponse.content.updatedProject.tokenName).toBe(updatedProjectData.tokenName);
    expect(updateResponse.content.updatedProject.tokenSymbol).toBe(updatedProjectData.tokenSymbol);
    expect(updateResponse.content.updatedProject.teamMemberCount).toBe(updatedProjectData.teamMemberCount);
    expect(updateResponse.content.updatedProject.status).toBe('pending');
  });
});
