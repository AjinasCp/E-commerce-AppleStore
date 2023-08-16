const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./routes/userRoutes");
const admin = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");

const parser = require("body-parser");

app.use(parser.json()); //x 
app.use(parser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/user", user); //x
app.use("/admin", admin); 

//MongoDb connecting

mongoose
  .connect("mongodb://127.0.0.1:27017/Apple")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err, "Database connection failed");
  });

//server connecting

app.listen(3002, () => {
  console.log("Server is connected to 3002");
});
