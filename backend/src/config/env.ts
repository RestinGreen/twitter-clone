import dotenv from "dotenv"

dotenv.config()

export const ENV = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_AUTH_ID: process.env.GOOGLE_AUTH_ID,
    GOOGLE_AUTH_SECRET: process.env.GOOGLE_AUTH_SECRET,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    MONGO_URI: process.env.MONGODB_URL,
    ARCJET_API_KEY: process.env.ARCJET_API_KEY,
    CLAUDINARY_CLOUD_NAME: process.env.CLAUDINARY_CLOUD_NAME,
    CLAUDINARY_API_KEY: process.env.CLAUDINARY_API_KEY,
    CLAUDINARY_API_SECRET: process.env.CLAUDINARY_API_SECRET,
}