import { useState, useEffect } from "react";
import { SubmitData } from "../../types/api-types";

const ConclusionInfo = ({
  formData,
  changeSuccessReason,
  changeDifferentiation,
  changeLaunchDate,
  changeHasLaunched,
  changeProjectLaunchDate,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeSuccessReason: (reason: string) => void;
  changeDifferentiation: (differentiation: string) => void;
  changeLaunchDate: (date: string) => void;
  changeHasLaunched: (hasLaunched: boolean) => void;
  changeProjectLaunchDate: (date: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [successReason, setSuccessReason] = useState<string>("");
  const [differentiation, setDifferentiation] = useState<string>("");
  const [launchDate, setLaunchDate] = useState<string>("");
  const [hasLaunched, setHasLaunched] = useState<boolean>(false);
  const [projectLaunchDate, setProjectLaunchDate] = useState<string>("");

  useEffect(()=>{
    setSuccessReason(formData.successReason)
    setDifferentiation(formData.differentiation)
    setLaunchDate(formData.launchDate)
    setHasLaunched(formData.hasLaunched)
    setProjectLaunchDate(formData.projectLaunchDate)
  }, [])
  return (
    <form>
      <label htmlFor="succeed">
        Why do you think your project will succeed? (max 500) (required)
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
        500) (required)
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

      <label htmlFor="launched">Has the project already been launched?</label>
      <select
        id="launched"
        value={hasLaunched ? "yes" : "no"}
        onChange={(e) => {
          const value = e.currentTarget.value === "yes";
          setHasLaunched(value);
          changeHasLaunched(value);
        }}
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>

      {hasLaunched && (
        <>
          <label htmlFor="launchDate">What is the project launch date?</label>
          <input
            id="launchDate"
            type="text"
            value={projectLaunchDate}
            onChange={(e) => {
              setProjectLaunchDate(e.currentTarget.value);
              changeProjectLaunchDate(e.currentTarget.value);
            }}
            placeholder="Provide the project launch date DD/MM/YYYY"
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

export default ConclusionInfo;
