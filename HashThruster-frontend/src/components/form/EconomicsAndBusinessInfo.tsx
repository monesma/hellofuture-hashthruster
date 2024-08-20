import { useState, useEffect } from "react";
import { SubmitData } from "../../types/api-types";

const EconomicsAndBusinessInfo = ({
  formData,
  changeBusinessModel,
  changeRevenueGeneration,
  changeTokenUseCases,
  changeHasRoadMap,
  changeRoadMapLink,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeBusinessModel: (model: boolean) => void;
  changeRevenueGeneration: (revenue: string) => void;
  changeTokenUseCases: (useCases: string) => void;
  changeHasRoadMap: (hasRoadMap: boolean) => void;
  changeRoadMapLink: (link: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [businessModel, setBusinessModel] = useState<boolean>(false);
  const [revenueGeneration, setRevenueGeneration] = useState<string>("");
  const [tokenUseCases, setTokenUseCases] = useState<string>("");
  const [hasRoadMap, setHasRoadMap] = useState<boolean>(false);
  const [roadMapLink, setRoadMapLink] = useState<string>("");

  useEffect(() => {
    setBusinessModel(formData.businessModel);
    setRevenueGeneration(formData.revenueGeneration);
    setTokenUseCases(formData.tokenUseCases);
    setHasRoadMap(formData.hasRoadMap);
    setRoadMapLink(formData.roadMapLink);
  }, [formData]);

  return (
    <form>
      <label htmlFor="business">
        Do you have a business model for the project? (required)
      </label>
      <select
        id="business"
        value={businessModel ? "true" : "false"}
        onChange={(e) => {
          const value = e.currentTarget.value === "true";
          setBusinessModel(value);
          changeBusinessModel(value);
        }}
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>

      <label htmlFor="revenue">
        How does the project generate revenue? (max 500) (required)
      </label>
      <textarea
        id="revenue"
        value={revenueGeneration}
        onChange={(e) => {
          setRevenueGeneration(e.currentTarget.value);
          changeRevenueGeneration(e.currentTarget.value);
        }}
        maxLength={500}
        placeholder="Explain how your project generates revenue"
      ></textarea>

      <label htmlFor="useCases">
        What are the token's main use cases? (max 500) (required)
      </label>
      <textarea
        id="useCases"
        value={tokenUseCases}
        onChange={(e) => {
          setTokenUseCases(e.currentTarget.value);
          changeTokenUseCases(e.currentTarget.value);
        }}
        maxLength={500}
        placeholder="Describe the main use cases of the token"
      >
      </textarea>
      <label htmlFor="roadMap">Do you have a detailed road map?</label>
      <select
        id="roadMap"
        value={hasRoadMap ? "yes" : "no"}
        onChange={(e) => {
          const value = e.currentTarget.value === "yes";
          setHasRoadMap(value);
          changeHasRoadMap(value);
        }}
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>

      {hasRoadMap && (
        <>
          <label htmlFor="roadMapLink">
            Please send your road map link (if available)
          </label>
          <input
            id="roadMapLink"
            type="text"
            value={roadMapLink}
            onChange={(e) => {
              setRoadMapLink(e.currentTarget.value);
              changeRoadMapLink(e.currentTarget.value);
            }}
            placeholder="Link to the road map"
          />
        </>
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

export default EconomicsAndBusinessInfo;
