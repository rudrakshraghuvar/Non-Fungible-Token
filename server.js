const express = require("express");
const app = express();
const connectDB = require("./connectDB");
const cors = require("cors");
const readRoute = require("./Routes/read");
const writeRoute = require("./Routes/write");
const authRoute = require("./Routes/auth");
const userRoutes = require("./Routes/userRoutes");

app.use(cors());

const fun = async () => {
    await connectDB();
}
fun();

// Routes
app.use("/users", userRoutes);
app.use("/read", readRoute);
app.use("/write", writeRoute);
app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));