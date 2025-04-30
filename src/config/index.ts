
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret',
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '15d',
        resetPasswordSecret: process.env.RESET_PASSWORD_TOKEN_SECRET || 'your_reset_password_token_secret',
        resetPasswordExpiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN || '1h',
    },
    sttp:{
        host: process.env.STTP_HOST || 'localhost',
        port: process.env.STTP_PORT || 587,
        username: process.env.STTP_USERNAME || 'your_sttp_username',
        password: process.env.STTP_PASSWORD || 'your_sttp_password',
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloudinary_cloud_name',
        api_key: process.env.CLOUDINARY_API_KEY || 'your_cloudinary_api_key',
        api_secret: process.env.CLOUDINARY_API_SECRET || 'your_cloudinary_api_secret',
    }
  
}