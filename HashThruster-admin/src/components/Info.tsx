import Logo from "../assets/images/hedera-hbar-logo.svg"

const Info = ({project} : {project: any}) => {

  return (
    <div className="info">
        <h3>{project.projectName}</h3>
        <div className="info-container">
          <img src={Logo} alt={`${project.tokenNamename} logo`}/>
        </div>
        {project.projectWebsite !== "" ? <a  id="website" href={project.projectWebsite}>Official website</a> : <p>No website</p>}
        {project.hasLaunched ? <p>Project launched since: {project.projectLaunchDate !== "" ? project.projectLaunchDate :  "no date"}</p> : <p>Project not launched</p>}
        <h3>Token informations</h3>
        <p>Name and symbol: {project.tokenName} ({project.tokenSymbol})</p>
        <p>Value: {project.tokenValue} HBAR</p>
        <p>Foundraising target: {project.fundraisingTarget} $</p>
        <p>Token launch Date: {project.launchDate}</p>
        <a href={`/project/${project._id}`}>see more</a>
    </div>
  )
}

export default Info