import { useState, useEffect } from "react";
import Info from "../components/Info";
import { useSelector } from "react-redux";
import { selectProject } from "../store/projectSlice";
import { Project } from "../types/project.types";
import { selectToken } from "../store/tokenSlice";
import { TokenData } from "../types/token.types";
import TokenCard from "../components/TokenCard";

const Home: React.FC = () => {
  const project = useSelector(selectProject);
  const tokens = useSelector(selectToken);
  const [newTokens, setNewTokens] = useState<boolean>(true);
  const [refused, setRefused] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [listed, setListed] = useState<boolean>(false);

  const [projectPending, setProjectPending] = useState<Project[]>([]);
  const [projectRefused, setProjectRefused] = useState<Project[]>([]);
  const [projectAccepted, setProjectAccepted] = useState<Project[]>([]);
  const [projectListed, setProjectListed] = useState<Project[]>([]);

  useEffect(() => {
    const pending: Project[] = [];
    const refused: Project[] = [];
    const accepted: Project[] = [];
    const listed: Project[] = [];

    project.allProjects.forEach((proj: Project) => {
      switch (proj.status) {
        case "pending":
          pending.push(proj);
          break;
        case "rejected":
          refused.push(proj);
          break;
        case "approved":
          accepted.push(proj);
          break;
        case "listed":
          listed.push(proj);
          break;
        default:
          break;
      }
    });

    setProjectPending(pending);
    setProjectRefused(refused);
    setProjectAccepted(accepted);
    setProjectListed(listed);
  }, [project]);

  return (
    <div className="home">
      <h1>Administration</h1>
      <nav>
        <a
          href="#"
          className={newTokens ? "active" : ""}
          onClick={() => {
            setNewTokens(true);
            setRefused(false);
            setAccepted(false);
            setListed(false);
          }}
        >
          Submitted
        </a>
        <a
          href="#"
          className={refused ? "active" : ""}
          onClick={() => {
            setNewTokens(false);
            setRefused(true);
            setAccepted(false);
            setListed(false);
          }}
        >
          Refused
        </a>
        <a
          href="#"
          className={accepted ? "active" : ""}
          onClick={() => {
            setNewTokens(false);
            setRefused(false);
            setAccepted(true);
            setListed(false);
          }}
        >
          Accepted
        </a>
        <a
          href="#"
          className={listed ? "active" : ""}
          onClick={() => {
            setNewTokens(false);
            setRefused(false);
            setAccepted(false);
            setListed(true);
          }}
        >
          Listed
        </a>
      </nav>
      {newTokens && (
        <div className="list">
          <h2>New Projects</h2>
          {projectPending.length > 0 ? (
            projectPending.map((project) => (
              <Info key={project._id} project={project} />
            ))
          ) : (
            <p className="nothing">No projects at the moment</p>
          )}
        </div>
      )}
      {refused && (
        <div className="list">
          <h2>Refused Projects</h2>
          {projectRefused.length > 0 ? (
            projectRefused.map((project) => (
              <Info key={project._id} project={project} />
            ))
          ) : (
            <p className="nothing">No projects at the moment</p>
          )}
        </div>
      )}
      {accepted && (
        <div className="list">
          <h2>Accepted Projects</h2>
          {projectAccepted.length > 0 ? (
            projectAccepted.map((project) => (
              <Info key={project._id} project={project} />
            ))
          ) : (
            <p className="nothing">No projects at the moment</p>
          )}
        </div>
      )}
      {listed && (
        <section className="list">
          <h2>Listed Projects</h2>
          {projectListed.length > 0 ? (
            projectListed.map((project) => (
              <Info key={project._id} project={project} />
            ))
          ) : (
            <p className="nothing">No projects at the moment</p>
          )}
        </section>
      )}
      <section className="list">
        <h2>Listed tokens</h2>
        {tokens.allTokens.length > 0 ? (
          <>
            {tokens.allTokens.map((token: TokenData) => {
              return <TokenCard key={token._id} token={token} />;
            })}
          </>
        ) : (
          <p className="nothing">No tokens for the moment</p>
        )}
      </section>
    </div>
  );
};

export default Home;
