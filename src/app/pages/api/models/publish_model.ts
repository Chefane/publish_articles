import mongoose from 'mongoose';

const PublisherSchema = new mongoose.Schema({

  author_id: {
    type: String,
    required: [true, 'Please add author id'],
  },

  author_name: {
    type: String,
    required: [true, 'Please add publisher name'],
  },
  article_title: {
    type: String,
    required: [true, 'Please add title of your story'],
    unique:true,
  },

  article_summary: {
    type: String,
    required: [true, 'Please enter summary of your article'],
  },

  entire_article: {
    type: String,
  },
  
  article_image: {
    type: String,
    required: [true, 'Please enter the image of this article'],
  },

  published_date: {
    type: Date,
    required: [true, 'Please enter date'],
  },
});



export default mongoose.models.Publisher || mongoose.model('Publisher', PublisherSchema);
