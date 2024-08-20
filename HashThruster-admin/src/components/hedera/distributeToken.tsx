import { useState } from "react";
import { WalletAccountId } from "../../types/token.types";
import { TransferTransaction, Hbar, Client, PrivateKey } from "@hashgraph/sdk";

const DistributeToken = ({fromAccountId }: {fromAccountId: WalletAccountId}) => {
    const [walletReceiver, setWalletReceiver] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [receiptResult, setReceiptResult] = useState<string | null>(null)
    const transfer = async () => {
        setReceiptResult(null)
        const client = Client.forTestnet();
        const operatorId = fromAccountId.accountId;
        const operatorKey = fromAccountId.private_key;
        client.setOperator(operatorId, PrivateKey.fromString(operatorKey));

        const transaction = await new TransferTransaction()
        .addHbarTransfer(fromAccountId.accountId, new Hbar(-amount))
        .addHbarTransfer(walletReceiver, new Hbar(amount))
        .freezeWith(client);


        const signTx = await transaction.sign(PrivateKey.fromString(operatorKey));

        const txResponse = await signTx.execute(client);

        const receipt = await txResponse.getReceipt(client);

        const transactionStatus = receipt.status;

        setReceiptResult(transactionStatus.toString())
    }
  return (
    <div className="distribute">
        <h3>Send Token</h3>
        <form onSubmit={(e)=>{
            e.preventDefault()
            transfer()
        }}>
            <input type="text"
                placeholder="wallet receipt"
                onChange={(e)=>{
                    setWalletReceiver(e.currentTarget.value)
                }}
            />
            <input type="number" 
                placeholder="amount"
                onChange={(e)=>{
                    setAmount(parseFloat(e.currentTarget.value))
                }}
            />
            <input type="submit" value="Send" />
        </form>
        {receiptResult && <p>{receiptResult}</p>}
    </div>
  )
}

export default DistributeToken