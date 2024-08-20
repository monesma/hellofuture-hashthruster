import { useState, useEffect } from "react";
import { SubmitData } from "../../types/token.types";

const LegalAspectsInfo = ({
  formData,
  changeCountry,
  changeCompliance,
  changeLegalAdvice,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeCountry: (country: string) => void;
  changeCompliance: (compliance: boolean) => void;
  changeLegalAdvice: (legalAdvice: boolean) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [country, setCountry] = useState<string>("");
  const [compliance, setCompliance] = useState<boolean>(false);
  const [legalAdvice, setLegalAdvice] = useState<boolean>(false);
  
  useEffect(()=>{
    setCountry(formData.registeredCountry)
    setCompliance(formData.compliesWithRegulations)
    setLegalAdvice(formData.obtainedLegalAdvice)
  }, [])

  return (
    <form>
      <label htmlFor="country">
        In which country is the project registered?
      </label>
      <input
        id="country"
        type="text"
        value={country}
        onChange={(e) => {
          setCountry(e.currentTarget.value);
          changeCountry(e.currentTarget.value);
        }}
        placeholder="Enter the country where the project is registered"
      />

      <label htmlFor="regulations">
        Does the project comply with local and international regulations?
      </label>
      <select
        id="regulations"
        value={compliance ? "yes" : "no"}
        onChange={(e) => {
          const value = e.currentTarget.value === "yes";
          setCompliance(value);
          changeCompliance(value);
        }}
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>

      <label htmlFor="legalAdvice">
        Have you obtained the necessary legal advice for your project before
        submitting the ICO?
      </label>
      <select
        id="legalAdvice"
        value={legalAdvice ? "yes" : "no"}
        onChange={(e) => {
          const value = e.currentTarget.value === "yes";
          setLegalAdvice(value);
          changeLegalAdvice(value);
        }}
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>

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

export default LegalAspectsInfo;
