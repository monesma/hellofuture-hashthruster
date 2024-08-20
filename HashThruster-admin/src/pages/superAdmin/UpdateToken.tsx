import { useEffect, useState } from "react";
import { displayTokens, updateOneToken } from "../../api/token";
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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin } from "../../store/adminSlice";
import { loadToken, selectToken } from "../../store/tokenSlice";

const UpdateToken = () => {
  const { id } = useParams<{ id: string }>();
  const admin = useSelector(selectAdmin)
  const token = useSelector(selectToken)
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
    if(id !== undefined){
      updateOneToken(formData, id)
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
    }
  };
  
  useEffect(() => {
    if (id !== undefined && token.allTokens.length > 0) {
      const index = token.allTokens.findIndex((t: any) => t._id === id);
      if (index !== -1) {
        // Mise à jour du formData avec les données du token trouvé
        const tokenData = token.allTokens[index];
        setFormData({
          projectName: tokenData.projectName || "",
          tokenName: tokenData.tokenName || "",
          tokenSymbol: tokenData.tokenSymbol || "",
          projectWebsite: tokenData.projectWebsite || "",
          projectDescription: tokenData.projectDescription || "",
          technologies: tokenData.technologies || [],
          isOpenSource: tokenData.isOpenSource || false,
          repositoryLink: tokenData.repositoryLink || "",
          isAudited: tokenData.isAudited || false,
          tokenPurpose: tokenData.tokenPurpose || "",
          tokenSupply: tokenData.tokenSupply || "",
          tokenDistribution: tokenData.tokenDistribution || "",
          tokenStandard: tokenData.tokenStandard || "",
          hashscanLink: tokenData.hashscanLink || "",
          revenueGeneration: tokenData.revenueGeneration || "",
          tokenUseCases: tokenData.tokenUseCases || "",
          registeredCountry: tokenData.registeredCountry || "",
          compliesWithRegulations: tokenData.compliesWithRegulations || false,
          obtainedLegalAdvice: tokenData.obtainedLegalAdvice || false,
          fundraisingTarget: tokenData.fundraisingTarget || 0,
          minInvestment: tokenData.minInvestment || "",
          maxInvestment: tokenData.maxInvestment || "",
          tokenValue: tokenData.tokenValue || "",
          successReason: tokenData.successReason || "",
          differentiation: tokenData.differentiation || "",
          launchDate: tokenData.launchDate || "",
          linkedin: tokenData.linkedin || "",
          discord: tokenData.discord || "",
          telegram: tokenData.telegram || "",
          twitter: tokenData.twitter || "",
          instagram: tokenData.instagram || "",
          pdfFileName: tokenData.pdfFileName || "",
          imageFileName: tokenData.imageFileName || "",
          ...admin.infos
        });
      }
    }
  }, [id, token.allTokens]);
  
  return (
    <div className="form">
      <h1>Update token</h1>
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
          dataMode="edit"
          handleSubmitForm={handleSubmit}
          changePdfFile={(file) => handleInputChange("pdfFileName", file)}
          changeImgFile={(imageFileName) => handleInputChange("imageFileName", imageFileName)}
          prevForm={()=> setCurrentForm("conclusion")}
        />
      )}
    </div>
  );
};

export default UpdateToken;
