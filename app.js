require("dotenv").config();
require("express-async-errors");
//middleware
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
//express
const express = require("express");
const app = express();
//route
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
//rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
//database
const connectDB = require("./db/connection");

//port
const PORT = process.env.PORT || 3000;

//middleware use
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  express.urlencoded({
    extended: false,
  })
);
//route
app.get("/", (req, res) => {
  res.send("run ecommerce api");
});
app.get("/api/v1", (req, res) => {
  res.send("ok");
});
app.use("/api/v1/", authRoute);
app.use("/api/v1/users", userRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//start Server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server listen on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
