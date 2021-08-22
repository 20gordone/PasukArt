var numFound = 0;

//Called third
function sortmaybe(refs,links) {
    //# Of results
    count = refs.length;
    //Final list of references
    var sortedRefs = [];

    //Starting list of # of links in original order
    var linkCounts = [];
    for (i = 0; i<count; i++){
        linkCounts.push(parseInt(links[i].innerHTML));
    }
    console.log(linkCounts)
    for (i = 0; i<count; i++){
        maxLinksIndex = 0;
        //This is set up like insertion sort
        for (var ind = 0; ind<count;ind++){
            if (linkCounts[ind]>linkCounts[maxLinksIndex]){
                maxLinksIndex=ind;
            }
        }
        console.log(refs[maxLinksIndex] + " --- " + String(linkCounts[maxLinksIndex]) + " --- " + String(i));
        sortedRefs.push(refs[maxLinksIndex]);
        linkCounts[maxLinksIndex] = -1;
        if (i==count-1){
            setTimeout(() => {
                displayRankedResults();
                document.getElementById("postToSefaria").style.display = "block";
            }, 200);
        }
    }
    return sortedRefs;
}

//Main function
function orderResultsByLinkCount() {
    console.log("Ranking...")
    numFound = 0;
    var psukim = document.getElementById("versesdropdown");
    var count = psukim.children.length;
    var references = [];
    for (var i = 0; i<count; i++){
        references.push(psukim.children[i].value);
    }
    var options = psukim.children;
    for (var i = 0; i<count; i++){
        getLinkCounts(references[i],options[i], count);
    }
    result = [];
}

//Called second
function getLinkCounts(ref,option, count) {
    var jqxhr = jQuery.getJSON( "https://www.sefaria.org/api/links/" + ref, function(data) {
        var tempLink = jqxhr.responseJSON;
        option.innerHTML=tempLink.length;
        numFound = numFound + 1;
        if ((count)==numFound){
            var psukim = document.getElementById("versesdropdown");
            var references = [];
            for (var i = 0; i<count; i++){
                references.push(psukim.children[i].value);
            }
            var options = psukim.children;
            setTimeout(() => {
                psukim.innerHTML=(sortmaybe(references,options));
            }, 200);
        }
    });
}