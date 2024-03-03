require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth");
const contactRoute = require("./router/contact");
const connectToDB = require("./db");
const errorMiddleware = require("./middlewares/error-middleware");
const services = require("./controller/service-controller");
const adminRoute = require("./router/admin-router");
const path = require("path");
var MongoClient = require("mongodb").MongoClient;
var url = process.env.MOGNO_DB_URI;



app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", services);
app.use("/api/admin", adminRoute);
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("*",function(req,res){
  res.sendFile(path.join(__dirname,"../client/dist/index.html"))
})


const port = 5000;
app.use(errorMiddleware);
connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`server started at post ${port}`);
  });
});
