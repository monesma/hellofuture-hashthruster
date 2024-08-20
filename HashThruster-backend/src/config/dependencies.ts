//import repositories from '../frameworks/repositories/inMemory'
import repositories from '../frameworks/repositories/mongo';
import useCases from '../useCases';

export default {
  ...repositories,
  ...useCases,
};
