function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function listing(){
    castlist = document.getElementsByTagName('tei-castlist');
    if(typeof(castlist) != 'undefined' && castlist != null){
        nodes = castlist[0].childNodes;
        var linegroup = document.createElement("UL");
        linegroup.setAttribute("id", "new_list");
        insertAfter(linegroup, castlist[0]);
        for (i =0; i < nodes.length; i++){
            if(nodes[i].nodeName == "TEI-CASTITEM" || nodes[i].nodeName == "TEI-CASTGROUP"){
                var listitem = document.createElement("LI");
                listitem.innerHTML = nodes[i].textContent;
                document.getElementById("new_list").append(listitem);
            }

        }
       castlist[0].remove();
    }
}
setTimeout(listing, 400);

