function moveLeft() {
  // get element wih id test
    var elem = document.getElementById("test");
    elem.innerHTML = "Moving Left";
}

// on document load
window.onload = function() {
    // call moveLeft function
    eval("moveLeft()");
}
