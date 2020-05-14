//load path module
const path = require("path");
//load filesystem module that allows you to read directories and files within the app
const fs = require('fs');
//load xmldol module
var DOMParser = require('xmldom').DOMParser;

//create object for all file data
var all_content = new Object();

//iterate through collection
fs.readdirSync('site/collection/').forEach(function (file) {
  //get filename
  var file_name = file.replace(".xml", "");

  //get string of file contents
  var file_data = fs.readFileSync('site/collection/'+file, "utf-8");

  //send string to DOMParser to create new document object
  var doc = new DOMParser().parseFromString(file_data,'text/xml');

  //set up a object to store file data
  var file_content = new Object();

  //get and save title
  file_content.title = doc.getElementsByTagName('title')[0].textContent;
  
  //get and save author
  file_content.author = doc.getElementsByTagName('author')[0].textContent;

  //get and save publisher
  file_content.publisher = doc.getElementsByTagName('publisher')[0].textContent;

  //get and save document date
  file_content.date = doc.getElementsByTagName('docDate')[0].getAttribute('when');

  //get and save file text 
  file_content.text = doc.getElementsByTagName('body')[0].textContent.replace(/[\n]/g, " ").replace(/\s{2,}/g, " ");
  
  all_content[file_name] = file_content;

});



//write file out to json
fs.writeFile("site/assets/js/meta.json", JSON.stringify(all_content), (err) => {
  if (err) {
    console.error(err);
    return;
  };

});