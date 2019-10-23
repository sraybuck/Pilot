const express = require("express");
const path = require("path");
var $ = require('jQuery');

var { Liquid } = require('liquidjs');
var engine = new Liquid();

var app = express();

app.engine('liquid', engine.express());
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.set('views', path.resolve(__dirname, "views"));

app.set('view engine', 'liquid');

app.use(express.static('static'));

app.get("/", (req, res) => {
    let page = $.getJSON("index.json")
    res.render("base.liquid", {content : page[1]});
});


app.get("/test", (req, res) => {

    //let today = new Date();
    res.render("page.liquid", {content: "filename"});
});

app.use((req, res) => {
    res.statusCode = 404;
    res.end("404 - page not found");
});

app.listen(3000, () => {

    console.log("Application started on port 3000");
})
