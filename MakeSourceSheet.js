
function displayRankedResults() {
    var psukim = document.getElementById("versesdropdown");
    var verseList = psukim.innerHTML.split(",");
    var count = verseList.length;
    var listArea = document.getElementById("artProduct");
    listArea.innerHTML="";
    var element;
    for (var i = 0; i<count; i++){
        element = document.createElement("div");
/*      element.setAttribute("type", "button");
        element.setAttribute("value", "button");
        element.setAttribute("name", "button");
*/      listArea.appendChild(element);
    }    

    for (var i = 0; i<count; i++){
        //Get the texts of the verses and put them in some new div element
        addVerse(verseList[i],listArea,i)
    }
}

//Must add PA functionality
//Makes the source sheet right there on the page
function addVerse(ref,listArea, rankNum) {
    var jqxhr = jQuery.getJSON( "https://www.sefaria.org/api/texts/" + ref, function(data) {
        var temp = jqxhr.responseJSON;
        var verseNum = parseInt(ref.split(".")[2])-1;

        //Get the actual texts in both languages
        var heText = temp.he[verseNum];
        var enText = temp.text[verseNum];

        //This is a very messy format
        if (heText.includes("<")){
            listArea.children[rankNum].innerHTML += ref + "    " + stripFormatting(heText) + "<br>" + enText + "<br><br>";
        }
        else{
            listArea.children[rankNum].innerHTML += ref + "    " + heText + "<br>" + enText + "<br><br>";
        }
    });
}

//"לֹ֘א עָ֤שָׂה כֵ֨ן <b>׀</b> לְכׇל־גּ֗וֹי וּמִשְׁפָּטִ֥ים בַּל־יְדָע֗וּם הַֽלְלוּ־יָֽהּ׃ <span>{פ}</span><br>"
//Code seems to identify it correctly by just checking for the presence of "<"
//For typo/corrections in the text, the format is:
//"לָ֤מָּה תָשִׁ֣יב יָ֭דְךָ וִימִינֶ֑ךָ מִקֶּ֖רֶב <span class="mam-kq"><span class="mam-kq-k">(חוקך)</span> <span class="mam-kq-q">[חֵיקְךָ֣]</span></span> כַלֵּֽה׃"
//untested
function stripFormatting(source){
    if (source.indexOf("kq")>-1){
        return stripFormattingWithTypo(source);
    }
    var normalText = 0;
    var cleanedVerse = "";
    for (var i =0; i<source.length-1;i++){
        if (source.charAt(i)=='<'){
            if (source.charAt(i+1)=='/'){
                normalText -=1;
                i=source.indexOf(">",i);
            }
            else{
                normalText +=1;
            }
        }
        if (normalText==0 && source.charAt(i) !='>'){ cleanedVerse += source.charAt(i)}
        if (normalText == 4){
            normalText = 0;
        }
    }
    cleanedVerse += "׃";
    return cleanedVerse;
}
function stripFormattingWithTypo(source){
    var correctsubstring = source.substring(source.indexOf("[")+1,source.indexOf("]"));
    var normalText = 0;
    var cleanedVerse = "";
    for (var i =0; i<source.length-1;i++){
        if (source.charAt(i)=='<'){
            if (source.indexOf("q",i)<source.indexOf(">",i)){
                cleanedVerse += correctsubstring;
                correctsubstring = "";
            }

            if (source.charAt(i+1)=='/'){
                normalText -=1;
                i=source.indexOf(">",i);
            }
            else{
                normalText +=1;
            }
        }
        if (normalText==0 && source.charAt(i) !='>'){ cleanedVerse += source.charAt(i)}
        if (normalText == 4){
            normalText = 0;
        }
    }
    cleanedVerse += "׃";
    return cleanedVerse;
}
