import { SubmitData } from "../../types/api-types";

const GeneralInfo = ({
  formData,
  changeProjectName,
  changeTokenName,
  changeTokenSymbol,
  changeProjectWebsite,
  changeProjectDescription,
  nextForm,
}: {
  formData: SubmitData;
  changeProjectName: (txt: string) => void;
  changeTokenName: (txt: string) => void;
  changeTokenSymbol: (txt: string) => void;
  changeProjectWebsite: (txt: string) => void;
  changeProjectDescription: (txt: string) => void;
  nextForm: () => void;
}) => {
  return (
    <form>
      <label htmlFor="project-name">Project name (required)</label>
      <input
        type="text"
        id="project-name"
        name="project-name"
        value={formData.projectName}
        onChange={(e) => {
          changeProjectName(e.currentTarget.value);
        }}
        placeholder="e.g., HashThruster"
      />
      <label htmlFor="token-name">Token name (required)</label>
      <input
        type="text"
        id="token-name"
        name="token-name"
        value={formData.tokenName}
        onChange={(e) => {
          changeTokenName(e.currentTarget.value);
        }}
        placeholder="e.g., HashBomb"
      />
      <label htmlFor="token-symbol">Token symbol (required)</label>
      <input
        type="text"
        id="token-symbol"
        name="token-symbol"
        value={formData.tokenSymbol}
        onChange={(e) => {
          changeTokenSymbol(e.currentTarget.value);
        }}
        placeholder="e.g., HBMB"
        maxLength={4}
      />
      <label htmlFor="project-website">Project website link</label>
      <input
        type="text"
        id="project-website"
        name="project-website"
        value={formData.projectWebsite}
        onChange={(e) => {
          changeProjectWebsite(e.currentTarget.value);
        }}
        placeholder="e.g., https://website.com"
      />
      <label htmlFor="project-description">Project description (required)</label>
      <textarea
        id="project-description"
        name="project-description"
        value={formData.projectDescription}
        onChange={(e) => {
          changeProjectDescription(e.currentTarget.value);
        }}
        placeholder="Short project description (max 500)"
        maxLength={500}
      ></textarea>
      <div className="valid">
        <input type="submit" className="hidden" value="Previous" onClick={(e) => {
          e.preventDefault();
          
        }} />
        <input type="submit" value="Next" onClick={(e) => {
          e.preventDefault();
          nextForm();
        }} />
      </div>
    </form>
  );
};

export default GeneralInfo;
