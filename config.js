import "dotenv/config";

export default {
  port: process.env.PORT || 1000,
  baseUrl: process.env.BASE_URL || "http://localhost:1000",
  mongoUri: process.env.MONGODB_URI,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  jwtSecret: process.env.JWT_SECRET
};
