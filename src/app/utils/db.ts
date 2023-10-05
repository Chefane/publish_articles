
import mongoose from 'mongoose';

export const dbConnect = async ()=>{
  try{
      if (!process.env.MONGO_URL) {
        throw new Error('mongo url not defined')
      }
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log('Connection to the database established');
  }
  catch(error){
      console.log(error)
      process.exit(1);
  }
}