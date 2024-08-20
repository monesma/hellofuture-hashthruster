import NoLogo from "../assets/images/no-logo.png";
const Ico = ({
  token,
  onClickOpen,
}: {
  token: any;
  onClickOpen: () => void;
}) => {
  return (
    <div className="ico">
      <h2>
        {token.tokenName} ({token.tokenSymbol})
      </h2>
      <div className="ico-container">
        {token.imageFileName === "" ? <img src={NoLogo} alt="no logo" /> : <img src={token.imageFileName} alt={`${token.tokenName} logo`} />}
      </div>
      <p>{token.projectDescription.substr(0, 100)}...</p>
      <a href={`/project/${token._id}`}>see more</a>
      <h3>focus of interest</h3>
      <ul>
        {token.technologies.map((o: string, index: number) => {
          return <li key={index}>{o}</li>;
        })}
      </ul>
      <a href="#" onClick={onClickOpen}>
        Invest
      </a>
    </div>
  );
};

export default Ico;
