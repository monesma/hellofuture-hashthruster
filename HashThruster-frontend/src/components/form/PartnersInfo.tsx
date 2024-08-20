import { useState, ChangeEvent, useEffect } from "react";
import { SubmitData } from "../../types/api-types";

const PartnersInfo = ({
  formData,
  changeHasPartners,
  changePartnerDetails,
  nextForm,
  prevForm
}: {
  formData: SubmitData;
  changeHasPartners: (hasPartners: boolean) => void;
  changePartnerDetails: (details: {
    count: number;
    mainPartner: string;
    role: string;
  }) => void;
  nextForm: () => void;
  prevForm: () => void;
}) => {
  const [hasPartners, setHasPartners] = useState<boolean>(false);
  const [partnerCount, setPartnerCount] = useState<number>(0);
  const [mainPartner, setMainPartner] = useState<string>("");
  const [partnerRole, setPartnerRole] = useState<string>("");

  const handleHasPartnersChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value === "yes";
    setHasPartners(value);
    setPartnerCount(0);
    setMainPartner("");
    setPartnerRole("");
    changeHasPartners(value);
    if(e.currentTarget.value === "no"){
      changePartnerDetails({
        count: 0,
        mainPartner: "",
        role: "",
      });
    }
  };

  const handlePartnerCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.currentTarget.value);
    setPartnerCount(count);
    changePartnerDetails({
      count,
      mainPartner,
      role: partnerRole,
    });
  };

  const handleMainPartnerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const partner = e.currentTarget.value;
    setMainPartner(partner);
    changePartnerDetails({
      count: partnerCount,
      mainPartner: partner,
      role: partnerRole,
    });
  };

  const handlePartnerRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const role = e.currentTarget.value;
    setPartnerRole(role);
    changePartnerDetails({
      count: partnerCount,
      mainPartner,
      role,
    });
  };

  useEffect(()=>{
    setHasPartners(formData.hasPartners)
    setPartnerCount(formData.partnerCount)
    setMainPartner(formData.mainPartner)
    setPartnerRole(formData.partnerRole)
  }, [])

  return (
    <form id="partnerForm">
      <label htmlFor="partnerValid">Do you have partners?</label>
      <div id="partnerValid">
        <label>
          <input
            type="radio"
            name="has-partners"
            value="yes"
            checked={hasPartners}
            onChange={handleHasPartnersChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="has-partners"
            value="no"
            checked={!hasPartners}
            onChange={handleHasPartnersChange}
          />
          No
        </label>
      </div>

      {hasPartners && (
        <div id="partnersInfos">
          <label htmlFor="partner-number">
            How many active partners do you have?
          </label>
          <input
            type="number"
            id="partner-number"
            value={partnerCount}
            onChange={handlePartnerCountChange}
            placeholder="Enter number of partners"
          />
          <label htmlFor="main-partner">Who is your main partner?</label>
          <input
            type="text"
            id="main-partner"
            value={mainPartner}
            onChange={handleMainPartnerChange}
            placeholder="Enter main partner"
          />
          <label htmlFor="partner-role">
            What is their role in your project?
          </label>
          <input
            type="text"
            id="partner-role"
            value={partnerRole}
            onChange={handlePartnerRoleChange}
            placeholder="Enter partner role"
          />
        </div>
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

export default PartnersInfo;
