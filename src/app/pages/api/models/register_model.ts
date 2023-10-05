import mongoose, { Document, Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    maxlength: [3, 'user cannot be more than 40 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    unique:true,
  },

  password: {
    type: String,
    required: [true, 'PLease enter password'],
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);



