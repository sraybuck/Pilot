// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/
//create the lunr index
var index = elasticlunr(function () {
  this.addField('title')
  this.addField('content')
  this.setRef('id');
});

//hard coded search doc
var doc1 = {
  "id": 1,
  "title": "Anthem",
  "body": "Anthem for Doomed Youth is a good poem."
}

index.addDoc(doc1);
//search doc from variable outside


//search doc from file

console.log(index)

function doSearch() {
  var resultdiv = $('#results');
  var query = $('input#search').val();

  var result = index.search(query);
  
  resultdiv.empty();
  if (result.length == 0) {
    resultdiv.append('<p class="">No results found.</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Found '+result.length+' result</p>');
  } else {
    resultdiv.append('<p class="">Found '+result.length+' results</p>');
  }
}

$(document).ready(function() {
  $('input#search').on('keyup', doSearch);
});