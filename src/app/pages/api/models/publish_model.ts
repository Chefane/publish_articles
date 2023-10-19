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
    required: [true, 'Please enter your story'],
  },

  url: {
    type: String,
    required: [true, 'Please enter url'],
  },
  article_image: {
    type: Buffer,
    required: [true, 'Please enter the image of this article'],
  },

  published_date: {
    type: Date,
    required: [true, 'Please enter date'],
  },
});



export default mongoose.models.Publisher || mongoose.model('Publisher', PublisherSchema);
