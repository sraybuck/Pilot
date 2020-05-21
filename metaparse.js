//load filesystem module that allows you to read directories and files within the app
const fs = require('fs');
//util module
const util = require('util');
//change fs functions to a promise
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
//load xmldol module
var DOMParser = require('xmldom').DOMParser;

//parse one xml file and get metadata
async function getMeta(file) {
  var file_name = file.replace(".xml", "");
  var file_data = await readFile('site/collection/' + file, "utf-8");
  var doc = new DOMParser().parseFromString(file_data, 'text/xml');
  
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

  //figure out if its a manuscript, letter, or something else
  if (!!doc.getElementsByTagName('msDesc')) {
    file_content.type = "manuscript";
  } else if (!!doc.getElementsByTagName('msDesc')) {
    file_content.type = "letter";
  } else {
    file_content.type = "default";
  }
  var array = {};
  array[file_name] = file_content;
  return array;
}

//process all the files asynchronously using getMeta
async function processFiles(files){
  const promises = files.map(getMeta);
  var files_data = await Promise.all(promises);
  return files_data;
}

//main
//read collections directory and get metadata
async function main(){
  const files = await readdir('site/collection/');
  console.log(typeof JSON.stringify(await processFiles(files)));
  //await writeFile("site/assets/js/meta.json", JSON.stringify(await processFiles(files)));
}
main();