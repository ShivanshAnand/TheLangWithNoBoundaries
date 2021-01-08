let body, title;
let currIdx = 0;
let colorArr = ["blue" , "red" , "pink" , "yellow" , "cyan" , "purple" , "green" , "black"];

let setTitleHeight = () => {
    title.style.marginTop = (window.innerHeight - title.offsetHeight)/2 + "px";
}

let init = () => {
    
    body = document.getElementsByTagName("body")[0];
    title = document.getElementsByTagName("h1")[0];
    setTitleHeight();

}

let changeColor = () => {
    
    body.style.backgroundColor = colorArr[currIdx];
    
    if(currIdx < colorArr.length - 1)
        title.style.color = colorArr[currIdx + 1];
    else
        title.style.color = colorArr[currIdx - 1];
    
    currIdx = currIdx >= colorArr.length ? 0 : ++currIdx;
      
}

window.onload = function() {
    
    init();
    setInterval(changeColor , 250);
    
}

window.onresize = setTitleHeight;
