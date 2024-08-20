import { useEffect, useState } from "react";
import { SubmitData } from "../../types/api-types";

const MarketingAndCommunityInfo = ({
  formData,
  changeMarketingStrategy,
  changeCommunicationChannels,
  changeCommunityMembers,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeMarketingStrategy: (strategy: string) => void;
  changeCommunicationChannels: (channels: string[]) => void;
  changeCommunityMembers: (members: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [marketingStrategy, setMarketingStrategy] = useState<string>("");
  const [communicationChannels, setCommunicationChannels] = useState<string[]>(
    []
  );
  const [communityMembers, setCommunityMembers] = useState<string>("");

  const handleChannelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCommunicationChannels((prev) =>
      checked ? [...prev, value] : prev.filter((channel) => channel !== value)
    );
  };

  useEffect(() => {
    changeCommunicationChannels(communicationChannels);
  }, [communicationChannels, changeCommunicationChannels]);
  
  useEffect(() => {
    setMarketingStrategy(formData.marketingStrategy)
    setCommunicationChannels(formData.communicationChannels)
    setCommunityMembers(formData.communityMembers)
  }, [])

  return (
    <form>
      <label htmlFor="marketingStr">
        What is your marketing strategy to attract investors and users? (Max
        500) (required)
      </label>
      <textarea
        id="marketingStr"
        value={marketingStrategy}
        onChange={(e) => {
          setMarketingStrategy(e.currentTarget.value);
          changeMarketingStrategy(e.currentTarget.value);
        }}
        maxLength={500}
        placeholder="Describe your marketing strategy"
      ></textarea>

      <label htmlFor="channels">
        What are your main communications channels?
      </label>
      <div id="channels">
        <label>
          <input
            type="checkbox"
            value="Telegram"
            checked={communicationChannels.includes("Telegram")}
            onChange={handleChannelChange}
          />
          Telegram
        </label>
        <label>
          <input
            type="checkbox"
            value="Twitter"
            checked={communicationChannels.includes("Twitter")}
            onChange={handleChannelChange}
          />
          Twitter
        </label>
        <label>
          <input
            type="checkbox"
            value="Discord"
            checked={communicationChannels.includes("Discord")}
            onChange={handleChannelChange}
          />
          Discord
        </label>
        <label>
          <input
            type="checkbox"
            value="Instagram"
            checked={communicationChannels.includes("Instagram")}
            onChange={handleChannelChange}
          />
          Instagram
        </label>
        <label>
          <input
            type="checkbox"
            value="Linkedin"
            checked={communicationChannels.includes("Linkedin")}
            onChange={handleChannelChange}
          />
          Linkedin
        </label>
      </div>

      <label htmlFor="community">
        How many members do you currently have in your community? (required)
      </label>
      <select
        id="community"
        value={communityMembers}
        onChange={(e) => {
          setCommunityMembers(e.currentTarget.value);
          changeCommunityMembers(e.currentTarget.value);
        }}
      >
        <option value="">Select a range</option>
        <option value="0-100">0-100</option>
        <option value="100-500">100-500</option>
        <option value="500-2500">500-2500</option>
        <option value="+2500">+2500</option>
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

export default MarketingAndCommunityInfo;
