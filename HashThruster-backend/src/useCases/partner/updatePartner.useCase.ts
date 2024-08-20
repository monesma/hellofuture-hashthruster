import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';
import bcrypt from 'bcryptjs';

// Convertir SALTROUNDS en entier
const SALT_ROUNDS = parseInt(process.env.SALTROUNDS || '10', 10);
if (isNaN(SALT_ROUNDS)) {
  throw new Error('SALTROUNDS is not defined or is not a valid number');
}

// Définir l'expression régulière pour la validation du mot de passe
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default (dependencies: any) => {
  const { partnerRepository } = dependencies;

  if (!partnerRepository) {
    throw new Error('The partner repository should exist in dependencies');
  }

  const execute = async (password: string, id: string): Promise<ResponseRequest> => {
    try {
      if (!password || !passwordRegex.test(password)) {
        return new ResponseRequest({
          status: 400,
          error: new ResponseError({
            error: 'Invalid input',
            msg: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          }),
          content: null,
        });
      }

      const isUserExist = await partnerRepository.getById(id);

      if (!isUserExist) {
        return new ResponseRequest({
          status: 404,
          error: new ResponseError({
            error: 'Not found',
            msg: 'This account does not exist',
          }),
          content: null,
        });
      }
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const update = await partnerRepository.updatePartnerPassword(hashedPassword, id);
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          msg: "Partner updated successfully"
        },
      });
    } catch (error) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: 'Internal error',
          msg: 'A problem occurred',
        }),
        content: null,
      });
    }
  };

  return { execute };
};
