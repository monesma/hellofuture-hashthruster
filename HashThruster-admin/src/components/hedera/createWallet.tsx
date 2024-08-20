import { useState } from "react";
import {
  Client,
  PrivateKey,
  Hbar,
  AccountCreateTransaction,
} from "@hashgraph/sdk";

const client = Client.forTestnet();
//Your .env variables
const operatorId = import.meta.env.VITE_MY_ACCOUNT_ID || "";
const operatorKey = import.meta.env.VITE_PRIVATE_KEY || "";

if (!operatorId || !operatorKey) {
  throw new Error(
    "Hedera operator ID or key is not set in environment variables"
  );
}

try {
  client.setOperator(operatorId, PrivateKey.fromString(operatorKey));
  console.log("Operator set successfully");
} catch (error) {
  console.error("Failed to set operator:", error);
}

type Wallet = {
  accountId: string;
  private_key: string;
  public_key: string;
};

const CreateWallet = ({
  recupAccountInfos,
}: {
  recupAccountInfos: (accountId: Wallet) => void;
}) => {
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateWallet = async () => {
    setLoading(true);
    setError(null);
    try {
      const newAccountPrivateKey = PrivateKey.generateED25519();
      const newAccountPublicKey = newAccountPrivateKey.publicKey;
      const newAccount = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(new Hbar(10))
        .execute(client);
      const getReceipt = await newAccount.getReceipt(client);
      const newAccountId = getReceipt.accountId;

      if (newAccountId) {
        setAccountId(newAccountId.toString());

        recupAccountInfos({
          accountId: newAccountId.toString(),
          private_key: newAccountPrivateKey.toString(),
          public_key: newAccountPublicKey.toString(),
        });
      }

      setPrivateKey(newAccountPrivateKey.toString());
      setPublicKey(newAccountPublicKey.toString());
    } catch (err) {
      setError(
        `Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createWallet">
      <h2>Create Hedera Wallet on Testnet</h2>
      <button onClick={generateWallet} disabled={loading}>
        {loading ? "Creating..." : "Create Wallet"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {privateKey && (
        <div>
          <h4>Wallet Created Successfully</h4>
          <p>
            <strong>Account ID:</strong> {accountId}
          </p>
          <p>
            <strong>Private Key:</strong> {privateKey}
          </p>
          <p>
            <strong>Public Key:</strong> {publicKey}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
