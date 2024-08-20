import { useState, useEffect } from "react";
import { SubmitData } from "../../types/token.types";

const EconomicsAndBusinessInfo = ({
  formData,
  changeRevenueGeneration,
  changeTokenUseCases,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeRevenueGeneration: (revenue: string) => void;
  changeTokenUseCases: (useCases: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [revenueGeneration, setRevenueGeneration] = useState<string>("");
  const [tokenUseCases, setTokenUseCases] = useState<string>("");

  useEffect(() => {
    setRevenueGeneration(formData.revenueGeneration);
    setTokenUseCases(formData.tokenUseCases);
  }, [formData]);

  return (
    <form>
      <label htmlFor="revenue">
        How does the project generate revenue? (max 500)
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
        What are the token's main use cases? (max 500)
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
