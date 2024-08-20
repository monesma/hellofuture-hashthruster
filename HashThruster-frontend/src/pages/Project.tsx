import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ScreenSize from "../helpers/ScreenSize";
import NoLogo from "../assets/images/no-logo.png";
import moment from "moment";
import {
  getHbarPrice,
  getTokenById,
  getWalletFromProject
} from "../api/hedera";
import { AppStore } from "../store";
import { transferToken } from "../components/hedera/transferToken";
import { selectToken } from "../store/tokenSlice";
import { TokenData, TokenDataHash } from "../types/api-types";
import PopupConnect from "../components/PopupConnect";

const Project = () => {
  const { id } = useParams<{ id: string }>();
  const tokens = useSelector(selectToken);
  const navigate = useNavigate();
  const [token, setToken] = useState<TokenData | null>(null);
  const [tokenHashScan, setTokenHashScan] = useState<TokenDataHash>({
    token_id: "value not found",
    type: "value not found",
    decimals: "value not found",
    supply_type: "value not found",
    initial_supply: "value not found",
    total_supply: "value not found",
    max_supply: "value not found",
    created_timestamp: "value not found",
    symbol: "value not found",
  });
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  //@ts-ignore
  const [walletCollect, setWalletCollect] = useState<any>(null);
  const [balanceDollar, setBalanceDollar] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [hbarPrice, setHbarPrice] = useState<number | null>(null);
  const [popupConnect, setPopupConnect] = useState<boolean>(false);
  const screenW = ScreenSize().width;
  const { accountIds: connectedAccountIds, isConnected } = useSelector(
    (state: AppStore) => state.hashconnect
  );

  useEffect(() => {
    const fetchData = async () => {
      if (tokens.allTokens.length > 0 && id) {
        if (!id || tokens.allTokens.length === 0) {
          navigate("/launchpad");
          return;
        }

        const selectedToken = tokens.allTokens.find(
          (t: TokenData) => t._id === id
        );
        if (!selectedToken) {
          navigate("/launchpad");
          return;
        }

        try {
          setToken(selectedToken);
          setPdfUrl(selectedToken.pdfFileName);

          const tokenData = await getTokenById(selectedToken.hashscanLink);
          if (tokenData.code) {
            console.log("404 data not found");
          } else {
            setTokenHashScan({
              token_id: tokenData.token_id,
              type: tokenData.type,
              decimals: tokenData.decimals,
              supply_type: tokenData.supply_type,
              initial_supply: tokenData.initial_supply,
              total_supply: tokenData.total_supply,
              max_supply: tokenData.max_supply,
              created_timestamp: Number(tokenData.created_timestamp),
              symbol: tokenData.symbol,
            });
          }

          const walletData = await getWalletFromProject(
            selectedToken.walletAccountId.accountId
          );
          setWalletCollect(walletData);
          const priceInHBAR = walletData.balance.balance / 100000000;

          const price = await getHbarPrice(priceInHBAR);
          if (price !== null) {
            const myPercentage =
              (priceInHBAR / selectedToken.fundraisingTarget) * 100;
            setPercentage(myPercentage);
            setBalanceDollar(price);
          }
        } catch (error) {
          console.error("An error occurred:", error);
          navigate("/launchpad");
        }
      }
    };

    fetchData();
  }, [id, tokens.allTokens, navigate]);

  const handleViewPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    } else {
      console.error("PDF URL not found.");
    }
  };

  const formatNumberWithCommas = (number: number | string | undefined) => {
    if (number !== undefined) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return number;
  };

  const renderListWithCommas = (items: string[]) => items.join(", ");

  const onSubmitForm = async () => {
    if (isConnected) {
      if (!isConnected || !connectedAccountIds.length) return;
      if(token !== null && typeof token.walletAccountId === "object"){
        const walletData = await getWalletFromProject(token.walletAccountId.accountId)
        setWalletCollect(walletData)
        const priceInHBAR = walletData.balance.balance / 1e9; // Convert to HBAR

        const price = await getHbarPrice(priceInHBAR);
        if (price !== null) {
          const myPercentage =
            (priceInHBAR / tokens.allTokens.fundraisingTarget) * 100;
          setPercentage(myPercentage);
          setBalanceDollar(price);
        }
      }
    } else {
      setPopupConnect(true);
    }
  };

  return (
    <div className="project">
      {screenW < 1025 && <Navbar />}
      {token && (
        <section>
          {screenW < 1025 && (
            <h1>
              {token.tokenName} ({token.tokenSymbol})
            </h1>
          )}
          <div className="description">
            {screenW > 1024 ? (
              <div id="logoTitle">
                <img
                  src={token.imageFileName || NoLogo}
                  alt={`${token.tokenName} logo`}
                />
                <h1>
                  {token.tokenName} ({token.tokenSymbol})
                </h1>
              </div>
            ) : (
              <img
                src={token.imageFileName || NoLogo}
                alt={`${token.tokenName} logo`}
              />
            )}
            <p>{token.projectDescription}</p>
            <h2>Technologies</h2>
            <ul>
              {token.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
            <button onClick={handleViewPdf} id="pdf">
              Download pitch
            </button>
            <div className="progress-bg">
              <div className="progress-bar" style={{ width: `${percentage}%` }}>
                {balanceDollar !== null && (
                  <h3 className="raised">
                    ${formatNumberWithCommas(balanceDollar.toLocaleString())}{" "}
                    raised
                  </h3>
                )}
              </div>
              <h3 className="goal">
                Goal: ${formatNumberWithCommas(token.fundraisingTarget)}
              </h3>
            </div>
            <div className="formPart">
              <p>How much do you want to invest?</p>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              {typeof token.walletAccountId === "object" && (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setError(null);
                      setSuccess(null);
                      if (isConnected) {
                        try {
                          const result = await transferToken(
                            connectedAccountIds[0],
                            //@ts-ignore
                            token.walletAccountId.accountId,
                            amount
                          );
                          if (result.status === 200) {
                            const recupPrice = await getHbarPrice(amount);
                            setHbarPrice(recupPrice);
                            await onSubmitForm();
                          }
                        } catch {
                          setError("Error: please try later!");
                        }
                      } else {
                        setPopupConnect(true);
                      }
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        name="amount"
                        placeholder="amount in HBAR"
                        onChange={(e) => {
                          const value = parseFloat(e.currentTarget.value);
                          if (isNaN(value)) {
                            setHbarPrice(null);
                          } else {
                            setAmount(value);
                            getHbarPrice(value)
                              .then((res) => setHbarPrice(res))
                              .catch(() => setHbarPrice(null));
                          }
                        }}
                      />
                      <button type="submit">INVEST</button>
                    </div>
                    {hbarPrice !== null && <p>{hbarPrice} $</p>}
                  </form>
                )}
            </div>
          </div>
          {tokenHashScan && (
            <div className="hashscan">
              {screenW < 1024 && <h2>Hashscan</h2>}
              <table>
                <tbody>
                  {Object.entries(tokenHashScan).map(([key, value]) => {
                    if (key !== "created_timestamp") {
                      return (
                        <tr key={key}>
                          <td>{key.replace(/_/g, " ").toUpperCase()}</td>
                          <td>
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : value}
                          </td>
                        </tr>
                      );
                    }
                  })}
                  <tr>
                    <td>Creation Date</td>
                    <td>
                      {tokenHashScan.created_timestamp !== "value not found"
                        ? moment
                            .unix(Number(tokenHashScan.created_timestamp))
                            .format("DD-MM-YYYY")
                        : "value not found"}
                    </td>
                  </tr>
                  <tr>
                    <td>HashScan</td>
                    <td>
                      {tokenHashScan.token_id !== "value not found" ? (
                        <a
                          href={`https://hashscan.io/testnet/token/${tokenHashScan.token_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click Here
                        </a>
                      ) : (
                        "value not found"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {token && (
            <div className="projectInfos2">
              <h2>Project informations</h2>
              <article>
                <h3>General informations</h3>
                <p>
                  <strong>Project name: </strong>
                  {token.projectName}
                </p>
                <p>
                  <strong>Token name: </strong>
                  {token.tokenName}
                </p>
                <p>
                  <strong>Token symbol: </strong>
                  {token.tokenSymbol}
                </p>
                <p>
                  <strong>Description:</strong> {token.projectDescription}
                </p>
                <p>
                  <strong>Official website:</strong>{" "}
                  {token.projectWebsite ? (
                    <a
                      href={token.projectWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {token.projectWebsite}
                    </a>
                  ) : (
                    "No website"
                  )}
                </p>
              </article>
              <article>
                <h3>Technologies</h3>
                <p>
                  <strong>Hedera Technologies Used:</strong>{" "}
                  {renderListWithCommas(token.technologies)}
                </p>
                <p>
                  <strong>
                    Is the smart contract source code open source?
                  </strong>{" "}
                  {token.isOpenSource ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Repository:</strong>{" "}
                  {token.isOpenSource && (
                    <a
                      href={token.repositoryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {token.repositoryLink}
                    </a>
                  )}
                </p>
                <p>
                  <strong>Is there a security audit of the code?</strong>{" "}
                  {token.isAudited ? "Yes" : "No"}
                </p>
              </article>
              <article>
                <h3>Token Features</h3>
                <p>
                  <strong>Main purpose of the token:</strong>{" "}
                  {token.tokenPurpose}
                </p>
                <p>
                  <strong>Token supply:</strong>{" "}
                  {formatNumberWithCommas(token.tokenSupply)}{" "}
                  {token.tokenSymbol}
                </p>
                <p>
                  <strong>Token distribution policy:</strong>{" "}
                  {token.tokenDistribution}
                </p>
                <p>
                  <strong>Token compliance:</strong> {token.tokenStandard}
                </p>
              </article>
              <article>
                <h3>Economics and Business Model</h3>
                <p>
                  <strong>Project revenue generation:</strong>{" "}
                  {token.revenueGeneration}
                </p>
                <p>
                  <strong>Token's main use cases: </strong>{" "}
                  {token.tokenUseCases}
                </p>
              </article>
              <article>
                <h3>Legal Aspects</h3>
                <p>
                  <strong>Country of registration:</strong>{" "}
                  {token.registeredCountry}
                </p>
                <p>
                  <strong>
                    Compliance with local and international regulations?
                  </strong>{" "}
                  {token.compliesWithRegulations ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Obtained legal advice before ICO submission?</strong>{" "}
                  {token.obtainedLegalAdvice ? "Yes" : "No"}
                </p>
              </article>
              <article>
                <h3>Marketing and Community</h3>
                <p>
                  <strong>Linkedin:</strong>{" "}
                  <a
                    href={token.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {token.linkedin}
                  </a>
                </p>
                <p>
                  <strong>Discord:</strong>{" "}
                  <a
                    href={token.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {token.discord}
                  </a>
                </p>
                <p>
                  <strong>Twitter:</strong>{" "}
                  <a
                    href={token.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {token.twitter}
                  </a>
                </p>
                <p>
                  <strong>Telegram:</strong>{" "}
                  <a
                    href={token.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {token.telegram}
                  </a>
                </p>
                <p>
                  <strong>Instagram:</strong>{" "}
                  <a
                    href={token.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {token.instagram}
                  </a>
                </p>
              </article>
              <article>
                <h3>Financing</h3>
                <p>
                  <strong>Fundraising Target:</strong>{" "}
                  {formatNumberWithCommas(token.fundraisingTarget)} $
                </p>
                <p>
                  <strong>Minimum investment per participant:</strong>{" "}
                  {token.minInvestment} $
                </p>
                <p>
                  <strong>Maximum investment per participant:</strong>{" "}
                  {token.maxInvestment || "No limit"}
                </p>
                <p>
                  <strong>Initial value of a token in Hedera HBAR:</strong>{" "}
                  {token.tokenValue} HBAR
                </p>
              </article>
              <article>
                <h3>Conclusion</h3>
                <h4>Why do you think your project will succeed?</h4>
                <p>{token.successReason}</p>
                <h4>What differentiates your project from others?</h4>
                <p>{token.differentiation}</p>
                <p>
                  <strong>When will the token be officially launched?</strong>{" "}
                  {token.launchDate}
                </p>
              </article>
            </div>
          )}
        </section>
      )}
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

export default Project;
