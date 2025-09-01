import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {

    try {
        if (!ENV.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(ENV.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }

}