import { useState } from "react";
import {
  Client,
  PrivateKey,
  AccountDeleteTransaction,
} from "@hashgraph/sdk";
import { TokenData, WalletAccountId } from "../../types/token.types";
import { deleteWalletFromToken } from "../../api/token";
import { AuthPKI } from "../../types/admin.types";
import { useDispatch, useSelector } from "react-redux";
import { loadToken, selectToken } from "../../store/tokenSlice";

//Your .env variables
const ownerId = import.meta.env.VITE_OWNER_ACCOUNT_ID || "";

if (!ownerId) {
  throw new Error(
    "Hedera operator ID is not set in environment variables"
  );
}

const DeleteWallet = ({
  fromAccountId,
  tokenId,
  auth
}: {
  fromAccountId: WalletAccountId;
  tokenId: string;
  auth: AuthPKI;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const tokens = useSelector(selectToken)
  const dispatch = useDispatch()

  const deleteteWallet = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const client = Client.forTestnet();
      const operatorId = fromAccountId.accountId;
      const operatorKey = fromAccountId.private_key;

      await client.setOperator(operatorId, PrivateKey.fromString(operatorKey));
      console.log("Operator set successfully");

      const transaction = await new AccountDeleteTransaction()
        .setAccountId(operatorId)
        .setTransferAccountId(ownerId)
        .freezeWith(client);

      const signTx = await transaction.sign(PrivateKey.fromString(operatorKey));

      const txResponse = await signTx.execute(client);

      const receipt = await txResponse.getReceipt(client);
      const transactionStatus = receipt.status;

      if (transactionStatus.toString() === "SUCCESS") {
        setResult("Wallet deleted successfully!");
        const deleteWallet = await deleteWalletFromToken(auth, tokenId)
        const newTokenList = JSON.parse(JSON.stringify(tokens))
        const index = newTokenList.allTokens.findIndex((token: TokenData) => token._id === tokenId)
        if(index !== -1){
          newTokenList.allTokens[index] = deleteWallet.content.updatedToken
          dispatch(loadToken(newTokenList.allTokens))
        }
      } else {
        setError("Failed to delete wallet: " + transactionStatus.toString());
      }
    } catch (err) {
      console.error("Failed to delete wallet:", err);
      setError(
        `Error: ${err instanceof Error ? err.message : JSON.stringify(err)}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deleteWallet">
      <button
        onClick={() => {
          setPopup(true);
        }}
        disabled={loading}
      >
        {loading ? "loading..." : "Delete Wallet"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {popup && (
        <div className="sure">
          <p>Are you sure?</p>
          <a href="" onClick={deleteteWallet}>
            Yes
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              setPopup(false);
            }}
          >
            No
          </a>
        </div>
      )}
      {result !== null && <p>{result}</p>}
    </div>
  );
};

export default DeleteWallet;
