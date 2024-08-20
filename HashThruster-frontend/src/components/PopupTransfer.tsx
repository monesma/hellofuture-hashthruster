import { useState } from "react";
import { getHbarPrice } from "../api/hedera";
import { useSelector } from "react-redux";
import { transferToken } from "../components/hedera/transferToken";
import { AppStore } from "../store";

const PopupTransfer = ({
  id,
  onClickClose,
}: {
  id: string | null;
  onClickClose: () => void;
}) => {
  const [hbarPrice, setHbarPrice] = useState<number | null>(null);
  const { accountIds: connectedAccountIds, isConnected } = useSelector(
    (state: AppStore) => state.hashconnect
  );
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const onSubmitForm = async () => {
    setError(null)
    try {
      if(id !== null){
        const result = await transferToken(
          connectedAccountIds[0],
          id,
          amount
        );
        if (result.status === 200) {
        onClickClose()
        }
      }
    } catch {
      setError("Error: please try later!");
    }
  };

  return (
    <div className="popup">
      {error !== null && <p>{error}</p>}
      <p>How much do you want to invest?</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          if (isConnected) {
            try {
              const recupPrice = await getHbarPrice(amount);
              setHbarPrice(recupPrice);
              onSubmitForm()
            } catch (err) {
              setError("Error: please try later!");
            }
          }
        }}
      >
        <div>
          <input
            type="text"
            name="amount"
            placeholder="amount in HBAR"
            onChange={(e) => {
              if (
                e.currentTarget.value === "" ||
                isNaN(parseFloat(e.currentTarget.value))
              ) {
                setHbarPrice(null);
              } else {
                setAmount(parseFloat(e.currentTarget.value));
                getHbarPrice(parseFloat(e.currentTarget.value))
                  .then((res) => {
                    setHbarPrice(res);
                  })
                  .catch(() => {
                    setHbarPrice(null);
                  });
              }
            }}
          />
          <button>INVEST</button>
        </div>
        {hbarPrice !== null ? <p>{hbarPrice} $</p> : <p></p>}
      </form>
      <a onClick={onClickClose}>cancel</a>
    </div>
  );
};

export default PopupTransfer;
