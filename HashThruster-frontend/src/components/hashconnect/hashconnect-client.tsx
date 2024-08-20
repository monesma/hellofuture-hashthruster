import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConnectedAccountIds,
  hc,
  hcInitPromise,
} from "../../services/hashconnect";
import { actions } from "../../store/hashconnect";
import { AppStore } from "../../store";

export const HashConnectClient = () => {
  const dispatch = useDispatch();
  const syncWithHashConnect = useCallback(() => {
    const connectedAccountIds = getConnectedAccountIds();
    if (connectedAccountIds.length > 0) {
      dispatch(
        actions.hashconnect.setAccountIds(
          connectedAccountIds.map((o) => o.toString())
        )
      );
      dispatch(actions.hashconnect.setIsConnected(true));
      dispatch(actions.hashconnect.setPairingString(hc.pairingString ?? ""));
    } else {
      dispatch(actions.hashconnect.setAccountIds([]));
      dispatch(actions.hashconnect.setIsConnected(false));
      dispatch(actions.hashconnect.setPairingString(hc.pairingString ?? ""));
    }
  }, [dispatch]);

  syncWithHashConnect();
  hcInitPromise.then(() => {
    syncWithHashConnect();
  });
  hc.pairingEvent.on(() => {
    syncWithHashConnect();
  });
  hc.disconnectionEvent.on(() => {
    syncWithHashConnect();
  });
  hc.connectionStatusChangeEvent.on(() => {
    syncWithHashConnect();
  });
  return null;
};

export const HashConnectConnectButton = () => {
  const { isConnected, accountIds: connectedAccountIds } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  return (
    <button
      id="walletConnect"
      onClick={async () => {
        if (isConnected) {
          await hcInitPromise;
          if (isConnected) {
            if (getConnectedAccountIds().length > 0) {
              hc.disconnect();
            }
          }
        } else {
          // open walletconnect modal
          hc.openPairingModal();
        }
      }}
    >
      {isConnected
        ? `Disconnect ${connectedAccountIds.length > 1 ? "s" : ""}`
        : "Connect wallet"}
    </button>
  );
};
