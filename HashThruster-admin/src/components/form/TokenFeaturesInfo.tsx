import { useState, ChangeEvent, useEffect } from "react";
import { SubmitData } from "../../types/token.types";

const TokenFeaturesInfo = ({
  formData,
  changeTokenPurpose,
  changeTokenSupply,
  changeTokenDistribution,
  changeTokenStandard,
  changeHashscanLink,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeTokenPurpose: (purpose: string) => void;
  changeTokenSupply: (supply: string) => void;
  changeTokenDistribution: (distribution: string) => void;
  changeTokenStandard: (standard: string) => void;
  changeHashscanLink: (link: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [tokenPurpose, setTokenPurpose] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [tokenDistribution, setTokenDistribution] = useState<string>("");
  const [tokenStandard, setTokenStandard] = useState<string>("");
  const [hashscanLink, setHashscanLink] = useState<string>("");

  const handleTokenPurposeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setTokenPurpose(value);
    changeTokenPurpose(value);
  };

  const handleTokenSupplyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTokenSupply(value);
    changeTokenSupply(value);
  };

  const handleTokenDistributionChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.currentTarget.value;
    setTokenDistribution(value);
    changeTokenDistribution(value);
  };

  const handleTokenStandardChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTokenStandard(value);
    changeTokenStandard(value);
  };

  const handleHashscanLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setHashscanLink(value);
    changeHashscanLink(value);
  };
  
  useEffect(()=>{
    setTokenPurpose(formData.tokenPurpose)
    setTokenSupply(formData.tokenSupply)
    setTokenDistribution(formData.tokenDistribution)
    setTokenStandard(formData.tokenStandard)
    setHashscanLink(formData.hashscanLink)
  }, [])
  return (
    <form>
      <label htmlFor="mainPurpose">
        Main purpose of the token (max 500 characters)
      </label>
      <textarea
        id="mainPurpose"
        value={tokenPurpose}
        onChange={handleTokenPurposeChange}
        placeholder="e.g., payment, governance, utility..."
        maxLength={500}
      >
      </textarea>
      <label htmlFor="supply">Token supply</label>
      <input
        id="supply"
        type="text"
        value={tokenSupply}
        onChange={handleTokenSupplyChange}
        placeholder="e.g., 1,000,000"
      />

      <label htmlFor="policy">
        Token distribution policy (max 500 characters)
      </label>
      <textarea
        id="policy"
        value={tokenDistribution}
        onChange={handleTokenDistributionChange}
        placeholder="e.g., allocation, vesting..."
        maxLength={500}
      ></textarea>

      <label htmlFor="comply">
        Does the token comply with a specific Hedera standard?
      </label>
      <input
        id="comply"
        type="text"
        value={tokenStandard}
        onChange={handleTokenStandardChange}
        placeholder="e.g., HTS"
      />
      <label htmlFor="hashscanLink">Token id</label>
      <input
        id="hashscanLink"
        type="text"
        value={hashscanLink}
        onChange={handleHashscanLinkChange}
        placeholder="e.g., 0.0.5949516"
      />
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

export default TokenFeaturesInfo;
