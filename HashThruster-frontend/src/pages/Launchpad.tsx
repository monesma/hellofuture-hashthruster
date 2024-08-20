import Navbar from "../components/Navbar";
import Ico from "../components/Ico";
import { Link } from "react-router-dom";
import ScreenSize from "../helpers/ScreenSize";
import { useEffect, useState } from "react";
import PopupTransfer from "../components/PopupTransfer";
import { useSelector } from "react-redux";
import { AppStore } from "../store";
import PopupConnect from "../components/PopupConnect";
import { selectToken } from "../store/tokenSlice";
import { TokenData } from "../types/api-types";

const Launchpad = () => {
  const screenW = ScreenSize().width;
  const tokens = useSelector(selectToken)
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [tokenIndex, setTokenIndex] = useState<string | null>(null);
  const [popupConnect, setPopupConnect] = useState<boolean>(false);
  //@ts-ignore
  const { accountIds: connectedAccountIds, isConnected } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  const closePopup = () => {
    setIsPopup(false);
    setTokenIndex(null);
  };

  useEffect(() => {
    if (isPopup && isConnected === false) {
      closePopup();
      setPopupConnect(true);
    }
  }, [isPopup]);

  return (
    <div className="launchpad">
      {screenW < 1025 && <Navbar />}
      <section className="icozone">
        <h1>ICO ZONE</h1>
        <article>
          {tokens.allTokens.map((token: TokenData) => {
            return (
              <Ico
                key={token._id}
                token={token}
                onClickOpen={() => {
                  if(typeof token.walletAccountId === "object"){
                    setTokenIndex(token.walletAccountId.accountId);
                    setIsPopup(true);
                  }
                }}
              />
            );
          })}
        </article>
        <div>
          <h2>For token creators</h2>
          <p>
            Do you have an innovative project based on Hedera Hashgraph (HBAR)?
            Register your token on our ICO platform and raise the funds you need
            to launch your IEO on Coinstore. Join our ecosystem and benefit from
            the support of the Hedera community.
          </p>
          <Link to="/submit">Contact us</Link>
        </div>
        <div>
          <h2>For ICO participants</h2>
          <p>
            Participate in our ICO to support promising projects and obtain
            tokens before their official release. Invest in Hedera-based tokens
            and become part of the Hedera community.
          </p>
          <Link to="/informations">more info</Link>
        </div>
      </section>
      {isPopup && <PopupTransfer id={tokenIndex} onClickClose={closePopup} />}
      {popupConnect && (
        <PopupConnect
          onClickClose={() => {
            setPopupConnect(false);
          }}
        />
      )}
    </div>
  );
};

export default Launchpad;
