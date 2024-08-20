const jwt = require('jsonwebtoken');

export const createRefreshJWT = (
  payload: { _id: string; email: string },
  private_key: string,
): string | null => {
  const signOptions = {
    algorithm: 'ES256',
  };
  try {
    const token = jwt.sign(payload, private_key, signOptions);
    return token;
  } catch (err) {
    console.log('Key problem');
    return null;
  }
};

export function verifyRefreshJWT(
  token: string | null,
  public_key: string,
): { _id: string; email: string; iat: number } | null {
  try {
    const decoded = jwt.verify(token, public_key);
    return decoded;
  } catch (error: any) {
    console.error('Erreur de vérification du JWT :', error.message);
    return null;
  }
}
