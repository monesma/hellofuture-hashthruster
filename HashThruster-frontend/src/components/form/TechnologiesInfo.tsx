import { useState, ChangeEvent, useEffect } from "react";
import { SubmitData } from "../../types/api-types";

const TechnologiesInfo = ({
  formData,
  changeTechnologies,
  changeIsOpenSource,
  changeRepositoryLink,
  changeIsAudited,
  changeAuditCompany,
  nextForm,
  prevForm
}: {
  formData: SubmitData
  changeTechnologies: (technologies: string[]) => void;
  changeIsOpenSource: (isOpenSource: boolean) => void;
  changeRepositoryLink: (link: string) => void;
  changeIsAudited: (isAudited: boolean) => void;
  changeAuditCompany: (company: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [technologies, setTechnologies] = useState<string>("");
  const [isOpenSource, setIsOpenSource] = useState<boolean>(false);
  const [repositoryLink, setRepositoryLink] = useState<string>("");
  const [isAudited, setIsAudited] = useState<boolean>(false);
  const [auditCompany, setAuditCompany] = useState<string>("");

  const handleTechnologiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTechnologies(value);
    changeTechnologies(value.split(",").map((tech) => tech.trim()));
  };

  const handleOpenSourceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value === "yes";
    setIsOpenSource(value);
    changeIsOpenSource(value);
    if (!value) {
      setRepositoryLink("");
      changeRepositoryLink("");
    }
  };

  const handleRepositoryLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.currentTarget.value;
    setRepositoryLink(link);
    changeRepositoryLink(link);
  };

  const handleAuditedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value === "yes";
    setIsAudited(value);
    changeIsAudited(value);
    if (!value) {
      setAuditCompany("");
      changeAuditCompany("");
    }
  };

  const handleAuditCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const company = e.currentTarget.value;
    setAuditCompany(company);
    changeAuditCompany(company);
  };

  useEffect(()=>{
    let words = formData.technologies;
    let chain = words.join(", ");
    setTechnologies(chain)
    setIsOpenSource(formData.isOpenSource)
    setRepositoryLink(formData.repositoryLink)
    setIsAudited(formData.isAudited)
    setAuditCompany(formData.auditCompany)
  }, [])
  return (
    <form id="technologies">
      <label htmlFor="techno">
        What Hedera technologies are used in your project?
      </label>
      <input
        id="techno"
        type="text"
        value={technologies}
        onChange={handleTechnologiesChange}
        placeholder="e.g., Hedera Token Service, Hedera Consensus Service"
      />

      <label htmlFor="openSource">
        Is the smart contract source code open source?
      </label>
      <div id="openSource">
        <label>
          <input
            type="radio"
            name="open-source"
            value="yes"
            checked={isOpenSource}
            onChange={handleOpenSourceChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="open-source"
            value="no"
            checked={!isOpenSource}
            onChange={handleOpenSourceChange}
          />
          No
        </label>
      </div>

      {isOpenSource && (
        <div id="git">
          <label htmlFor="gitLink">Link to repository: </label>
          <input
            id="gitLink"
            type="text"
            value={repositoryLink}
            onChange={handleRepositoryLinkChange}
            placeholder="e.g., https://github.com/your-repo"
          />
        </div>
      )}

      <label htmlFor="auditCode">Is there a security audit of the code?</label>
      <div id="auditCode">
        <label>
          <input
            type="radio"
            name="security-audit"
            value="yes"
            checked={isAudited}
            onChange={handleAuditedChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="security-audit"
            value="no"
            checked={!isAudited}
            onChange={handleAuditedChange}
          />
          No
        </label>
      </div>

      {isAudited && (
        <div>
          <label htmlFor="companyLink">By which company? </label>
          <input
            id="companyLink"
            type="text"
            value={auditCompany}
            onChange={handleAuditCompanyChange}
            placeholder="e.g., Security Audits Inc."
          />
        </div>
      )}
      <div className="valid">
        <input type="submit" value="Previous" onClick={(e) => {
          e.preventDefault();
          prevForm();
        }} />
        <input type="submit" value="Next" onClick={(e) => {
          e.preventDefault();
          nextForm();
        }} />
      </div>
    </form>
  );
};

export default TechnologiesInfo;
