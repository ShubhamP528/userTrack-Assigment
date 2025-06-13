require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const rateLimit = require("express-rate-limit");
const dbConnect = require("./config/dbConnect");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
});

app.use(limiter);

app.use("/uploads", express.static("uploads"));

dbConnect();

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/submissionRoutes"));
app.use("/api", require("./routes/analyticsRoutes"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
