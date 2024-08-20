import repositories from '../../../../frameworks/repositories/mongo';
import { ProjectQuery } from '../../../../domain/types/project-types';
import Chance from 'chance';
import {
  CreateProjectQuery,
  UpdateProjectQuery,
  UpdateProjectStatusQuery,
} from '../../../../domain/dto/project/project-dto';
import mongoose from 'mongoose';
import MongoConnect from '../../../../frameworks/database/mongo';

const chance = new Chance();
const { projectRepository } = repositories;

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
  status: 'pending',
  projectEmail: 'blabla@gmail.com'
});

describe('Project repository', () => {
  let addedProject: ProjectQuery | null = null

  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });

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
    if (addedProject) {
      expect(addedProject._id).toBeDefined();

      const returnedProject = await projectRepository.getById(
        addedProject._id.toString(),
      );
      expect(returnedProject).toEqual(addedProject);
    }
  });

  test('Project should be found by id', async () => {
    if (addedProject) {
      const returnedProjectById = await projectRepository.getById(addedProject._id.toString());
      expect(returnedProjectById).toEqual(addedProject);
    }
  });

  test('Project selected by id should be deleted', async () => {
    if (addedProject) {
      const deletedProject = await projectRepository.delete(addedProject._id.toString());
      expect(deletedProject).toBe(addedProject._id);

      const deletedUnknownProject = await projectRepository.delete(
        new mongoose.Types.ObjectId().toString(),
      );
      expect(deletedUnknownProject).toBe(null);
    }
  });

  test('Project infos should be updated', async () => {
    if (addedProject) {
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
        hashscanLink: 'https://hashcan.io/v752vjdsb',
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
        addedProject._id,
      );

      if (updatedProject) {
        expect(updatedProject.tokenName).toBe(updateProjectInfo.tokenName);
        expect(updatedProject.tokenSymbol).toBe(updateProjectInfo.tokenSymbol);
        expect(updatedProject.projectWebsite).toBe(
          updateProjectInfo.projectWebsite,
        );
      } else {
        fail('Updated project is null');
      }
    }
  });

  test('Project status should be updated', async () => {
    if (addedProject) {
      const updateProjectStatus: UpdateProjectStatusQuery = {
        status: 'approved',
      };

      const updatedProject: any = await projectRepository.updateProjectStatusQuery(
        updateProjectStatus,
        addedProject._id,
      );

      if (updatedProject) {
        expect(updatedProject.status).toBe('approved');
      } else {
        fail('Updated project is null');
      }
    }
  });
});
