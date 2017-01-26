"""
This file contains examples of how to interact with Lexigram APIs in Python
Each of the examples inspect the responses printing some relevant properties.
For comprehensive documentation that includes information of all API responses
please visit http://docs.lexigram.io
"""

import requests
import json

# You can grab your API KEY from your user profile at https://app.lexigram.io
apiKey = "Bearer " + "YOUR_COPY_HERE"


# Entity extraction from a note sample.
def exampleEntityExtraction():
    url = "https://api.lexigram.io/v1/extract/entities"
    text = "The patient was given some hydrocodone for control of her pain." + \
           "The patient suffers from bulimia and eating disorder, bipolar disorder," + \
           "and severe hypokalemia. She thinks her potassium might again be low."

    r = requests.post(url, data=json.dumps({'text': text}),
                      headers={'Authorization': apiKey, 'Content-Type': 'application/json'})
    response = json.loads(r.text)

    '''For loop that inspects the response printing to console the extracted concepts.
     It prints the Lexigraph concept ID, the type of concepts extracted (problem, drug, etc)
     and the context (negation, speculation, ...) '''

    for match in response['matches']:
        print 'id ' + match['id'] + " contexts", match['contexts'], "types", match['types']


# Entity highlight from a note sample.
def exampleHighlightEntities():
    url = "https://api.lexigram.io/v1/highlight/entities"
    text = "The patient was given some hydrocodone for control of her pain." + \
           "The patient suffers from bulimia and eating disorder, bipolar disorder," + \
           "and severe hypokalemia. She thinks her potassium might again be low."

    r = requests.post(url, data=json.dumps({'text': text}),
                      headers={'Authorization': apiKey, 'Content-Type': 'application/json'})

    '''Returns the html formated text from a note sample '''
    print 'highlighted text', r.text


# Keyword search of keyword diabetes
def exampleSearchConcepts():
    keyword = "diabetes"
    url = "https://api.lexigram.io/v1/lexigraph/search?q=" + keyword

    r = requests.get(url, headers={'Authorization': apiKey})
    response = json.loads(r.text)

    '''For loop that inspects the response printing to console the found search hits.
     It prints the Lexigraph concept ID, the type of concepts extracted (problem, drug, etc)
     and the context (negation, speculation, ...) '''
    for hit in response['conceptSearchHits']:
        concept = hit['concept']
        print 'id ' + concept['id'] + "types", concept['types']


# Keyword search of keyword diabetes
def exampleConcept():
    conceptGraphId = "lxg:49711bf9b46f"
    url = "https://api.lexigram.io//v1/lexigraph/concepts/" + conceptGraphId

    r = requests.get(url, headers={'Authorization': apiKey})
    response = json.loads(r.text)

    # It prints the concept ID, the type of concepts extracted (problem, drug, etc)
    print 'id ' + response['id'] + "types", response['types']


# Ancestors of the concept Id are returned
def exampleConceptAncestors():
    conceptGraphId = "lxg:49711bf9b46f"  # hearth failure
    url = "https://api.lexigram.io/v1/lexigraph/concepts/" + conceptGraphId + "/ancestors"

    r = requests.get(url, headers={'Authorization': apiKey})
    response = json.loads(r.text)

    '''For loop that inspects the response printing to console the found search hits.
     It prints the hits found Lexigraph concept ID, the type of concepts extracted (problem, drug, etc)'''

    for match in response['results']:
        print 'id ' + match['id'] + " types", match['types']


# Descendants of the concept Id are returned
def exampleConceptDescendants():
    conceptGraphId = "lxg:49711bf9b46f"  # hearth failure
    url = "https://api.lexigram.io/v1/lexigraph/concepts/" + conceptGraphId + "/descendants"

    r = requests.get(url, headers={'Authorization': apiKey})
    response = json.loads(r.text)

    '''For loop that inspects the response printing to console the found search hits.
         It prints the hits found Lexigraph concept ID, the type of concepts extracted (problem, drug, etc)'''
    for match in response['results']:
        print 'id ' + match['id'] + "types", match['types']


# The sequence of sample function calls for demo purposes
exampleEntityExtraction()
exampleHighlightEntities()
exampleSearchConcepts()
exampleConcept()
exampleConceptAncestors()
exampleConceptDescendants()
