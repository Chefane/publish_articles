import mongoose from 'mongoose';

const PublisherSchema = new mongoose.Schema({
  publisher_name: {
    type: String,
    required: [true, 'Please add publisher name'],
  },
  article_title: {
    type: String,
    required: [true, 'Please add title of your story'],
    unique:true,
  },

  story: {
    type: String,
    required: [true, 'PLease enter your story'],
  },

  url: {
    type: String,
    required: [true, 'PLease enter password'],
  },

  published_date: {
    type: Date,
    required: [true, 'PLease enter password'],
  },
});

export default mongoose.models.Publisher || mongoose.model('Publisher', PublisherSchema);
