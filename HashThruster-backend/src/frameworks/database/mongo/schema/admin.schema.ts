import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  creation_date: { type: Date, required: true },
  public_key: { type: String, required: true },
  private_key: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: String, required: true},
  status: { type: String, required: true },
});

const AdminModel = mongoose.model('admin', adminSchema);

export default AdminModel;
