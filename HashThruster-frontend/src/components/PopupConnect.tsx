import { useSelector } from "react-redux";
import { AppStore } from "../store";
import { HashConnectConnectButton } from "./hashconnect/hashconnect-client";
import { useEffect } from "react";

const PopupConnect = ({ onClickClose }: { onClickClose: () => void }) => {
  //@ts-ignore
  const { accountIds: connectedAccountIds, isConnected } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  useEffect(() => {
    if (isConnected) {
      onClickClose();
    }
  }, [isConnected]);

  return (
    <div className="popupConnect">
      <p>Please connect your wallet to complete the transaction.</p>
      <HashConnectConnectButton />
      <a onClick={onClickClose}>cancel</a>
    </div>
  );
};

export default PopupConnect;
