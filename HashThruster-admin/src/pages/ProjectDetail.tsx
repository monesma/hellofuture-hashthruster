import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTokenById } from "../api/hedera";
import ScreenSize from "../helpers/ScreenSize";
import Logo from "../assets/images/hedera-hbar-logo.svg";
import moment from "moment";
import { displayProjects, getOneProject, updateProjectStatus } from "../api/project";
import { selectAdmin } from "../store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../types/project.types";
import { loadProject } from "../store/projectSlice";
import { TokenDataHash } from "../types/token.types";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [projectInfos, setProjectInfos] = useState<Project | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async (projectId: string) => {
      try {
        const projectResponse = await getOneProject(admin.infos, projectId);
        if (projectResponse.status === 200) {
          const project = projectResponse.content.project;
          setProjectInfos(project);
    
          setPdfUrl(project.pdfFileName);

          const regex = /0\.0\.\d+/;
          const match = project.hashscanLink.match(regex);

          if (match) {
            const tokenResponse = await getTokenById(match[0]);
            if(tokenResponse.code){
              console.log("404 data not found");
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
          } else {
            console.log("Pattern not found");
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
      fetchProjectData(id);
    } else {
      navigate("/");
    }
  }, [id, admin.infos, navigate]);

  const handleViewPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      console.error("PDF URL not found.");
    }
  };
  
  const formatNumberWithCommas = (number: number | string | undefined) => {
    if (number !== undefined) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return number;
  };

  const renderListWithCommas = (items: string[]) => items.join(', ');

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.currentTarget.value;

    const result = {
      ...admin.infos,
      status: newStatus
    };

    if (id !== undefined) {
      try {
        const res = await updateProjectStatus(result, id);
        if (res.status === 200) {
          const updatedProjects = await displayProjects(admin.infos);
          dispatch(loadProject(updatedProjects.content.projects));

          // Mettre à jour localement le statut du projet
          setProjectInfos(prevState => {
            if (prevState) {
              return { ...prevState, status: newStatus };
            }
            return prevState;
          });
        }
      } catch (err) {
        console.error("Failed to update project status", err);
      }
    }
  };

  return (
    <section className="projectDetail">
      {screenW < 1025 && (
        <h1>
          {projectInfos?.tokenName} ({projectInfos?.tokenSymbol})
        </h1>
      )}

      <div className="description">
        {screenW > 1024 ? (
          <div id="logoTitle">
            <img src={Logo} alt="Hedera HBAR logo" />
            <h1>
              {projectInfos?.tokenName} ({projectInfos?.tokenSymbol})
            </h1>
          </div>
        ) : (
          <img src={Logo} alt={`${projectInfos?.projectName} logo`} />
        )}
        <p><strong>Token use cases:</strong> {projectInfos?.tokenUseCases}</p>
        <p><strong>Token purpose:</strong> {projectInfos?.tokenPurpose}</p>
        <p><strong>Initial value:</strong> {projectInfos?.tokenValue} HBAR</p>
        <p><strong>Country of registration:</strong> {projectInfos?.registeredCountry}</p>
        <h3>Technologies</h3>
        <ul>
          {projectInfos?.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>

        <button onClick={handleViewPdf} id="pdf">
          View {projectInfos?.projectName} pitch
        </button>
        {admin.infos.role === "superAdmin" && (
          <div className="updateDelete">
          <h3>Super Admin</h3>
          <div className="selectWrapper">
            <select
              value={projectInfos?.status}
              onChange={handleStatusChange}
              name="status"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="listed">Listed</option>
            </select>
          </div>
        </div>
        )}
      </div>

      {tokenHashScan && (
            <div className="hashscan">
              {screenW < 1024 && <h2>Hashscan</h2>}
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
          )}

      {projectInfos && (
        <div className="projectInfos2">
          <h2>Project informations</h2>
          <article>
            <h3>Project</h3>
            <p><strong>Name:</strong> {projectInfos.projectName}</p>
            <p><strong>Description:</strong> {projectInfos.projectDescription}</p>
            <p><strong>Official website:</strong> {projectInfos.projectWebsite ? <a href={projectInfos.projectWebsite} target="_blank" rel="noopener noreferrer">{projectInfos.projectWebsite}</a> : "No website"}</p>
          </article>

          <article>
            <h3>Team</h3>
            <p><strong>Team size:</strong> {projectInfos.teamMemberCount} members</p>
            <h4>Name and position of key team members:</h4>
            <ul>
              {projectInfos.teamMembers.map((member, index) => (
                <li key={index}>
                  {member.name}, {member.position}
                  &nbsp; <a href={member.linkedin} target="_blank" rel="noopener noreferrer">{member.name} linkedin</a>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h3>Partners</h3>
            <p><strong>Has partners:</strong> {projectInfos.hasPartners ? "Yes" : "No"}</p>
            {projectInfos.hasPartners && (
              <>
                <p><strong>Main partner:</strong> {projectInfos.mainPartner}</p>
                <p><strong>Role:</strong> {projectInfos.partnerRole}</p>
              </>
            )}
          </article>

          <article>
            <h3>Technologies</h3>
            <p><strong>Hedera Technologies Used:</strong> {renderListWithCommas(projectInfos.technologies)}</p>
            <p><strong>Is the smart contract source code open source?</strong> {projectInfos.isOpenSource ? "Yes" : "No"} {projectInfos.isOpenSource && <>, <a href={projectInfos.repositoryLink} target="_blank" rel="noopener noreferrer">watch repository</a></>}</p>
            <p><strong>Is there a security audit of the code?</strong> {projectInfos.isAudited ? "Yes" : "No"}</p>
          </article>

          <article>
            <h3>Token Features</h3>
            <p><strong>Main purpose of the token:</strong> {projectInfos.tokenPurpose}</p>
            <p><strong>Token supply:</strong> {formatNumberWithCommas(projectInfos.tokenSupply)} {projectInfos.tokenSymbol}</p>
            <p><strong>Token distribution policy:</strong> {projectInfos.tokenDistribution}</p>
            <p><strong>Token compliance:</strong> {projectInfos.tokenStandard}</p>
          </article>

          <article>
            <h3>Economics and Business Model</h3>
            <p><strong>Have a business model for the project?</strong> {projectInfos.businessModel ? "Yes" : "No"}</p>
            <p><strong>Project revenue generation:</strong> {projectInfos.revenueGeneration}</p>
            <p><strong>Token's main use cases: </strong> {projectInfos.tokenUseCases}</p>
          </article>

          <article>
            <h3>Legal Aspects</h3>
            <p><strong>Country of registration:</strong> {projectInfos.registeredCountry}</p>
            <p><strong>Compliance with local and international regulations?</strong> {projectInfos.compliesWithRegulations ? "Yes" : "No"}</p>
            <p><strong>Obtained legal advice before ICO submission?</strong> {projectInfos.obtainedLegalAdvice ? "Yes" : "No"}</p>
          </article>

          <article>
            <h3>Marketing and Community</h3>
            <p><strong>Marketing strategy:</strong> {projectInfos.marketingStrategy}</p>
            <p><strong>Main communications channels:</strong> {renderListWithCommas(projectInfos.communicationChannels)}</p>
            <p><strong>Community size:</strong> {formatNumberWithCommas(projectInfos.communityMembers)} members</p>
          </article>

          <article>
            <h3>Risks and Challenges</h3>
            <p><strong>Main risks:</strong> {projectInfos.risks}</p>
            <p><strong>Challenges:</strong> {projectInfos.challenges}</p>
          </article>

          <article>
            <h3>Financing</h3>
            <p><strong>Fundraising Target:</strong> {formatNumberWithCommas(projectInfos.fundraisingTarget)} $</p>
            <p><strong>Minimum investment per participant:</strong> {projectInfos.minInvestment} $</p>
            <p><strong>Maximum investment per participant:</strong> {projectInfos.maxInvestment ? `${projectInfos.maxInvestment} $` : "No limit"}</p>
            <p><strong>Initial value of a token in Hedera HBAR:</strong> {projectInfos.tokenValue} HBAR</p>
          </article>

          <article>
            <h3>Conclusion</h3>
            <h4>Why do you think your project will succeed?</h4>
            <p>{projectInfos.successReason}</p>
            <h4>What differentiates your project from others?</h4>
            <p>{projectInfos.differentiation}</p>
            <p><strong>When will the token be officially launched?</strong> {projectInfos.launchDate}</p>
            <p><strong>Has the project already been launched?</strong> {projectInfos.hasLaunched ? "Yes" : "No"}</p>
            {projectInfos.hasLaunched && <p><strong>Project launch date:</strong> {projectInfos.projectLaunchDate}</p>}
          </article>
        </div>
      )}
    </section>
  );
};

export default ProjectDetail;
