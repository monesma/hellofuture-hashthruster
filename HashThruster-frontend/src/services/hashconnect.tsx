import { AccountId, LedgerId, SignerSignature, Transaction, TransactionReceipt } from "@hashgraph/sdk";
import { HashConnect } from "hashconnect";

const env = "testnet";
const appMetadata = {
    name: "HASH THRUSTER",
    description: "ICO for hedera community",
    icons: [window.location.origin + "/src/assets/images/logo_black.png"],
    url: window.location.origin,
};

const projectId = "bfa190dbe93fcf30377b932b31129d05";

export const hc = new HashConnect(
    LedgerId.fromString(env),
    projectId,
    appMetadata,
    true
);
//@ts-ignore
export const getConnectedAccountIds: () => AccountId[] = () => {
    return hc.connectedAccountIds;
};
export const hcInitPromise = hc.init();
//@ts-ignore
export const signTransaction: (accountIdForSigning: AccountId, trans: Transaction) => Promise<Transaction> = async (
    accountIdForSigning: AccountId,
    trans: Transaction
) => {
    await hcInitPromise;

    const accountIds = getConnectedAccountIds();
    if (!accountIds) {
        throw new Error("No connected accounts");
    }

    const isAccountIdForSigningPaired = accountIds.some(
        (id) => id.toString() === accountIdForSigning.toString()
    );
    if (!isAccountIdForSigningPaired) {
        throw new Error(`Account ${accountIdForSigning} is not paired`);
    }
    //@ts-ignore
    const result = await hc.signTransaction(accountIdForSigning, trans);
    return result;
};
//@ts-ignore
export const executeTransaction: (accountIdForSigning: AccountId, trans: Transaction) => Promise<TransactionReceipt>= async (
    accountIdForSigning: AccountId,
    trans: Transaction
) => {
    await hcInitPromise;

    const accountIds = getConnectedAccountIds();
    if (!accountIds) {
        throw new Error("No connected accounts");
    }

    const isAccountIdForSigningPaired = accountIds.some(
        (id) => id.toString() === accountIdForSigning.toString()
    );
    if (!isAccountIdForSigningPaired) {
        throw new Error(`Account ${accountIdForSigning} is not paired`);
    }
    //@ts-ignore
    const result = await hc.sendTransaction(accountIdForSigning, trans);
    return result;
};
//@ts-ignore
export const signMessages: (accountIdForSigning: AccountId, message: string) => Promise<SignerSignature[]> = async (
    accountIdForSigning: AccountId,
    message: string
) => {
    await hcInitPromise;

    const accountIds = getConnectedAccountIds();
    if (!accountIds) {
        throw new Error("No connected accounts");
    }

    const isAccountIdForSigningPaired = accountIds.some(
        (id) => id.toString() === accountIdForSigning.toString()
    );
    if (!isAccountIdForSigningPaired) {
        throw new Error(`Account ${accountIdForSigning} is not paired`);
    }
    //@ts-ignore
    const result = await hc.signMessages(accountIdForSigning, message);
    return result;
};
