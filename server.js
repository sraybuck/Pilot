//load express module
const express = require("express");
//load path module
const path = require("path");
//load filesystem module
const fs = require('fs');
//load liquid module
var { Liquid } = require('liquidjs');
//create engine object using liquid
var engine = new Liquid();

//use express for server
var app = express();

//declare app's engine as liquid
app.engine('liquid', engine.express());

//tell the app where to look for templates
app.set('views', path.resolve(__dirname, "views"));

//set the view engine as liquid
app.set('view engine', 'liquid');

//tell app where the static resources are
app.use(express.static('site'));

//when a user looks at the base page, this is what loads
app.get("/", (req, res) => {
  res.render("base.liquid", {content: fs.readFileSync('site/home.html')});
});
//render contact page
app.get("/contact", (req, res) => {
  res.render("base.liquid", {content: fs.readFileSync('site/contact.html')});
});

//render about page
app.get("/about", (req, res) => {
  res.render("base.liquid", {content: fs.readFileSync('site/about.html')});
});

//try to iterate through ODFN
app.get("/collection", (req, res) => {
  res.render("toc.liquid", {content: "Collection", files: fs.readdirSync("site/collection/")});
});

app.get("/search", (req, res) => {
  res.render("base.liquid", {content: fs.readFileSync('site/search.html')});
});
//iterate through ODFN folder
app.get('/collection/:file', (req, res) => {
  res.render("page.liquid", {filename: req.params.file+".xml"});
});

//render 404 page
app.use((req, res) => {
    res.statusCode = 404;
    res.end("404 - page not found");
});

//tell server where to run on and startup log
app.listen(3000, () => {

    console.log("Application started on port 3000");
})
