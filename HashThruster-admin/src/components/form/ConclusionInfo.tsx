import { useState, useEffect } from "react";
import { SubmitData } from "../../types/token.types";

const ConclusionInfo = ({
  formData,
  changeSuccessReason,
  changeDifferentiation,
  changeLaunchDate,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeSuccessReason: (reason: string) => void;
  changeDifferentiation: (differentiation: string) => void;
  changeLaunchDate: (date: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [successReason, setSuccessReason] = useState<string>("");
  const [differentiation, setDifferentiation] = useState<string>("");
  const [launchDate, setLaunchDate] = useState<string>("");

  useEffect(()=>{
    setSuccessReason(formData.successReason)
    setDifferentiation(formData.differentiation)
    setLaunchDate(formData.launchDate)
  }, [])
  return (
    <form>
      <label htmlFor="succeed">
        Why do you think your project will succeed? (max 500)
      </label>
      <textarea
        id="succeed"
        value={successReason}
        onChange={(e) => {
          setSuccessReason(e.currentTarget.value);
          changeSuccessReason(e.currentTarget.value);
        }}
        maxLength={500}
        placeholder="Explain why you believe your project will succeed"
      ></textarea>

      <label htmlFor="others">
        What differentiates your project from others in the same field? (max
        500)
      </label>
      <textarea
        id="others"
        value={differentiation}
        onChange={(e) => {
          setDifferentiation(e.currentTarget.value);
          changeDifferentiation(e.currentTarget.value);
        }}
        maxLength={500}
        placeholder="Describe what sets your project apart"
      ></textarea>

      <label htmlFor="isLaunched">
        When will the token be officially launched?
      </label>
      <input
        id="isLaunched"
        type="text"
        value={launchDate}
        onChange={(e) => {
          setLaunchDate(e.currentTarget.value);
          changeLaunchDate(e.currentTarget.value);
        }}
        placeholder="Provide the token launch date"
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

export default ConclusionInfo;
