// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/



//create the lunr index
var index = elasticlunr(function () {
  this.addField('title')
  this.addField('content')
});

//add the content to the index
//ITERATE
var collection = fs.readdirSync("site/collection/");
console.log(collection);
/*index.addDoc({
  title: {{}}
});*/
//liquid tags????
