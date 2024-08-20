import { TokenData } from '../types/token.types'
import NoLogo from "../assets/images/no-logo.png"
const TokenCard = ({token}:{token: TokenData}) => {
  return (
    <div className="info">
        <h3>{token.tokenName} ({token.tokenSymbol})</h3>
        <div className="info-container">
          {token.imageFileName !== "" ? <img src={token.imageFileName} alt={`${token.imageFileName} logo`}/> : <img src={NoLogo} alt={`no logo`}/>}
        </div>
        {token.projectWebsite !== "" ? <a  id="website"href={token.projectWebsite}>Official website</a> : <p>No website</p>}
        <p>Value: {token.tokenValue} HBAR</p>
        <p>Total Supply {token.tokenSupply}</p>
        <p>Foundraising target: {token.fundraisingTarget} $</p>
        <p>Token launch Date: {token.launchDate}</p>
        <a href={`/token/${token._id}`}>see more</a>
    </div>
  )
}

export default TokenCard