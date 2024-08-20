import React, { useState } from "react";
import CreateWallet from "../hedera/createWallet";
import { create } from '@web3-storage/w3up-client';

type Wallet = {
  accountId: string;
  private_key: string;
  public_key: string;
};

const Validation = ({
  dataMode,
  handleSubmitForm,
  changePdfFile,
  changeImgFile,
  changeAccountId,
  prevForm
}: {
  dataMode: string;
  handleSubmitForm: () => void;
  changePdfFile: (file: string | null) => void;
  changeImgFile: (fileName: string) => void;
  changeAccountId?: (accountId: Wallet) => void;
  prevForm: () => void;
}) => {
  const [uploadStatus, setUploadStatus] = useState<{ pdf: string; img: string }>({
    pdf: "idle",
    img: "idle"
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'img') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
  
      setUploadStatus(prev => ({ ...prev, [type]: "uploading" }));
  
      try {
        const client = await create();

        try {
          await client.login('contact@hashthruster.com');
        } catch (loginError) {
          throw loginError;
        }

        const spaceDID = import.meta.env.VITE_WEB3STORAGE_KEY;
        await client.setCurrentSpace(spaceDID);
  
        const directoryCid = await client.uploadFile(file);
        const url = `https://${directoryCid}.ipfs.w3s.link`;
  
        setUploadStatus(prev => ({ ...prev, [type]: "uploaded" }));
  
        if (type === 'pdf') {
          changePdfFile(url);
        } else if (type === 'img') {
          changeImgFile(url);
        }
      } catch (error) {
        setUploadStatus(prev => ({ ...prev, [type]: "error" }));
      }
    }
  };

  return (
    <form
  onSubmit={(e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitForm();
  }}
>
  <p>
    Now that we're done, it's time to send your whitepaper by PDF and validate.
  </p>

  <label htmlFor="sendPdf">Upload your PDF document (required)</label>
  <div className="custom-file-upload">
    <input
      id="sendPdf"
      type="file"
      accept=".pdf"
      onChange={(e) => handleFileChange(e, 'pdf')}
      disabled={uploadStatus.pdf === "uploading" || uploadStatus.img === "uploading" || uploadStatus.pdf === "uploaded"}
    />
    <label htmlFor="sendPdf">Choose File</label>
  </div>

  {uploadStatus.pdf === "uploading" && <p>Uploading PDF file...</p>}
  {uploadStatus.pdf === "uploaded" && <p>PDF file uploaded successfully!</p>}
  {uploadStatus.pdf === "error" && <p>PDF upload failed. Please try again.</p>}

  <label htmlFor="sendImage">Upload your token image (required) (upload PDF before)</label>
  <div className="custom-file-upload">
    <input
      id="sendImage"
      type="file"
      accept=".png, .jpg, .jpeg"
      onChange={(e) => handleFileChange(e, 'img')}
      disabled={uploadStatus.img === "uploading" || uploadStatus.pdf !== "uploaded"}
    />
    <label htmlFor="sendImage">Choose Image</label>
  </div>

  {uploadStatus.img === "uploading" && <p>Uploading image file...</p>}
  {uploadStatus.img === "uploaded" && <p>Image file uploaded successfully!</p>}
  {uploadStatus.img === "error" && <p>Image upload failed. Please try again.</p>}
  
  {dataMode === "add" && <CreateWallet 
    recupAccountInfos={(accountId: Wallet) => {
      if(changeAccountId){
        changeAccountId(accountId);
      }
    }}
  />}
  <div className="valid">
    <input type="submit" value="Previous" onClick={(e) => {
          e.preventDefault();
          prevForm();
        }} />
    <input type="submit" value="Submit" disabled={uploadStatus.pdf === "uploading" || uploadStatus.img === "uploading"} />
  </div>
</form>

  );
};

export default Validation;
