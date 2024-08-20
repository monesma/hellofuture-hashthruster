import { useEffect, useState } from "react";
import { SubmitData } from "../../types/api-types";

const RisksAndChallengesInfo = ({
  formData,
  changeRisks,
  changeChallenges,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeRisks: (risks: string) => void;
  changeChallenges: (challenges: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [risks, setRisks] = useState<string>("");
  const [challenges, setChallenges] = useState<string>("");

  useEffect(()=>{
    setRisks(formData.risks)
    setChallenges(formData.challenges)
  }, [])
  
  return (
    <form>
      <label htmlFor="risks">
        What are the main risks associated with the project? (max 500) (required)
      </label>
      <textarea
        id="risks"
        value={risks}
        onChange={(e) => {
          setRisks(e.currentTarget.value);
          changeRisks(e.currentTarget.value);
        }}
        maxLength={500}
        placeholder="Describe the main risks"
      ></textarea>

      <label htmlFor="challenges">
        What challenges do you foresee in achieving your objectives? (max 500) (required)
      </label>
      <textarea
        id="challenges"
        value={challenges}
        onChange={(e) => {
          setChallenges(e.currentTarget.value);
          changeChallenges(e.currentTarget.value);
        }}
        maxLength={500}
        placeholder="Describe the challenges"
      ></textarea>

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

export default RisksAndChallengesInfo;
