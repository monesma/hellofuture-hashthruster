import { useEffect, useState } from "react";
import { SubmitData } from "../../types/token.types";

const FinancingInfo = ({
  formData,
  changeFundraisingTarget,
  changeMinInvestment,
  changeMaxInvestment,
  changeTokenValue,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeFundraisingTarget: (target: string) => void;
  changeMinInvestment: (minInvestment: string) => void;
  changeMaxInvestment: (maxInvestment: string) => void;
  changeTokenValue: (tokenValue: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [fundraisingTarget, setFundraisingTarget] = useState<number>(0);
  const [minInvestment, setMinInvestment] = useState<string>("");
  const [maxInvestment, setMaxInvestment] = useState<string>("");
  const [tokenValue, setTokenValue] = useState<string>("");

  useEffect(()=>{
    setFundraisingTarget(formData.fundraisingTarget)
    setMinInvestment(formData.minInvestment)
    setMaxInvestment(formData.maxInvestment)
    setTokenValue(formData.tokenValue)
  }, [])

  return (
    <form>
      <label htmlFor="fundraising">
        What is the fundraising target for this ICO?
      </label>
      <input
        id="fundraising"
        type="number"
        value={fundraisingTarget}
        onChange={(e) => {
          setFundraisingTarget(parseFloat(e.currentTarget.value));
          changeFundraisingTarget(e.currentTarget.value);
        }}
        placeholder="Fundraising target in USD"
      />

      <label htmlFor="minMax">
        What is the minimum and maximum investment per participant?
      </label>
      <div id="minMax">
        <label>
          Minimum Investment:
          <input
            type="text"
            value={minInvestment}
            onChange={(e) => {
              setMinInvestment(e.currentTarget.value);
              changeMinInvestment(e.currentTarget.value);
            }}
            placeholder="Minimum investment in USD"
          />
        </label>
        <label>
          Maximum Investment:
          <input
            type="text"
            value={maxInvestment}
            onChange={(e) => {
              setMaxInvestment(e.currentTarget.value);
              changeMaxInvestment(e.currentTarget.value);
            }}
            placeholder="Maximum investment in USD"
          />
        </label>
      </div>

      <label htmlFor="initialValue">
        What is the initial value of a token in Hedera HBAR?
      </label>
      <input
        id="initialValue"
        type="text"
        value={tokenValue}
        onChange={(e) => {
          setTokenValue(e.currentTarget.value);
          changeTokenValue(e.currentTarget.value);
        }}
        placeholder="Initial token value in HBAR"
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

export default FinancingInfo;
