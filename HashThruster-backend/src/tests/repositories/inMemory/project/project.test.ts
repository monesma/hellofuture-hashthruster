import repositories from '../../../../frameworks/repositories/inMemory';
import { ProjectQuery } from '../../../../domain/types/project-types';
import Chance from 'chance';
import mongoose from 'mongoose';
import {
  UpdateProjectQuery,
  UpdateProjectStatusQuery,
} from '../../../../domain/dto/project/project-dto';

const chance = new Chance();
const { projectRepository } = repositories;

// Helper function to generate test project data
const generateTestProjectData = () => ({
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
  projectEmail: 'blabla@gmail.com'
});

describe('Project repository', () => {
  let addedProject: ProjectQuery;

  beforeEach(async () => {
    const testProjectData = generateTestProjectData();
    addedProject = await projectRepository.add(testProjectData);
  });

  afterEach(async () => {
    if (addedProject && addedProject._id) {
      await projectRepository.delete(addedProject._id);
    }
  });

  test('New project should be added and returned', async () => {
    expect(addedProject).toBeDefined();
    expect(addedProject._id).toBeDefined();

    const returnedProject = await projectRepository.getById(addedProject._id);
    expect(addedProject).toEqual(returnedProject);
  });

  test('Project should be found by id', async () => {
    const returnedProject = await projectRepository.getById(addedProject._id);
    expect(addedProject).toEqual(returnedProject);
  });

  test('Project selected by id should be deleted', async () => {
    expect(addedProject).toBeDefined();
    expect(addedProject._id).toBeDefined();

    const deletedProjectId = await projectRepository.delete(addedProject._id);
    expect(deletedProjectId).toBe(addedProject._id);

    const deletedUnknownProjectId = await projectRepository.delete(
      new mongoose.Types.ObjectId().toString()
    );
    expect(deletedUnknownProjectId).toBe(null);
  });

  test('Project infos should be updated', async () => {
    const updateProjectInfo: UpdateProjectQuery = {
      projectName: chance.company(),
      tokenName: 'Bravo token',
      tokenSymbol: 'BRAV',
      projectWebsite: 'https://bravotoken.com',
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
      hashscanLink: 'https://hashcan.io/vd855jdsb',
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
      projectEmail: 'blabla@gmail.com'
    };

    const updatedProject = await projectRepository.updateProjectQuery(
      updateProjectInfo,
      addedProject._id
    );

    expect(updatedProject.tokenName).toBe(updateProjectInfo.tokenName);
    expect(updatedProject.tokenSymbol).toBe(updateProjectInfo.tokenSymbol);
    expect(updatedProject.projectWebsite).toBe(updateProjectInfo.projectWebsite);
  });

  test('Project status should be updated', async () => {
    const updateProjectStatus: UpdateProjectStatusQuery = {
      status: 'approved',
    };

    const updatedProject = await projectRepository.updateProjectStatusQuery(
      updateProjectStatus,
      addedProject._id
    );

    expect(updatedProject.status).toBe('approved');
  });
});
