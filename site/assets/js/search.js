// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/



//create the lunr index
var index = elasticlunr(function () {
  this.addField('title')
  this.addField('content')
});

var files = {}
files.push("lINK OUT TO OTHER TEXT FILE");
//add the content to the index
//ITERATE

/*index.addDoc({
  title: {{}}
});*/
//liquid tags????
