//load express module
const express = require("express");
//load path module
const path = require("path");
//load filesystem module that allows you to read directories and files within the app
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

//tell app where the static resources are, from now on when there are relative links within the html of the website, it will use site as the root folder. Within this file, we still use the directory above site as the root.
app.use(express.static('site'));

/*BASIC ANATOMY OF A HUMPBACK ROUTE

app.get("URL_COMPONENT", (req, res) => {
  res.render("TEMPLATE.LIQUID", {content: "CONTENT_YOU_WANT"});
});

Essentially, pick something to go on the end of your base url for URL_COMPONENT

Then specify which template you want to load, we use base.liquid for all basic pages and page.liquid for TEI pages

Then tell liquid what content you want rendered inside the {content} area of the template you selected. We specify html content by using the fs module for most of our base pages ( ex. fs.readFileSync('site/home.html')).

Keep in mind that different liquid templates will have different places where {content} is loaded or other liquid variables that you can pass information to. For example, the page.liquid does not have a {content} variable; instead it has a {filename} variable that you pass a .xml file to in order to run CETEIcean.*/

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

//render search page
app.get("/search", (req, res) => {
  res.render("base.liquid", {content: fs.readFileSync('site/search.html')});
});

//render table of contents page for collection
app.get("/collection", (req, res) => {
  res.render("toc.liquid", {content: "Collection", files: fs.readdirSync("site/collection/")});
});

//iterate through collection folder and generate a new page for each TEI file
//the ":" specifies a dummy variable "file" that represents each item that matches that pattern inside the collection folder
//within the liquid brackets, 'req.params.file+".xml"'' refers back to the file dummy variable and appends a .xml extension to it to get the right filename to pass to CETEIcean
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
