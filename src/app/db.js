import { error } from "console";
import mongoose from "mongoose";

const connect =async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlPaser: true,
            useUnifiedTopology:true

        });
    }catch(error)
    {
        throw new Error("Error connecting to the database");
    }

}