const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./config/database");
const app = express();


const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://gart.org.in",
      "https://www.gart.org.in",
      "https://gart-global-hub.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());
app.use("/auth", require("./routes/auth"));
app.use("/memberships", require("./routes/membership"));
app.use("/membership-types", require("./routes/membershipTypes"));
app.use("/contact", require("./routes/contact"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res)=>{
    res.send("Default page of GART web");
});



connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running at http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });

// app.listen(PORT, ()=>{
//     console.log("server is up and running>>")
// })
