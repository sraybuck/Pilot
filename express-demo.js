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
    //parse json from index file
    let page = JSON.parse(fs.readFileSync("site/index.json"));
    //render page data using the base template
    res.render("base.liquid", {content : page.title});
});
//render /collection page
app.get("/collections", (req, res) => {
    res.render("toc.liquid", {content: "Collections", files: "ODFN, RandomStuff"});
});

//try to iterate through ODFN
app.get("/ODFN", (req, res) => {
  res.render("toc.liquid", {content: "ODFN", files: fs.readdirSync("site/ODFN/")});
});

//iterate through Random Stuff
app.get("/RandomStuff", (req, res) => {
  res.render("toc.liquid", {content: "Random Stuff", files: fs.readdirSync("site/RandomStuff")});
});

//iterate through ODFN folder
app.get('/ODFN/:file', (req, res) => {
  res.render("page.liquid", {content: req.params.file+".xml"});
});


app.get('/RandomStuff/:file', (req, res) => {
  res.render("page.liquid", {content: req.params.file+".xml"});
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
