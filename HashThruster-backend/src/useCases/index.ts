import partnerUseCases from './partner';
import authUseCases from './auth';
import adminUseCases from './admin';
import projectUseCase from './project'
import tokenUseCase from './token'

export default {
  ...partnerUseCases,
  ...authUseCases,
  ...adminUseCases,
  ...projectUseCase,
  ...tokenUseCase
};
