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
//specify port as 3000 or whatever heroku wants
var port = process.env.PORT || 3000;
//declare app's engine as liquid
app.engine('liquid', engine.express());

//tell the app where to look for templates
app.set('views', path.resolve(__dirname, "views"));

//set the view engine as liquid
app.set('view engine', 'liquid');

//tell app where the static resources are, from now on when there are relative links within the html of the website,
// it will use site as the root folder. Within this file, we still use the directory above site as the root.
app.use(express.static('site'));

app.use('/assets', express.static('assets'));

var baseurl = "http://localhost:3000/" || "https://pilotnantucket.herokuapp.com/";

/*BASIC ANATOMY OF A PILOT ROUTE

app.get("URL_COMPONENT", (req, res) => {                            //this creates the route
  fs.readFile('PATH OF FILE', 'utf-8', (err, data) => {             //this loads the html files
    if (err){                                                       //this checks if theres an error reading the html file
      throw err;
    }
    res.render("TEMPLATE.LIQUID", {content: "CONTENT_YOU_WANT"});   //loads the template that the html gets input into
  })
});

Essentially, first the program creates a route or url for the content. Then it reads the filesystem and loads the file content
from the html file you want to display, then it renders the template you specify and loads the html content. The reason it
is nested is because of node uses asynchronous programming. Asynchronous programming basically does not execute each function
in sequence like most programming languages, it can execute multiple functions at once without waiting for the previous one
to be completed before starting the next one. Therefore, if the next function depends on information from the last, like how we need
to fully load data from the html before putting it into a template, we nest the functions within each other so they'll execute in sequence.

HOW TO USE THESE ROUTES
1. Pick something to go on the end of your base url for URL_COMPONENT
2. In the fs.readFile paramteres, make the first parameter the path of the file you want to display such as home.html
3. In the render function,  specify which template you want to load, we use base.liquid for all basic pages and page.liquid for TEI pages
4. Then tell liquid what content you want rendered inside the {content} area of the template you selected.
If you want to load the file you had previously specified, just put "data" because data is the variable that 
currently stores the content of that file 

Keep in mind that different liquid templates will have different places where {content} is loaded or other liquid variables that you can pass information to. For example, the page.liquid does not have a {content} variable; instead it has a {filename} variable that you pass a .xml file to in order to run CETEIcean.*/

//when a user looks at the base page, this is what loads
app.get("/", (req, res) => {
  fs.readFile('site/home.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data, baseurl: baseurl });
  });
});

//render contact page
app.get("/contact", (req, res) => {
  fs.readFile('site/contact.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data, baseurl: baseurl })
  });
});

//render about page
app.get("/about", (req, res) => {
  fs.readFile('site/about.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data, baseurl: baseurl });
  });
});

//render search page
app.get("/search", (req, res) => {
  fs.readFile('site/search.html', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("base.liquid", { content: data, baseurl: baseurl });
  });
});

//render table of contents page for collection
app.get("/collection", (req, res) => {
  fs.readdir('site/collection/', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    res.render("toc.liquid", { files: data, baseurl: baseurl });
  });
});

/*iterate through collection folder and generate a new page for each TEI file

The ":" specifies a dummy variable "file" that represents each item that matches that pattern inside the collection folder.

Within the liquid brackets, 'req.params.file+".xml"'' refers back to the file dummy variable and appends a .xml extension to it to get the right filename to pass to CETEIcean*/
/*app.get('/collection/:file', (req, res) => {
  res.render("page.liquid", { filename: req.params.file + ".xml" });
});*/

app.get('/collection/:file', (req, res) => {
  res.render("page.liquid", { filename: req.params.file + ".xml" , baseurl: baseurl});
});

//render 404 page
app.use((req, res) => {
  res.statusCode = 404;
  res.end("404 - page not found");
});

//tell server where to run on and startup log
app.listen(port, () => {

  console.log("Application started on port 3000");
});
