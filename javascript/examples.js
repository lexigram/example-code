/*
This file contains examples of how to interact with Lexigram APIs in Javacript.

Each of the examples inspect the responses printing some relevant properties.
For comprehensive documentation that includes information of all API responses
please visit http://docs.lexigram.io
*/



/* You can grab your API KEY from your user profile at https://app.lexigram.io */
var apiKey = "Bearer " + " COPY YOUR KEY HERE ";

/*
 Entity extraction from a note sample.
*/
function exampleEntityExtraction(){
  var text = "The patient was given some hydrocodone for control of her pain."+
           "The patient suffers from bulimia and eating disorder, bipolar disorder,"+
           " and severe hypokalemia. She thinks her potassium might again be low.";
  var data = { text: text };    
  var url = "https://api.lexigram.io/v1/extract/entities";

  var httpRequest = new XMLHttpRequest();
  httpRequest.open("POST", url, true);
  httpRequest.setRequestHeader("Content-Type", "application/json");
  httpRequest.setRequestHeader("Authorization", apiKey);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState != 4 || httpRequest.status != 200) {
      return;
    }
    var response = JSON.parse(httpRequest.responseText);
    
    /* For loop that inspects the response printing to console the extracted concepts.
       It prints the Lexigraph concept ID, the type of concepts extracted (problem, drug, etc)
       and the context (negation, speculation, ...) */
    for(var i = 0; i < response.matches.length; i++){
      console.log("Concept ID: ", response.matches[i].label + 
                  " types:", response.matches[i].types + 
                  " context: ", response.matches[i].contexts);
    }
    
  };
  httpRequest.send(JSON.stringify(data));    
}


/*
 Entity highlight from a note sample.
*/
function exampleHighlightEntities(){
  var text = "The patient was given some hydrocodone for control of her pain."+
             "The patient suffers from bulimia and eating disorder, bipolar disorder,"+
             " and severe hypokalemia. She thinks her potassium might again be low.";
  var data = {text: text};    
  var url = ="https://api.lexigram.io/v1/highlight/entities";

  var httpRequest = new XMLHttpRequest();
  httpRequest.open("POST", url, true);
  httpRequest.setRequestHeader("Content-Type", "application/json");
  httpRequest.setRequestHeader("Authorization", apiKey);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState != 4 || httpRequest.status != 200) {
      return;
    }
    var response = JSON.parse(httpRequest.responseText);
    
    /* Returns the html formated text from a note sample */
    console.log("The Response with html format", response);
  };
  httpRequest.send(JSON.stringify(data.text));    
}


/*
Keyword search of keyword diabetes
*/
function exampleSearchConcepts(){
  var keyword = "diabetes";
  var url = "https://api.lexigram.io/v1/lexigraph/search?q="+ keyword;
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader("authorization", apiKey);

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState != 4 || httpRequest.status != 200) {
      return;
    }
    var response = JSON.parse(httpRequest.responseText);

    /* For loop that inspects the response printing to console the found search hits.
       It prints the hits found Lexigraph concept ID, the type of concepts extracted (problem, drug, etc) */
    for(var i = 0; i < response.conceptSearchHits.length; i++){
      console.log(" id: "+response.conceptSearchHits[i].concept.id +
                  " types: "+response.conceptSearchHits[i].concept.types) +
                  " label: " + response.conceptSearchHits[i].concept.label;
                  
    }
  };
  httpRequest.send();    
};

/*
  Concept IDs are returned by API calls like search and data extraction
  and the 'concepts' endpoint allows you to get more information about 
  that particular concept.
*/
function exampleConcept(){
  /* This concept ID represents 'diabetes'. */
  var conceptGraphId = "lxg:49711bf9b46f"; /* concept Id for hearth failure*/
  var url = "https://api.lexigram.io/v1/lexigraph/concepts/"+ conceptGraphId;
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader("authorization", apiKey);

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState != 4 || httpRequest.status != 200) {
      return;
    }
    var response = JSON.parse(httpRequest.responseText);
    /*
       It prints the concept ID, the type of concepts extracted (problem, drug, etc) */
    console.log("id ",response.id + " label:"+ response.label + " types:" +response.types);
  };
  httpRequest.send();    
};

/* Ancestors of the concept Id are returned */
function exampleConceptAncestors(){
  var conceptGraphId = "lxg:49711bf9b46f"; /* concept Id for hearth failure*/
  var url = "https://api.lexigram.io/v1/lexigraph/concepts/"+ conceptGraphId + "/ancestors";
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader("authorization", apiKey);

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState != 4 || httpRequest.status != 200) {
      return;
    }
    var response = JSON.parse(httpRequest.responseText);

    /* For loop that inspects the response printing to console the found ancestors concepts.
       It prints the Lexigraph concept ID, the type of concepts extracted (problem, drug, etc)
     */
    for(var i = 0; i <response.results.length; i++){
      console.log("id" +response.results[0].id + response.results[0].types);
    }
    
  };
  httpRequest.send();    
};


/* Descendants of the concept Id are returned */
function exampleConceptDescendants(){
  var conceptGraphId = "lxg:49711bf9b46f"; /* concept Id for hearth failure*/
  var url = "https://api.lexigram.io/v1/lexigraph/concepts/"+ conceptGraphId + "/descendants";
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.setRequestHeader("authorization", apiKey);

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState != 4 || httpRequest.status != 200) {
      return;
    }
    var response = JSON.parse(httpRequest.responseText);

    /* For loop that inspects the response printing to console the found descendants concepts.
       It prints the Lexigraph concept ID, the type of concepts extracted (problem, drug, etc)
     */
    for(var i = 0; i <response.results.length; i++){
      console.log("id" +response.results[0].id + response.results[0].types);
    }
  };
  httpRequest.send();    
};


/* The sequence of sample function calls for demo purposes */
exampleEntityExtraction();
exampleHighlightEntities();
exampleConcept();
exampleConceptAncestors();
exampleConceptDescendants();
exampleSearchConcepts();



