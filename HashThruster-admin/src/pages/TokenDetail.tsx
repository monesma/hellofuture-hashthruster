import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getHbarPrice, getTokenById, getWalletFromProject } from "../api/hedera";
import ScreenSize from "../helpers/ScreenSize";
import NoLogo from "../assets/images/no-logo.png";
import moment from "moment";
import { selectAdmin } from "../store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { TokenData, TokenDataHash, WalletInfo } from "../types/token.types";
import { deleteOneToken, displayTokens, getOneToken, getOneWalletFromToken } from "../api/token";
import DistributeToken from "../components/hedera/distributeToken";
import DeleteWallet from "../components/hedera/deleteWallet";
import { loadToken } from "../store/tokenSlice";


const TokenDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const admin = useSelector(selectAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const screenW = ScreenSize().width;

  const [tokenHashScan, setTokenHashScan] = useState<TokenDataHash>({
    token_id: "value not found",
    type: "value not found",
    decimals: "value not found",
    supply_type: "value not found",
    initial_supply: "value not found",
    total_supply: "value not found",
    max_supply: "value not found",
    created_timestamp: "value not found",
    symbol: "value not found"
  });
  const [tokenInfos, setTokenInfos] = useState<TokenData | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null | 'deleted'>(null)
  const [walletHashScan, setWalletHashScan] = useState<any>(null)

  useEffect(() => {
    const fetchTokenData = async (tokenId: string) => {
      try {
        const projectResponse = await getOneToken(tokenId);
        if (projectResponse.status === 200) {
          setTokenInfos(projectResponse.content.token);
  
          if (projectResponse.content.token.hashscanLink !== '') {
            const regex = /0\.0\.\d+/;
            const match = projectResponse.content.token.hashscanLink.match(regex);

            if (match) {
              const tokenResponse = await getTokenById(match[0]);
              if(tokenResponse.code){
                console.log("404 data not found!")
              } else {
                setTokenHashScan({
                  token_id: tokenResponse.token_id,
                  type: tokenResponse.type,
                  decimals: tokenResponse.decimals,
                  supply_type: tokenResponse.supply_type,
                  initial_supply: tokenResponse.initial_supply,
                  total_supply: tokenResponse.total_supply,
                  max_supply: tokenResponse.max_supply,
                  created_timestamp: Number(tokenResponse.created_timestamp),
                  symbol: tokenResponse.symbol,
                });
              }
              if(id !== undefined && admin.infos.role === "superAdmin"){
                if(projectResponse.content.token.walletAccountId !== "deleted"){
                  const getWallet = await getOneWalletFromToken(admin.infos, id)
                  if(getWallet.status === 200){
                    setWalletInfo(getWallet.content.walletInfo)
                  }
                } else {
                  setWalletInfo('deleted')
                }
              }
            } else {
              console.log("Pattern not found!");
            }
          }
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Failed to fetch project data", err);
        navigate("/");
      }
    };
  
    if (id) {
      fetchTokenData(id);
    } else {
      navigate("/");
    }
  }, [id, admin.infos, navigate]);

  useEffect(() => {
    const fetchWalletData = async () => {
      if(walletInfo !== "deleted"){
        if (walletInfo !== null && walletInfo.walletAccountId) {
          try {
            const res = await getWalletFromProject(walletInfo.walletAccountId.accountId);
            if (res.code) {
              console.log("404 wallet not found!");
              return;
            }
            try {
              const fromTiny = res.balance.balance / 100000000
              const price = await getHbarPrice(fromTiny);
        
              const adapt = {
                ...res,
                priceInDollar: price,
              };
              setWalletHashScan(adapt);
            } catch (err) {
              console.error("Error fetching HBAR price:", err);
            }
          } catch (err) {
            console.error("Error fetching wallet data:", err);
          }
        }
      }
    };
    
      fetchWalletData();
  }, [walletInfo]);

  const deleteMyToken = () => {
    if(id !== undefined){
      deleteOneToken(admin.infos, id)
      .then((res)=>{
        if(res.status === 200){
          displayTokens()
          .then((tokens) => {
            if(res.status === 200){
              dispatch(loadToken(tokens.content.tokens))
              navigate('/')
            }
          })
        }
      })
      .catch(err=>console.log(err))
    }
  }
  const formatNumberWithCommas = (number: number | string | undefined) => {
    if (number !== undefined) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return number;
  };

  const renderListWithCommas = (items: string[]) => items.join(', ');

  return (
    <section className="projectDetail">
      {screenW < 1025 && (
        <h1>
          {tokenInfos?.tokenName} ({tokenInfos?.tokenSymbol})
        </h1>
      )}

      <div className="description">
        {screenW > 1024 ? (
          <div id="logoTitle">
            {tokenInfos?.imageFileName === "" ? <img src={NoLogo} alt="No logo" /> : <img src={tokenInfos?.imageFileName} alt={`${tokenInfos?.tokenName} logo`} />}
            <h1>
              {tokenInfos?.tokenName} ({tokenInfos?.tokenSymbol})
            </h1>
          </div>
        ) : ( <>
          {tokenInfos !== null && tokenInfos?.imageFileName === "" ? <img src={NoLogo} alt="No logo" /> : <img src={`https://cloud.com/${tokenInfos?.imageFileName}`} alt={`${tokenInfos?.tokenName} logo`} />}
          </>
        )}
        <p><strong>Token use cases:</strong> {tokenInfos?.tokenUseCases}</p>
        <p><strong>Token purpose:</strong> {tokenInfos?.tokenPurpose}</p>
        <p><strong>Initial value:</strong> {tokenInfos?.tokenValue} HBAR</p>
        <p><strong>Country of registration:</strong> {tokenInfos?.registeredCountry}</p>
        <h3>Technologies</h3>
        <ul>
          {tokenInfos?.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>

        <a href={tokenInfos?.pdfFileName} target="_blank" id="pdf">
          Download whitepaper
        </a>
        {admin.infos.role === "superAdmin" && <div className="updateDelete">
          <h3>Super Admin</h3>
          <Link to={`/updateToken/${id}`} >Update token</Link>
          <a href=""
            onClick={(e)=>{
              e.preventDefault()
              deleteMyToken()
            }}
          >Delete token</a>
        </div>}
      </div>

      <div className="hashscan">
  <table>
    <tbody>
      <tr>
        <td>Token ID</td>
        <td>{tokenHashScan.token_id !== "value not found" ? tokenHashScan.token_id : "value not found"}</td>
      </tr>
      <tr>
        <td>Type</td>
        <td>{tokenHashScan.type !== "value not found" ? tokenHashScan.type : "value not found"}</td>
      </tr>
      <tr>
        <td>Decimals</td>
        <td>{tokenHashScan.decimals !== "value not found" ? tokenHashScan.decimals : "value not found"}</td>
      </tr>
      <tr>
        <td>Supply Type</td>
        <td>{tokenHashScan.supply_type !== "value not found" ? tokenHashScan.supply_type : "value not found"}</td>
      </tr>
      <tr>
        <td>Initial Supply</td>
        <td>
          {tokenHashScan.initial_supply !== "value not found" ? 
            `${formatNumberWithCommas(tokenHashScan.initial_supply)} ${tokenHashScan.symbol}` 
            : "value not found"}
        </td>
      </tr>
      <tr>
        <td>Total Supply</td>
        <td>
          {tokenHashScan.total_supply !== "value not found" ? 
            `${formatNumberWithCommas(tokenHashScan.total_supply)} ${tokenHashScan.symbol}` 
            : "value not found"}
        </td>
      </tr>
      <tr>
        <td>Max Supply</td>
        <td>
          {tokenHashScan.max_supply !== "value not found" ? 
            `${formatNumberWithCommas(tokenHashScan.max_supply)} ${tokenHashScan.symbol}` 
            : "value not found"}
        </td>
      </tr>
      <tr>
        <td>Creation Date</td>
        <td>
          {tokenHashScan.created_timestamp !== "value not found" ? 
            moment.unix(Number(tokenHashScan.created_timestamp)).format("DD-MM-YYYY") 
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
          ) : "value not found"}
        </td>
      </tr>
    </tbody>
  </table>
</div>
{(admin.infos.role === "superAdmin" && walletInfo !== null) && 
    <div className="walletSpace">
      {walletInfo !== "deleted" ? <>
          <h2>Wallet nr: {walletInfo.walletAccountId.accountId}</h2>
          {walletHashScan !== null && <>
            {screenW > 768 && <p>EVM address: {walletHashScan.evm_address}</p>}
            <p>Balance: {walletHashScan.balance.balance / 100000000} HBAR</p>
            <p>Value in dollar: {walletHashScan.priceInDollar} $</p>
            <DistributeToken fromAccountId={walletInfo.walletAccountId}/>
            {tokenInfos !== null && <DeleteWallet fromAccountId={walletInfo.walletAccountId} tokenId={tokenInfos._id} auth={admin.infos}/>}
          </>}
          </> : <p>Wallet deleted</p>}
        </div>
        
      }

      {tokenInfos && (
        <div className="projectInfos2">
          <h2>Project informations</h2>

          <article>
            <h3>General informations</h3>
            <p><strong>Project name: </strong>{tokenInfos.projectName}</p>
            <p><strong>Token name: </strong>{tokenInfos.tokenName}</p>
            <p><strong>Token symbol: </strong>{tokenInfos.tokenSymbol}</p>
            <p><strong>Description:</strong> {tokenInfos.projectDescription}</p>
            <p><strong>Official website:</strong> {tokenInfos.projectWebsite ? <a href={tokenInfos.projectWebsite} target="_blank" rel="noopener noreferrer">{tokenInfos.projectWebsite}</a> : "No website"}</p>
          </article>

          <article>
            <h3>Technologies</h3>
            <p><strong>Hedera Technologies Used:</strong> {renderListWithCommas(tokenInfos.technologies)}</p>
            <p><strong>Is the smart contract source code open source?</strong> {tokenInfos.isOpenSource ? "Yes" : "No"} {tokenInfos.isOpenSource && <>, <a href={tokenInfos.repositoryLink} target="_blank" rel="noopener noreferrer">{tokenInfos.repositoryLink}</a></>}</p>
            <p><strong>Is there a security audit of the code?</strong> {tokenInfos.isAudited ? "Yes" : "No"}</p>
          </article>

          <article>
            <h3>Token Features</h3>
            <p><strong>Main purpose of the token:</strong> {tokenInfos.tokenPurpose}</p>
            <p><strong>Token supply:</strong> {formatNumberWithCommas(tokenInfos.tokenSupply)} {tokenInfos.tokenSymbol}</p>
            <p><strong>Token distribution policy:</strong> {tokenInfos.tokenDistribution}</p>
            <p><strong>Token compliance:</strong> {tokenInfos.tokenStandard}</p>
          </article>

          <article>
            <h3>Economics and Business Model</h3>
            <p><strong>Project revenue generation:</strong> {tokenInfos.revenueGeneration}</p>
            <p><strong>Token's main use cases: </strong> {tokenInfos.tokenUseCases}</p>
          </article>

          <article>
            <h3>Legal Aspects</h3>
            <p><strong>Country of registration:</strong> {tokenInfos.registeredCountry}</p>
            <p><strong>Compliance with local and international regulations?</strong> {tokenInfos.compliesWithRegulations ? "Yes" : "No"}</p>
            <p><strong>Obtained legal advice before ICO submission?</strong> {tokenInfos.obtainedLegalAdvice ? "Yes" : "No"}</p>
          </article>

          <article>
            <h3>Marketing and Community</h3>
            <p><strong>Linkedin:</strong> {tokenInfos.linkedin}</p>
            <p><strong>Discord:</strong> {tokenInfos.discord}</p>
            <p><strong>Twitter:</strong> {tokenInfos.twitter}</p>
            <p><strong>Telegram:</strong> {tokenInfos.telegram}</p>
            <p><strong>Instagram:</strong> {tokenInfos.instagram}</p>
          </article>

          <article>
            <h3>Financing</h3>
            <p><strong>Fundraising Target:</strong> {formatNumberWithCommas(tokenInfos.fundraisingTarget)} $</p>
            <p><strong>Minimum investment per participant:</strong> {tokenInfos.minInvestment} $</p>
            <p><strong>Maximum investment per participant:</strong> {tokenInfos.maxInvestment ? `${tokenInfos.maxInvestment} $` : "No limit"}</p>
            <p><strong>Initial value of a token in Hedera HBAR:</strong> {tokenInfos.tokenValue} HBAR</p>
          </article>

          <article>
            <h3>Conclusion</h3>
            <h4>Why do you think your project will succeed?</h4>
            <p>{tokenInfos.successReason}</p>
            <h4>What differentiates your project from others?</h4>
            <p>{tokenInfos.differentiation}</p>
            <p><strong>When will the token be officially launched?</strong> {tokenInfos.launchDate}</p>
          </article>
        </div>
      )}

      

    </section>
  );
};

export default TokenDetail;
