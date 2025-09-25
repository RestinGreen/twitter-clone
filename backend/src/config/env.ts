import dotenv from "dotenv"

dotenv.config()

export const ENV: {
    PORT: string,
    NODE_ENV: string,
    MONGO_URI: string,
    ARCJET_API_KEY: string,
    CLERK_PUBLISHABLE_KEY: string,
    CLERK_SECRET_KEY: string,
    CLAUDINARY_CLOUD_NAME: string,
    CLAUDINARY_API_KEY: string,
    CLAUDINARY_API_SECRET: string,
} = {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as string,
    MONGO_URI: process.env.MONGODB_URL as string,
    ARCJET_API_KEY: process.env.ARCJET_API_KEY as string,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY as string,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY as string,
    CLAUDINARY_CLOUD_NAME: process.env.CLAUDINARY_CLOUD_NAME as string,
    CLAUDINARY_API_KEY: process.env.CLAUDINARY_API_KEY as string,
    CLAUDINARY_API_SECRET: process.env.CLAUDINARY_API_SECRET as string,
}