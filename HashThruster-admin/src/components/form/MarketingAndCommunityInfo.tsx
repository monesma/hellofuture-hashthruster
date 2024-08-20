import { useEffect, useState } from "react";
import { SubmitData } from "../../types/token.types";

const MarketingAndCommunityInfo = ({
  formData,
  changeLinkedin,
  changeDiscord,
  changeTelegram,
  changeTwitter,
  changeInstagram,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeLinkedin: (linkedin: string) => void;
  changeDiscord: (discord: string) => void;
  changeTelegram: (telegram: string) => void;
  changeTwitter: (twitter: string) => void;
  changeInstagram: (instagram: string) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [linkedin, setLinkedin] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");

  useEffect(() => {
    setLinkedin(formData.linkedin || "");
    setDiscord(formData.discord || "");
    setTelegram(formData.telegram || "");
    setTwitter(formData.twitter || "");
    setInstagram(formData.instagram || "");
  }, [formData]);

  return (
    <form>
      <label htmlFor="linkedin">LinkedIn URL:</label>
      <input
        id="linkedin"
        type="text"
        value={linkedin}
        onChange={(e) => {
          setLinkedin(e.currentTarget.value);
          changeLinkedin(e.currentTarget.value);
        }}
        placeholder="LinkedIn URL"
      />

      <label htmlFor="discord">Discord Channels (comma-separated):</label>
      <input
        id="discord"
        type="text"
        value={discord}
        onChange={(e) => {
          setDiscord(e.currentTarget.value);
          changeDiscord(e.currentTarget.value);
        }}
        placeholder="Discord Channels"
      />

      <label htmlFor="telegram">Telegram URL:</label>
      <input
        id="telegram"
        type="text"
        value={telegram}
        onChange={(e) => {
          setTelegram(e.currentTarget.value);
          changeTelegram(e.currentTarget.value);
        }}
        placeholder="Telegram URL"
      />

      <label htmlFor="twitter">Twitter URL:</label>
      <input
        id="twitter"
        type="text"
        value={twitter}
        onChange={(e) => {
          setTwitter(e.currentTarget.value);
          changeTwitter(e.currentTarget.value);
        }}
        placeholder="Twitter URL"
      />

      <label htmlFor="instagram">Instagram URL:</label>
      <input
        id="instagram"
        type="text"
        value={instagram}
        onChange={(e) => {
          setInstagram(e.currentTarget.value);
          changeInstagram(e.currentTarget.value);
        }}
        placeholder="Instagram URL"
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

export default MarketingAndCommunityInfo;
