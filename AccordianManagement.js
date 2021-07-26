
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < 3; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.children[2];
    var title = this.children[1]
    if (panel.style.display === "block") {
        title.innerText = this.id.replace("Include", "Search") + " (click to expand)"
        panel.style.display = "none";
    }
    else {
        title.innerText = this.id.replace("Include", "Search") + " (click to compress)"
        panel.style.display = "block";
    }
  });
}

function recollapse(id){
    thisacc = document.getElementById(id);
    thisacc.classList.toggle("active");
    var panel = thisacc.children[2];
    var title = thisacc.children[1]
    if (panel.style.display === "block") {
        title.innerText = thisacc.id.replace("Include", "Search") + " (click to expand)"
        panel.style.display = "none";
    }
    else {
        title.innerText = thisacc.id.replace("Include", "Search") + " (click to compress)"
        panel.style.display = "block";
    }
}

function checkTorah(){
    currentdropdown = document.getElementById('tormenu').children;
    document.getElementById("Include Torah").classList.toggle("active");
    var panel = document.getElementById('tormenu');
    var title = document.getElementById("Include Torah").children[1]
    if (panel.style.display === "block") {
        title.textContent = "Search Torah (click to expand)"
        panel.style.display = "none";
    }
    else {
        title.textContent = "Search Torah (click to compress)"
        panel.style.display = "block";
    }
    if (document.getElementById("Wholetorah").checked == true){
        for (i = 1; i<currentdropdown.length;i+= 1){
            currentdropdown[i].checked = true
        }
    }
    else{
        for (i = 1; i<currentdropdown.length;i+= 1){
            currentdropdown[i].checked = false
        }
    }
}

function checkProphets(){
    currentdropdown = document.getElementById('promenu').children;
    document.getElementById("Include Prophets").classList.toggle("active");
    var panel = document.getElementById('promenu');
    var title = document.getElementById("Include Prophets").children[1]
    if (panel.style.display === "block") {
        title.textContent = "Search Prophets (click to expand)"
        panel.style.display = "none";
    }
    else {
        title.textContent = "Search Prophets (click to compress)"
        panel.style.display = "block";
    }
    if (document.getElementById("Wholeproph").checked == true){
        for (i = 1; i<currentdropdown.length;i+= 1){
            currentdropdown[i].checked = true
        }
    }
    else{
        for (i = 1; i<currentdropdown.length;i+= 1){
            currentdropdown[i].checked = false
        }
    }
}

function checkWritings(){
    currentdropdown = document.getElementById('writmenu').children;
    document.getElementById("Include Writings").classList.toggle("active");
    var panel = document.getElementById('writmenu');
    var title = document.getElementById("Include Writings").children[1]
    if (panel.style.display === "block") {
        title.textContent = "Search Writings (click to expand)"
        panel.style.display = "none";
    }
    else {
        title.textContent = "Search Writings (click to compress)"
        panel.style.display = "block";
    }
    if (document.getElementById("Wholewrit").checked == true){
        for (i = 1; i<currentdropdown.length;i+= 1){
            currentdropdown[i].checked = true
        }
    }
    else{
        for (i = 1; i<currentdropdown.length;i+= 1){
            currentdropdown[i].checked = false
        }
    }
}
//© 2021 Ezra Gordon.