const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoute');
const adminRoutes = require("./routes/adminRoute");
const doctorRoutes = require("./routes/doctorRoute")
const connectDb = require("./config/connectDb");
const path = require("path");

//dotenv conig
dotenv.config();
connectDb();

//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = process.env.PORT || 4001;
//listen port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});