import { useState } from "react";
import Navbar from "../components/Navbar";
import ScreenSize from "../helpers/ScreenSize";
import { submitProject } from "../api/hashthruster";
import GeneralInfo from "../components/form/GeneralInfo";
import TeamInfo from "../components/form/TeamInfo";
import PartnersInfo from "../components/form/PartnersInfo";
import TechnologiesInfo from "../components/form/TechnologiesInfo";
import TokenFeaturesInfo from "../components/form/TokenFeaturesInfo";
import EconomicsAndBusinessInfo from "../components/form/EconomicsAndBusinessInfo";
import LegalAspectsInfo from "../components/form/LegalAspectsInfo";
import MarketingAndCommunityInfo from "../components/form/MarketingAndCommunityInfo";
import RisksAndChallengesInfo from "../components/form/RisksAndChallengesInfo";
import FinancingInfo from "../components/form/FinancingInfo";
import ConclusionInfo from "../components/form/ConclusionInfo";
import ValidationInfo from "../components/form/Validation";
import { SubmitData } from "../types/api-types";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const screenW = ScreenSize().width;
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<SubmitData>({
    projectName: "",
    tokenName: "",
    tokenSymbol: "",
    projectWebsite: "",
    projectDescription: "",
    teamMemberCount: 0,
    teamMembers: [
      { name: "", position: "", linkedin: "" },
      { name: "", position: "", linkedin: "" },
      { name: "", position: "", linkedin: "" }
    ],
    hasPartners: false,
    partnerCount: 0,
    mainPartner: "",
    partnerRole: "",
    technologies: [],
    isOpenSource: false,
    repositoryLink: "",
    isAudited: false,
    auditCompany: "",
    tokenPurpose: "",
    tokenSupply: "",
    tokenDistribution: "",
    tokenStandard: "",
    hashscanLink: "",
    businessModel: false,
    revenueGeneration: "",
    tokenUseCases: "",
    hasRoadMap: false,
    roadMapLink: "",
    registeredCountry: "",
    compliesWithRegulations: false,
    obtainedLegalAdvice: false,
    marketingStrategy: "",
    communicationChannels: [] as string[],
    communityMembers: "",
    risks: "",
    challenges: "",
    fundraisingTarget: 0,
    minInvestment: "",
    maxInvestment: "",
    tokenValue: "",
    successReason: "",
    differentiation: "",
    launchDate: "",
    hasLaunched: false,
    projectLaunchDate: "",
    pdfFileName: "",
    projectEmail: ""
  });

  const [currentForm, setCurrentForm] = useState<
    | "general"
    | "team"
    | "partners"
    | "technologies"
    | "tokenFeatures"
    | "businessModel"
    | "legalAspects"
    | "marketingAndCommunity"
    | "risksAndChallenges"
    | "financing"
    | "conclusion"
    | "validation"
  >("general");

  const navigate = useNavigate()

  const handleInputChange = <K extends keyof SubmitData>(key: K, value: SubmitData[K]) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  
  const validateForm = (): boolean => {
    const requiredFields: (keyof SubmitData)[] = [
      "projectName",
      "tokenName",
      "tokenSymbol",
      "projectDescription",
      "tokenPurpose",
      "tokenSupply",
      "tokenDistribution",
      "tokenStandard",
      "businessModel",
      "revenueGeneration",
      "tokenUseCases",
      "registeredCountry",
      "marketingStrategy",
      "communityMembers",
      "risks",
      "challenges",
      "tokenValue",
      "successReason",
      "differentiation",
      "projectEmail",
    ];
  
    for (const field of requiredFields) {
      const value = formData[field];
      if (typeof value === 'string' && value.trim() === "") {
        setError(`Some fields are required and cannot be empty. Please verify and retry!`);
        return false;
      }
    }
    return true;
  };
  
  const handleSubmit = async () => {
    setError(null)
    if (!validateForm()) return;
    if(formData.projectEmail !== ""){
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      if(regexEmail.test(formData.projectEmail)) {
        submitProject(formData)
        .then((res)=>{
          if(res.status === 200){
            navigate('/successProject')
          } else {
            setError("Oups an error occured, please try later!")
          }
        })
        .catch(err=>console.log(err))
      } else {
        setError("Please enter a valid email address")
      }
    } else {
      setError("Please enter a valid email address")
    }
  };

  return (
    <div className="form">
      {screenW < 1025 && <Navbar />}
      <h1>Submit your project</h1>
      {error !== null && <p className="error">{error}</p>}
      <nav className="formNav">
        <a
          href=""
          className={currentForm === "general" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("general");
          }}
        >
          General information
        </a>
        <a
          href=""
          className={currentForm === "team" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("team");
          }}
        >
          Team information
        </a>
        <a
          href=""
          className={currentForm === "partners" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("partners");
          }}
        >
          Partners information
        </a>
        <a
          href=""
          className={currentForm === "technologies" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("technologies");
          }}
        >
          Technologies
        </a>
        <a
          href=""
          className={currentForm === "tokenFeatures" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("tokenFeatures");
          }}
        >
          Token Features
        </a>
        <a
          href=""
          className={currentForm === "businessModel" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("businessModel");
          }}
        >
          Economics and Business
        </a>
        <a
          href=""
          className={currentForm === "legalAspects" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("legalAspects");
          }}
        >
          Legal Aspects
        </a>
        <a
          href=""
          className={currentForm === "marketingAndCommunity" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("marketingAndCommunity");
          }}
        >
          Marketing and Community
        </a>
        <a
          href=""
          className={currentForm === "risksAndChallenges" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("risksAndChallenges");
          }}
        >
          Risks and Challenges
        </a>
        <a
          href=""
          className={currentForm === "financing" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("financing");
          }}
        >
          Financing
        </a>
        <a
          href=""
          className={currentForm === "conclusion" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("conclusion");
          }}
        >
          Conclusion
        </a>
        <a
          href=""
          className={currentForm === "validation" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setCurrentForm("validation");
          }}
        >
          Validation
        </a>
      </nav>
      {currentForm === "general" && (
        <GeneralInfo
          formData={formData}
          changeProjectName={(txt) => handleInputChange("projectName", txt)}
          changeTokenName={(txt) => handleInputChange("tokenName", txt)}
          changeTokenSymbol={(txt) => handleInputChange("tokenSymbol", txt)}
          changeProjectWebsite={(txt) =>
            handleInputChange("projectWebsite", txt)
          }
          changeProjectDescription={(txt) =>
            handleInputChange("projectDescription", txt)
          }
          nextForm={() => setCurrentForm("team")}
        />
      )}
      {currentForm === "team" && (
        <TeamInfo
          formData={formData}
          changeTeamNumber={(num) => handleInputChange("teamMemberCount", num)}
          changeTeamMembers={(members) =>
            handleInputChange("teamMembers", members)
          }
          nextForm={() => setCurrentForm("partners")}
          prevForm={()=> setCurrentForm("general")}
        />
      )}
      {currentForm === "partners" && (
        <PartnersInfo
          formData={formData}
          changeHasPartners={(hasPartners) =>
            handleInputChange("hasPartners", hasPartners)
          }
          changePartnerDetails={(details) => {
            handleInputChange("partnerCount", details.count)
            handleInputChange("mainPartner", details.mainPartner)
            handleInputChange("partnerRole", details.role)
          }}
          nextForm={() => setCurrentForm("technologies")}
          prevForm={()=> setCurrentForm("team")}
        />
      )}
      {currentForm === "technologies" && (
        <TechnologiesInfo
          formData={formData}
          changeTechnologies={(techs) =>
            handleInputChange("technologies", techs)
          }
          changeIsOpenSource={(isOpenSource) =>
            handleInputChange("isOpenSource", isOpenSource)
          }
          changeRepositoryLink={(link) =>
            handleInputChange("repositoryLink", link)
          }
          changeIsAudited={(isAudited) =>
            handleInputChange("isAudited", isAudited)
          }
          changeAuditCompany={(company) =>
            handleInputChange("auditCompany", company)
          }
          nextForm={() => setCurrentForm("tokenFeatures")}
          prevForm={()=> setCurrentForm("partners")}
        />
      )}
      {currentForm === "tokenFeatures" && (
        <TokenFeaturesInfo
          formData={formData}
          changeTokenPurpose={(purpose) =>
            handleInputChange("tokenPurpose", purpose)
          }
          changeTokenSupply={(supply) =>
            handleInputChange("tokenSupply", supply)
          }
          changeTokenDistribution={(distribution) =>
            handleInputChange("tokenDistribution", distribution)
          }
          changeTokenStandard={(standard) =>
            handleInputChange("tokenStandard", standard)
          }
          changeHashscanLink={(link) => {
            handleInputChange("hashscanLink", link);
          }}
          nextForm={() => setCurrentForm("businessModel")}
          prevForm={()=> setCurrentForm("technologies")}
        />
      )}
      {currentForm === "businessModel" && (
        <EconomicsAndBusinessInfo
          formData={formData}
          changeBusinessModel={(model) =>
            handleInputChange("businessModel", model)
          }
          changeRevenueGeneration={(revenue) =>
            handleInputChange("revenueGeneration", revenue)
          }
          changeTokenUseCases={(useCases) =>
            handleInputChange("tokenUseCases", useCases)
          }
          changeHasRoadMap={(hasRoadMap) =>
            handleInputChange("hasRoadMap", hasRoadMap)
          }
          changeRoadMapLink={(link) => handleInputChange("roadMapLink", link)}
          nextForm={() => setCurrentForm("legalAspects")}
          prevForm={()=> setCurrentForm("tokenFeatures")}
        />
      )}
      {currentForm === "legalAspects" && (
        <LegalAspectsInfo
          formData={formData}
          changeCountry={(country) =>
            handleInputChange("registeredCountry", country)
          }
          changeCompliance={(compliance) =>
            handleInputChange("compliesWithRegulations", compliance)
          }
          changeLegalAdvice={(legalAdvice) =>
            handleInputChange("obtainedLegalAdvice", legalAdvice)
          }
          nextForm={() => setCurrentForm("marketingAndCommunity")}
          prevForm={()=> setCurrentForm("businessModel")}
        />
      )}
      {currentForm === "marketingAndCommunity" && (
        <MarketingAndCommunityInfo
          formData={formData}
          changeMarketingStrategy={(strategy) =>
            handleInputChange("marketingStrategy", strategy)
          }
          changeCommunicationChannels={(channels) =>
            handleInputChange("communicationChannels", channels)
          }
          changeCommunityMembers={(members) =>
            handleInputChange("communityMembers", members)
          }
          nextForm={() => setCurrentForm("risksAndChallenges")}
          prevForm={()=> setCurrentForm("legalAspects")}
        />
      )}
      {currentForm === "risksAndChallenges" && (
        <RisksAndChallengesInfo
          formData={formData}
          changeRisks={(risks) => handleInputChange("risks", risks)}
          changeChallenges={(challenges) =>
            handleInputChange("challenges", challenges)
          }
          nextForm={() => setCurrentForm("financing")}
          prevForm={()=> setCurrentForm("marketingAndCommunity")}
        />
      )}
      {currentForm === "financing" && (
        <FinancingInfo
          formData={formData}
          changeFundraisingTarget={(target) =>
            handleInputChange("fundraisingTarget", parseFloat(target))
          }
          changeMinInvestment={(minInvestment) =>
            handleInputChange("minInvestment", minInvestment)
          }
          changeMaxInvestment={(maxInvestment) =>
            handleInputChange("maxInvestment", maxInvestment)
          }
          changeTokenValue={(tokenValue) =>
            handleInputChange("tokenValue", tokenValue)
          }
          nextForm={() => setCurrentForm("conclusion")}
          prevForm={()=> setCurrentForm("risksAndChallenges")}
        />
      )}
      {currentForm === "conclusion" && (
        <ConclusionInfo
          formData={formData}
          changeSuccessReason={(reason) =>
            handleInputChange("successReason", reason)
          }
          changeDifferentiation={(differentiation) =>
            handleInputChange("differentiation", differentiation)
          }
          changeLaunchDate={(date) => handleInputChange("launchDate", date)}
          changeHasLaunched={(hasLaunched) =>
            handleInputChange("hasLaunched", hasLaunched)
          }
          changeProjectLaunchDate={(date) =>
            handleInputChange("projectLaunchDate", date)
          }
          nextForm={() => setCurrentForm("validation")}
          prevForm={()=> setCurrentForm("financing")}
        />
      )}
      {currentForm === "validation" && (
        <ValidationInfo
          formData={formData}
          handleSubmitForm={handleSubmit}
          //@ts-ignore
          changePdfFile={(filename) => handleInputChange("pdfFileName", filename)}
          changeProjectEmail={(email) => handleInputChange("projectEmail", email)}
          prevForm={()=> setCurrentForm("conclusion")}
        />
      )}
    </div>
  );
};

export default Form;
