import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creation_date: { type: Date, required: true },
  public_key: { type: String, required: true },
  private_key: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  phone: { type: String, required: true },
  status: { type: String, required: true },
});

const PartnerModel = mongoose.model('partner', partnerSchema);

export default PartnerModel;
