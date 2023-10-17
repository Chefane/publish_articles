import mongoose, { Document, Schema } from 'mongoose';

const UserRoleSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    unique:true,
  },
  user_role: {
    type: String,
    required: [true, 'Please enter user role'],
  },

  password: {
    type: String,
    required: [true, 'Please enter password'],
  },
});

export default mongoose.models.UserRole || mongoose.model('UserRole', UserRoleSchema);
