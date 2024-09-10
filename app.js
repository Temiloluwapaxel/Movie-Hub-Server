require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// import routes to app.js from authRouter in routes folder
const authRouter = require("./routes/authRouter");

const movieRouter = require("./routes/movieRouter");

const bookmarkRouter = require("./routes/bookmarkRouter");

const error = require("./middlewares/error");

const app = express();

const port = 4000;
// a middleware that allows access to the req.body on all request (without this you cant test on postman)

app.use(cors());

app.use(express.json());
// middleware for login and register and authentication router

app.use("/api/auth", authRouter);
// middleware for movie router
app.use("/api/movie", movieRouter);

app.use("/api/bookmark", bookmarkRouter);

// custom middleware for errors

app.use(error);

// start listening on a given port and run the call back options when it stops
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");

    await app.listen(port, () => {
      console.log(`server is running on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect ");
  }
};

start();

// jesusanmisiretemiloluwa
// PVXiSHQGFYoDIKIR

//mongodb+srv://jesusanmisiretemiloluwa:PVXiSHQGFYoDIKIR@cluster0.az1uv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
