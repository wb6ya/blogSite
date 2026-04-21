import dotenv from "dotenv";

// التهيئة
dotenv.config();

export const env = {
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
};