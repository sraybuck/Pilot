//load path module
const path = require("path");
//load filesystem module that allows you to read directories and files within the app
const fs = require('fs');
//load xmldol module
var DOMParser = require('xmldom').DOMParser;


fs.readdirSync('site/collection/deepfreeze').forEach(function (file) {
  var file_data = fs.readFileSync('site/collection/deepfreeze/'+file, "utf-8");
  var doc = new DOMParser().parseFromString(file_data,'text/xml');
  var test = doc.getElementsByTagName('title');
  console.log(test[0].textContent);
});



//write file out to json
/*fs.writeFile("site/assets/js/meta.json", JSON.stringify(all_content), (err) => {
  if (err) {
    console.error(err);
    return;
  };

});*/