import { AccountId, TransferTransaction, Hbar } from "@hashgraph/sdk";
import { hc } from "../../services/hashconnect";

export const transferToken = async (fromAccountId: string, toAccountId: string, amount: number) => {
  try {
    //@ts-ignore
    const signer: any = hc.getSigner(AccountId.fromString(fromAccountId));
    const frozenTransaction = await new TransferTransaction()
      .addHbarTransfer(fromAccountId, new Hbar(-amount))
      .addHbarTransfer(toAccountId, new Hbar(amount))
      .freezeWithSigner(signer);

    const executeResult = await frozenTransaction.executeWithSigner(signer);

    return { status: 200, result: { executeResult } };
  } catch (err) {
    return { status: 500, err: err };
  }
};
