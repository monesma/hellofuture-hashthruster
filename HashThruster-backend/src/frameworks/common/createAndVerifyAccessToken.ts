const jwt = require('jsonwebtoken');
const SECRET = process.env.ACCESS_TOKEN_SECRET;
import { verifyRefreshJWT } from './createAndVerifyRefreshToken';

export function createAccessToken(
  refreshToken: string,
  public_key: string,
): string | null {
  const decodedRefresh = verifyRefreshJWT(refreshToken, public_key);

  if (decodedRefresh === null) {
    console.log('Invalid token');
    return null;
  }

  try {
    const accessToken = jwt.sign(
      { _id: decodedRefresh._id, email: decodedRefresh.email },
      SECRET,
      { expiresIn: '15m' },
    );
    return accessToken;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function verifyAccesToken(accessToken: string) {
  try {
    const decoded = jwt.verify(accessToken, SECRET);
    return decoded;
  } catch (err) {
    console.log(err);
    return null;
  }
}
