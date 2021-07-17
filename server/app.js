const express = require("express");
const path = require("path");

//use express
const app = express();
var port = 3000;

//routes
const IndexRouter = require("./routes/IndexRouter");

//Use static files in public on every route(middleware)
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../src")));
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../views")));
//routes
app.use("/", IndexRouter)

//listen to port
app.listen(process.env.PORT || port, () => {
  console.log(`Server start on ${port}.`)
})