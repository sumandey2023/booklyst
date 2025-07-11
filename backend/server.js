const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/db/connectdb");
const authRoutes = require("./src/routes/authRoute");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const COOKIE_SECRET = process.env.COOKIE_SECRET || "your_cookie_secret";
var cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
connectDB();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser(COOKIE_SECRET)); // ✅ This line is required for signed cookies
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
