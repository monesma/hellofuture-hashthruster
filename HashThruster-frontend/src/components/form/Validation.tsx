import React, { useEffect, useState } from "react";
//@ts-ignore
import { create } from '@web3-storage/w3up-client';
import { SubmitData } from "../../types/api-types";

const Validation = ({
  formData,
  handleSubmitForm,
  changePdfFile,
  changeProjectEmail,
  prevForm
}: {
  formData: SubmitData;
  handleSubmitForm: (url: string | null) => void;
  changePdfFile: (file: string | null) => void;
  changeProjectEmail: (projectEmail: string) => void;
  prevForm: () => void;
}) => {


  const [projectEmail, setProjectEmail] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string>("idle");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorPdf, setErrorPdf] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorPdf(null)
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadStatus("uploading");

      try {
        // Initialisation du client Web3.Storage
        const client = await create();
        await client.login('contact@hashthruster.com')
        
        const spaceDID = import.meta.env.VITE_WEB3STORAGE_KEY;

        await client.setCurrentSpace(spaceDID);

        const directoryCid = await client.uploadFile(file);
        const url = `https://${directoryCid}.ipfs.w3s.link`;
        setUploadedUrl(url);
        setUploadStatus("uploaded");
        changePdfFile(url);
      } catch (error) {
        setUploadStatus("error");
      }
    }
  };

  const handleProjectEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;
    setProjectEmail(email);
    changeProjectEmail(email);
  };

  useEffect(()=>{
    setProjectEmail(formData.projectEmail)
  }, [])

  return (
    <form className="validation" onSubmit={(e)=>{
      e.preventDefault()
    }}>
      <p>
        Now that we're done, it's time to send your whitepaper by PDF and
        validate.
      </p>
      <label htmlFor="sendPdf">Upload your PDF document (required)</label>

      <div className="custom-file-upload">
        <input
          id="sendPdf"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <label htmlFor="sendPdf">Choose File</label>
      </div>
      {uploadStatus === "uploading" && <p>Uploading file...</p>}
      {uploadStatus === "uploaded" && <p>File uploaded successfully!</p>}
      {uploadStatus === "error" && <p>Upload failed. Please try again.</p>}
      {errorPdf !== null && <p className="error">{errorPdf}</p>}
      <label htmlFor="projectEmail">Contact email (required)</label>
      <input
        id="projectEmail"
        type="text"
        value={projectEmail}
        onChange={handleProjectEmailChange}
        placeholder="e.g., contact@hashthruster.com"
      />
      <div className="valid">
        <input type="submit" value="Previous" onClick={(e) => {
          e.preventDefault();
          prevForm()
        }} />
        <input
          type="submit"
          value="Submit"
          disabled={uploadStatus === "uploading"}
          onClick={(e) => {
            e.preventDefault();
            setErrorPdf(null)
            if (uploadStatus === "uploaded") {
              handleSubmitForm(uploadedUrl);
            } else {
              setErrorPdf("Please upload a PDF file before submitting.");
            }
          }}
        />
      </div>
    </form>
  );
};

export default Validation;
