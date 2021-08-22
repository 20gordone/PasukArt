refTexts = [1]

/*
Line for what the button should do when pressed:
pullText(document.getElementById("versesdropdown")innerHTML.split(","));
*/

//Called third
function makeSefariaSheet(refs){
    console.log("Making the JSON")
    var lookup = document.getElementById("names").value;
    var sheettitle = 'TEST: ' + lookup
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
        'sources':[]
    }
    currentRefs = refTexts[refTexts[0]-1];
    var sourceArray = new Array();
    for (var i = 0; i<refs.length;i++){

        sourceArray[i] = {"ref": refs[i], "heRef": "", "text": {"en": currentRefs[0][i], "he": currentRefs[1][i]}};
        if (i==refs.length-1){
                text['sources']=sourceArray;
                makeSheetAPICall(text);
        }
    }

}


//replace arrayToCheck with sourceArray if desired
function isSourceArrayFull(arrayToCheck, refCount){
    if (arrayToCheck.length<refCount){
        return false;
    }
    if (arrayToCheck.length>refCount){
        alert("Uhh... the source array is bigger than refCount somehow");
        return false;
    }
    var i = 0;
    while (i<refCount){
        if (arrayToCheck[i] == null){
            return false
        }
        i++;
    }
    return true;
}

//Called fourth
function makeSheetAPICall(JSONtext){
    console.log("Making the call")
    var key = "gQVZ8Zz6Bqvxg66W0kEVJbd0I6i2on2BnYuGNlnKpP";
    finalJSON = {'json':JSONtext,'apikey': "gQVZ8Zz6Bqvxg66W0kEVJbd0I6i2on2BnYuGNlnKpP"}
    
    var postCall = jQuery.post( "https://www.sefaria.org/api/sheets", finalJSON, function( data ) {
        console.log("In function");
      })
    .done(function( data ) {
      alert( "Sheet uploaded");
      console.log(finalJSON)
    })
    .fail(function() {
      alert( "error" );
    })
    .always(function() {
      alert( "finished" );
    });

}


//The next two lines go just inside the closing bracket of each ref optionally
//"options": {"sourceLanguage": "", "sourceLayout": "", "sourceLangLayout": "", "indented": "", "PrependRefWithEn": "", 
//"PrependRefWithHe": "", "sourcePrefix": ""}, "title": "<p>The Upright</p>\n", "node": 1


//Below this are test functions for running in console code



//Called first
function pullText(refs){
    console.log("Pulling text")
    refCount = refs.length;
    refTexts[refTexts[0]] = [new Array(),new Array()];
    tA = refTexts[refTexts[0]];
    refTexts[0] = refTexts[0]+1;
    for (var j = 0; j<refCount;j++){
        hebPull(tA, refs,j,refCount)
    }
}

//Called second
function hebPull(arr,refs,ind,refCount){
    var ref=refs[ind];
    var jqxhr = jQuery.getJSON( "https://www.sefaria.org/api/texts/" + ref, function(data) {
        var everses = jqxhr.responseJSON.text
        var hverses = jqxhr.responseJSON.he
        var vE = everses[parseInt(ref.split(".")[2])-1]
        var vH = hverses[parseInt(ref.split(".")[2])-1]
        arr[0][ind]=vE;
        arr[1][ind]=vH;
        if (isSourceArrayFull(arr[0], refCount) && isSourceArrayFull(arr[1],refCount)){
            console.log("text pull complete, creating JSON");
            makeSefariaSheet(refs);
        }


    })
    .fail(function() {
        alert( "An error occurred while posting, please reload the page to try again" );
      })
      ;
}

function countFull(list){
    count = 0;
    for (var i = 0; i<list.length; i++){
        if (list[i] != null){
            count += 1;
        }
        if (i ==list.length-1){
            return count;
        }
    }
    return count;
}

/*
function addRefToSheetJSON(ref,i,refCount){
    var jqxhr = jQuery.getJSON( "https://www.sefaria.org/api/texts/" + ref, function(data) {
            var temp = jqxhr.responseJSON;
            console.log(String(i) + " " + ref);
            var verseNum = parseInt(ref.split(".")[2])-1;

            //Get the actual texts in both languages
            var heText = temp.he[verseNum-1];
            var enText = temp.text[verseNum-1];

            //Make the reference object
            sourceArray[i] = {"ref": ref, "heRef": "", "text": {"en": enText, "he": heText}};
            if (isSourceArrayFull(sourceArray[i],refCount)){
                setTimeout(() => {
                    text['sources']=sourceArray;
                    makeSheetAPICall(text)
                }, 100);
            }
        });
}

*/