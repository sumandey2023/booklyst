const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/db/connectdb");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
//  connect to the database
connectDB();
console.log("suman");
console.log("hi");
console.log("hi");
console.log("hi");
console.log("test69");
console.log("test54464");

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
