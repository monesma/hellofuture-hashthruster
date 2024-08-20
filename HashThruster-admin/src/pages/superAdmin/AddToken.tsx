import { useState } from "react";
import { addOneToken, displayTokens } from "../../api/token";
import GeneralInfo from "../../components/form/GeneralInfo";
import TechnologiesInfo from "../../components/form/TechnologiesInfo";
import TokenFeaturesInfo from "../../components/form/TokenFeaturesInfo";
import EconomicsAndBusinessInfo from "../../components/form/EconomicsAndBusinessInfo";
import LegalAspectsInfo from "../../components/form/LegalAspectsInfo";
import MarketingAndCommunityInfo from "../../components/form/MarketingAndCommunityInfo";
import FinancingInfo from "../../components/form/FinancingInfo";
import ConclusionInfo from "../../components/form/ConclusionInfo";
import ValidationInfo from "../../components/form/Validation";
import { SubmitData } from "../../types/token.types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin } from "../../store/adminSlice";
import { loadToken } from "../../store/tokenSlice";

const AddToken = () => {
  const admin = useSelector(selectAdmin)
  const dispatch = useDispatch()
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<SubmitData>({
    projectName: "",
    tokenName: "",
    tokenSymbol: "",
    projectWebsite: "",
    projectDescription: "",
    technologies: [],
    isOpenSource: false,
    repositoryLink: "",
    isAudited: false,
    tokenPurpose: "",
    tokenSupply: "",
    tokenDistribution: "",
    tokenStandard: "",
    hashscanLink: "",
    revenueGeneration: "",
    tokenUseCases: "",
    registeredCountry: "",
    compliesWithRegulations: false,
    obtainedLegalAdvice: false,
    fundraisingTarget: 0,
    minInvestment: "",
    maxInvestment: "",
    tokenValue: "",
    successReason: "",
    differentiation: "",
    launchDate: "",
    linkedin: "",
    discord: "",
    telegram: "",
    twitter: "",
    instagram: "",
    pdfFileName: "",
    imageFileName: "",
    walletAccountId: {
      accountId: "",
      private_key: "",
      public_key: ""
    },
    ...admin.infos
  });

  const [currentForm, setCurrentForm] = useState<
    | "general"
    | "technologies"
    | "tokenFeatures"
    | "businessModel"
    | "legalAspects"
    | "marketingAndCommunity"
    | "financing"
    | "conclusion"
    | "validation"
  >("general");

  const navigate = useNavigate()

  const handleInputChange = (key: string, value: any) => {
    setFormData((prevState: any) => ({
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
      "revenueGeneration",
      "tokenUseCases",
      "registeredCountry",
      "tokenValue",
      "successReason",
      "differentiation"
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
    if (!validateForm()) return;
    addOneToken(formData)
    .then((res)=>{
      if(res.status === 200){
        displayTokens()
        .then((tokens) => {
          dispatch(loadToken(tokens.content.tokens))
          navigate("/")
        })
        .catch(err=>console.log(err))
      }
    })
    .catch(err=>console.log(err))
  };

  return (
    <div className="form">
      <h1>Add new token</h1>
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
          nextForm={() => setCurrentForm("technologies")}
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
          nextForm={() => setCurrentForm("tokenFeatures")}
          prevForm={()=> setCurrentForm("general")}
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
          changeRevenueGeneration={(revenue) =>
            handleInputChange("revenueGeneration", revenue)
          }
          changeTokenUseCases={(useCases) =>
            handleInputChange("tokenUseCases", useCases)
          }
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
          changeLinkedin={(linkedin) =>
            handleInputChange("linkedin", linkedin)
          }
          changeDiscord={(discord) =>
            handleInputChange("discord", discord)
          }
          changeTelegram={(telegram) =>
            handleInputChange("telegram", telegram)
          }
          changeTwitter={(twitter) =>
            handleInputChange("twitter", twitter)
          }
          changeInstagram={(instagram) =>
            handleInputChange("instagram", instagram)
          }
          nextForm={() => setCurrentForm("financing")}
          prevForm={()=> setCurrentForm("legalAspects")}
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
          prevForm={()=> setCurrentForm("marketingAndCommunity")}
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
          nextForm={() => setCurrentForm("validation")}
          prevForm={()=> setCurrentForm("financing")}
        />
      )}
      {currentForm === "validation" && (
        <ValidationInfo
          dataMode="add"
          handleSubmitForm={handleSubmit}
          changePdfFile={(file) => handleInputChange("pdfFileName", file)}
          changeImgFile={(imageFileName) => handleInputChange("imageFileName", imageFileName)}
          changeAccountId={(accountId) => {
            handleInputChange("walletAccountId", accountId)
          }}
          prevForm={()=> setCurrentForm("conclusion")}
        />
      )}
    </div>
  );
};

export default AddToken;
