var idblock = document.getElementById("block1")
var marginLeft = 0, marginTop = 0;
var marginLeftLimit = 100, marginTopLimit = 100;
var marginLeftState = true, marginTopState = true;

function moveBlock(){
    var marginLeftStringValue = marginLeft.toString();
    var marginTopStringValue = marginTop.toString();
    idblock.style.marginLeft = marginLeftStringValue + "%";
    idblock.style.marginTop = marginTopStringValue + "%";
    if (marginLeft == 0) marginLeftState = true;
    if (marginTop == 0) marginTopState = true;
    if (marginTop == marginTopLimit) marginTopState = false;
    if (marginLeft == marginLeftLimit) marginLeftState = false;
    if (marginLeftState == true){
        marginLeft++;
    } else{
        marginLeft--;
    }
    if (marginTopState == true){
        marginTop++;
    } else{
        marginTop--;
    }
}

setInterval(moveBlock, 1);
