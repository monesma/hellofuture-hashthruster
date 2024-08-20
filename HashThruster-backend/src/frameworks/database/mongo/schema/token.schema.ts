import mongoose from 'mongoose';

const walletAccountSchema = new mongoose.Schema({
  accountId: { type: String, required: false },
  private_key: { type: String, required: false },
  public_key: { type: String, required: false }
}, { _id: false });

const tokenSchema = new mongoose.Schema({
  creation_date: { type: Date, required: true },
  projectName: { type: String, required: true },
  tokenName: { type: String, required: true },
  tokenSymbol: { type: String, required: true },
  projectWebsite: { type: String, required: false },
  projectDescription: { type: String, required: true },
  technologies: { type: [String], required: true },
  isOpenSource: { type: Boolean, required: true },
  repositoryLink: { type: String, required: false },
  isAudited: { type: Boolean, required: true },
  tokenPurpose: { type: String, required: true },
  tokenSupply: { type: String, required: true },
  tokenDistribution: { type: String, required: true },
  tokenStandard: { type: String, required: true },
  hashscanLink: { type: String, required: false },
  revenueGeneration: { type: String, required: true },
  tokenUseCases: { type: String, required: true },
  registeredCountry: { type: String, required: true },
  compliesWithRegulations: { type: Boolean, required: true },
  obtainedLegalAdvice: { type: Boolean, required: true },
  fundraisingTarget: { type: String, required: true },
  minInvestment: { type: String, required: false },
  maxInvestment: { type: String, required: false },
  tokenValue: { type: String, required: true },
  successReason: { type: String, required: true },
  differentiation: { type: String, required: true },
  launchDate: { type: String, required: false },
  linkedin: { type: String, required: false },
  discord: { type: String, required: false },
  telegram: { type: String, required: false },
  twitter: { type: String, required: false },
  instagram: { type: String, required: false },
  pdfFileName: { type: String, required: false },
  imageFileName: { type: String, required: false },
  walletAccountId: { 
    type: mongoose.Schema.Types.Mixed, 
    required: false 
  }
});

const TokenModel = mongoose.model('Token', tokenSchema);

export default TokenModel;
