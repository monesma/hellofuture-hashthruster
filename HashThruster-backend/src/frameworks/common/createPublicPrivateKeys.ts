import crypto from 'crypto';

export const createPublicPrivateKeys = (): {
  public_key: string;
  private_key: string;
} => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'P-256',
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  return {
    public_key: publicKey,
    private_key: privateKey,
  };
};
