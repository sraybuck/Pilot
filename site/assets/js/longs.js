function main(){
var l = document.getElementsByTagName("TEI-L");
var s = document.getElementsByTagName("TEI-S");
//swapS(s);
//swapS(s);
}

function swapS(array){

    for(i = 0; i < array.length; i++){
        //console.log("loop");
        text = array[i].textContent.replace("ſ", "s");
        array[i].innerText = text;
        console.log("TEXT IS: " + array[i].textContent);
    }
}

document.getElementById("swap").onclick = 
setTimeout(main, 400);