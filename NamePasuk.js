//Main function is at the bottom

//l2=hebrew initals, fillVal is for the loading bar
function hebTest(l2, perek, book, fillVal){
    var lookup = l2.replace(/\s/g, '')
    var v1 = ""
    var jqxhr = jQuery.getJSON( "https://www.sefaria.org/api/texts/" + book + "." + String(perek), function(data) {
        hverses = jqxhr.responseJSON.he
        for (var i =0; i<hverses.length;i++){
            v1 = hverses[i].substring(0,1+hverses[i].indexOf("׃"))
            if (book == "Pirkei Avot"){
                //If pirkei avot, it doesn't cut off at the first colon
                v1=hverses[i]
            }
            if(hverses[i].length<400 && isValid(lookup,v1)){
                addElement(l2, book,String(perek),String(i+1));
            }
        }
        widthString = document.getElementById("myBar").style.width
        document.getElementById("myBar").style.width = (Number(widthString.substring(0,widthString.length-1))+fillVal) + "%"
        if (Number(widthString.substring(0,widthString.length-1))+fillVal>99){
            setTimeout(() => { resetbar(); }, 500);
        }
    });
}

function isValid(str1, verse){
    //Strip nikud/punctuation
    simplePasuk = "";
    for (var i = 0; i<verse.length;i++){
        if (/[א-ת ־]+$/.test(verse.charAt(i)))
            simplePasuk += verse.charAt(i);
    }
    verse=simplePasuk;
    str1=str1.charAt(0)+str1.charAt(str1.length-1);
    if (verse.charAt(0) == str1.charAt(0) && verse.charAt(verse.length-1) == str1.charAt(1)){
        return true;
    }
    return false;
}


//NEED TO MODIFY TO JUST KEEP TRACK OF RESULTS
function addElement(lookup, book, chapter, verse){
    var buttonId = book + "." + chapter + "." + verse
    document.getElementById("versesdropdown").innerHTML += "<option value = \"" + buttonId + "\" title = \"" + verse + "\"></option>" //"3" should be eText
}


function resetbar(){
    document.getElementById("loadbar").innerHTML = ""
    document.getElementById("searching").textContent = ""
    setTimeout(() => { resultreaction(); }, 100);

}

//The function formerly known as "noresults"
function resultreaction(){
    var item = document.getElementById("vary");
    if (document.getElementById("versesdropdown").innerHTML == ""){
        item.innerHTML = "Sorry, there don't seem to be any results for that search"
    }
    else if (item.children[item.children.length-1].id != "countresults"){
        var psukim = document.getElementById("versesdropdown");
        var resultCount = psukim.children.length;
        if (resultCount == 1) {
            item.innerHTML += "<br> <p id=\"countresults\"> Sorry, there was only one result. I hope it's a good one! Mouse over it to see the full translation.</p>"
//            document.getElementById("versesdropdown").title = document.getElementById("versesdropdown").children[0].title
        }
        if (resultCount > 1){
            item.innerHTML += "<p id=\"countresults\"> There were a whopping " + String(resultCount) + " results! Yay! Mouse over options in the dropdown to see the full translation.</p>"
            orderResultsByLinkCount();
        }
    }
    document.getElementById("includePA").hidden = false;
    document.getElementById("save").disabled = false;
    document.getElementById("names").disabled = false;

}

document.getElementById("vary").style.display = "block";
document.getElementById('save').addEventListener('click', nameSearch);

//Main function:
function nameSearch(){
    //var lookup = "לאהובנ";
    document.getElementById("includePA").hidden = true;
    document.getElementById("save").disabled = true;
    document.getElementById("names").disabled = true;
    document.getElementById("artProduct").innerHTML = "";
    document.getElementById("vary").innerHTML = "";
    document.getElementById("aPButtons").innerHTML = "";
    var l2 = document.getElementById("names").value;
    var lookup = l2.replace(/\s/g, '')
    lookup = lookup.charAt(0) + lookup.charAt(lookup.length-1)
    if(lookup == "" || !(/^[א-ת]+$/.test(lookup))){
        alert("Please use Hebrew letters")
        document.getElementById("includePA").hidden = false;
        document.getElementById("save").disabled = false;
        document.getElementById("names").disabled = false;
        return;
    }
    if (l2.charAt(0) == " " || l2.charAt(l2.length-1) == " "){
        alert("Please don't begin with a space")
        document.getElementById("includePA").hidden = false;
        document.getElementById("save").disabled = false;
        document.getElementById("names").disabled = false;
        return;
    }
    var numbooks = 0.0
    var checkPA = document.getElementById("1Pirkei Avot").checked
    var check2p = false;
    var sections = ["tormenu","promenu","writmenu"]
    for (var x=0;x<3;x++){
        currentdropdown = document.getElementById(sections[x]).children;
        for (var i = 1; i<currentdropdown.length;i+= 1){
            if (currentdropdown[i].checked){
                numbooks += Number(currentdropdown[i].value)
            }
        }
    }
    if (checkPA){
        numbooks += 6
    }
    if (numbooks == 0.0){
        alert("Please select some books to search");
        document.getElementById("includePA").hidden = false;
        document.getElementById("save").disabled = false;
        document.getElementById("names").disabled = false;
        return;
    }
    //Set up search bar
    document.getElementById("vary").innerHTML ="<label for=\"versesdropdown\"><i>Search results:</i></label><select id=\"versesdropdown\" class=\"brownfill\"></select>"
    document.getElementById("searching").textContent = "Searching..."
    document.getElementById("loadbar").innerHTML = "<div id=\"myProgress\"><div id=\"myBar\"></div></div>"
    currentdropdown = document.getElementById('tormenu').children;
    var fillVal = 100/numbooks
    //Checking pirkei avot
    if (checkPA){
        for (var i = 0; i<6; i++){
            hebTest(l2,i+1,"Pirkei Avot", fillVal)
        }
    }
    for (var x=0;x<3;x++){
        currentdropdown = document.getElementById(sections[x]).children;
        for (i = 1; i<currentdropdown.length;i+= 1){
            if (currentdropdown[i].checked){
                if (!check2p){
                    for (var j = 0; j<Number(currentdropdown[i].value);j++){
                        hebTest(l2,j+1,currentdropdown[i].name,fillVal);
                    }
                }
                //This first if is for checking two psukim, we don't do it
                else {
                    for (var j = 0; j<Number(currentdropdown[i].value);j++){
                        hebTest2(l2,j+1,currentdropdown[i].name,fillVal);
                    }
                }
            }
        }
    }
}

//© 2021 Ezra Gordon.
//TODO:
//Add functionality for zero or one results
//Add PA functionality?
//Check what other functionality she wanted
//Add border/boundary/scroll to artProduct div element to limit the vertical length of it

var l2 = document.getElementById("names").value;
var lookup = l2.replace(/\s/g, '')
var sheettitle = 'TEST: ' + lookup
//Assume refs is a correctly formatted array:
//
text = {
            'title':sheettitle, 
            'status':'public', 
            'options':{"numbered": 1,
                "assignable": 0,
                "layout": "sideBySide",
                "boxed": 0,
                "language": "bilingual",
                "divineNames": "noSub",
                "collaboration": "none",
                "highlightMode": 0,
                "bsd": 0,
                "langLayout": "heRight"
            },
            'attribution':'NamePasuk Applet',
            'sources':{
                'ref': refs[0]
            }
        }

