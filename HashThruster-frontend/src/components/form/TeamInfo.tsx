import { useState, useEffect } from "react";
import { SubmitData } from "../../types/api-types";

const TeamInfo = ({
  formData,
  changeTeamNumber,
  changeTeamMembers,
  nextForm,
  prevForm,
}: {
  formData: SubmitData;
  changeTeamNumber: (count: number) => void;
  changeTeamMembers: (
    members: { name: string; position: string; linkedin: string }[]
  ) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [teamMembers, setTeamMembers] = useState(
    formData.teamMembers || [
      { name: "", position: "", linkedin: "" },
      { name: "", position: "", linkedin: "" },
      { name: "", position: "", linkedin: "" },
    ]
  );

  // Sync local state with formData when formData changes
  useEffect(() => {
    if (JSON.stringify(formData.teamMembers) !== JSON.stringify(teamMembers)) {
      setTeamMembers(formData.teamMembers);
    }
  }, [formData.teamMembers]);

  const handleTeamMemberChange = (
    index: number,
    key: "name" | "position" | "linkedin",
    value: string
  ) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index][key] = value;
    setTeamMembers(newTeamMembers);
    changeTeamMembers(newTeamMembers);
  };

  return (
    <form>
      <label htmlFor="team-number">How many members are on your team?</label>
      <input
        type="number"
        name="team-number"
        value={formData.teamMemberCount}
        id="team-number"
        onChange={(e) => {
          const count = parseInt(e.currentTarget.value);
          changeTeamNumber(count);
        }}
        placeholder="Write here"
      />
      <label htmlFor="team-members">
        Name, position, and LinkedIn of key team members (max 3)
      </label>
      {teamMembers.map((member, index) => (
        <div key={index} id="team-members">
          <input
            type="text"
            name={`team-member-name${index + 1}`}
            value={member.name}
            onChange={(e) =>
              handleTeamMemberChange(index, "name", e.currentTarget.value)
            }
            placeholder={`Team member ${index + 1} name`}
          />
          <input
            type="text"
            name={`team-member-position${index + 1}`}
            value={member.position}
            onChange={(e) =>
              handleTeamMemberChange(index, "position", e.currentTarget.value)
            }
            placeholder={`Team member ${index + 1} position`}
          />
          <input
            type="text"
            name={`team-member-linkedin${index + 1}`}
            value={member.linkedin}
            onChange={(e) =>
              handleTeamMemberChange(index, "linkedin", e.currentTarget.value)
            }
            placeholder={`Team member ${index + 1} LinkedIn`}
          />
        </div>
      ))}
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

export default TeamInfo;
