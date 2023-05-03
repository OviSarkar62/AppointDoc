const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoute');
const connectDb = require("./config/connectDb");

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

//port
const PORT = process.env.PORT || 4001;
//listen port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});